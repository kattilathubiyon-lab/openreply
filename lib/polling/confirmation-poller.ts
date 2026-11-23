/**
 * Confirmation polling for opening DMs.
 *
 * An opening DM asks the commenter to tap a button before the link is sent. The
 * tap normally arrives as a `messaging_postbacks` webhook, which Meta does not
 * deliver to Unified login apps holding Standard Access. The tap still appears
 * in the conversation as a message carrying the button's label, so it is read
 * from there and handed to the same job a webhook would have queued.
 *
 * Only people with an opening DM from the last 24 hours and no later reveal are
 * looked for. Messages from anyone else are discarded unread and never stored.
 */

import { createHash } from "node:crypto";
import { prisma } from "@/lib/db/client";
import { createInstagramContext } from "@/lib/instagram/provider";
import {
  getRecentConversationPage,
  MetaApiError,
  type InstagramConversation,
} from "@/lib/meta/client";
import { getDMQueue, POSTBACK_JOB_NAME } from "@/lib/queue/client";

const WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_PAGES = 4;
const OVERLAP_MS = 2 * 60 * 1000;
const BACKOFF_MS = 5 * 60 * 1000;
const RATE_LIMIT_CODES = new Set([4, 17, 32, 613, 80002, 80006]);

export interface PendingOpening {
  automationId: string;
  buttonLabel: string;
  commenterId: string;
  commenterName: string | null;
  sentAt: Date;
}

export interface Confirmation {
  automationId: string;
  userId: string;
  messageId: string;
  confirmedAt: Date;
}

const normalize = (value: string) => value.trim().toLowerCase();

/** Match button-tap messages to the opening DMs that are waiting for one. */
export function findConfirmations(
  conversations: InstagramConversation[],
  pending: PendingOpening[]
): Confirmation[] {
  const found: Confirmation[] = [];
  for (const conversation of conversations) {
    for (const message of conversation.messages?.data ?? []) {
      const { from, created_time: createdTime, message: text } = message;
      if (!from?.id || !createdTime || !text) continue;
      const at = Date.parse(createdTime);
      const match = pending
        .filter(
          (p) =>
            (p.commenterId === from.id ||
              (p.commenterName &&
                from.username &&
                normalize(p.commenterName) === normalize(from.username))) &&
            // Instagram stores at most 20 characters of a button title.
            normalize(p.buttonLabel.slice(0, 20)) === normalize(text) &&
            // created_time has whole seconds.
            at >= Math.floor(p.sentAt.getTime() / 1000) * 1000
        )
        .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime())[0];
      if (!match) continue;
      const confirmation = {
        automationId: match.automationId,
        userId: from.id,
        messageId: message.id,
        confirmedAt: new Date(at),
      };
      // Repeated taps on the same opening DM count once, by the earliest.
      const earlier = found.find(
        (f) =>
          f.automationId === confirmation.automationId &&
          f.userId === confirmation.userId
      );
      if (!earlier) found.push(confirmation);
      else if (confirmation.confirmedAt < earlier.confirmedAt)
        Object.assign(earlier, confirmation);
    }
  }
  return found;
}

const lastSweep = new Map<string, number>();
const pausedUntil = new Map<string, number>();
let running = false;

export async function pollConfirmations(now = Date.now()): Promise<void> {
  if (running) return;
  running = true;
  try {
    const accounts = await prisma.instagramAccount.findMany({
      where: {
        provider: "META",
        metaLogin: "UNIFIED",
        automations: { some: { isActive: true, openingDmEnabled: true } },
      },
    });
    for (const account of accounts) {
      if ((pausedUntil.get(account.id) ?? 0) > now) continue;
      try {
        await sweepAccount(account, now);
      } catch (error) {
        if (error instanceof MetaApiError && RATE_LIMIT_CODES.has(error.code))
          pausedUntil.set(account.id, now + BACKOFF_MS);
        const detail = error instanceof Error ? error.message : "Unknown error";
        console.error("[Confirmation Poll] Sweep failed:", detail);
      }
    }
  } finally {
    running = false;
  }
}

async function sweepAccount(
  account: Awaited<ReturnType<typeof prisma.instagramAccount.findMany>>[number],
  now: number
): Promise<void> {
  const logs = await prisma.dmLog.findMany({
    where: {
      instagramAccountId: account.id,
      dmSentAt: { gte: new Date(now - WINDOW_MS) },
      status: "SENT",
      automation: { isActive: true, openingDmEnabled: true },
    },
    select: {
      automationId: true,
      commenterId: true,
      commenterName: true,
      commentId: true,
      dmSentAt: true,
      automation: { select: { openingDmButtonLabel: true } },
    },
  });

  const key = (automationId: string, userId: string) =>
    `${automationId}:${userId}`;
  const revealedAt = new Map<string, number>();
  for (const log of logs)
    if (log.commentId.startsWith("reveal:") && log.dmSentAt)
      revealedAt.set(
        key(log.automationId, log.commenterId),
        log.dmSentAt.getTime()
      );

  const pending: PendingOpening[] = logs.flatMap((log) => {
    const label = log.automation.openingDmButtonLabel?.trim();
    if (log.commentId.startsWith("reveal:") || !log.dmSentAt || !label)
      return [];
    const revealed = revealedAt.get(key(log.automationId, log.commenterId));
    if (revealed && revealed >= log.dmSentAt.getTime()) return [];
    return [
      {
        automationId: log.automationId,
        buttonLabel: label,
        commenterId: log.commenterId,
        commenterName: log.commenterName,
        sentAt: log.dmSentAt,
      },
    ];
  });
  if (pending.length === 0) return;

  const oldest = Math.min(...pending.map((p) => p.sentAt.getTime()));
  const since = Math.max(
    oldest,
    (lastSweep.get(account.id) ?? 0) - OVERLAP_MS
  );

  const context = await createInstagramContext(account);
  if (context.provider !== "META") return;

  let after: string | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const result = await getRecentConversationPage(
      { accessToken: context.accessToken, unifiedLogin: context.unifiedLogin },
      account.instagramId,
      after
    );
    for (const hit of findConfirmations(result.conversations, pending)) {
      const revealed = revealedAt.get(key(hit.automationId, hit.userId));
      if (revealed && revealed >= hit.confirmedAt.getTime()) continue;
      await enqueue(account, hit);
    }
    const last = result.conversations.at(-1)?.updated_time;
    after = result.after;
    if (!after || !last || Date.parse(last) < since) break;
  }
  lastSweep.set(account.id, now);
}

async function enqueue(
  account: { id: string; instagramId: string; workspaceId: string },
  hit: Confirmation
): Promise<void> {
  const jobId = `postback_poll_${createHash("sha256")
    .update(`${account.id}:${hit.automationId}:${hit.messageId}`)
    .digest("hex")}`;
  const queue = getDMQueue();
  if (await queue.getJob(jobId)) return;
  // Proof of when the person confirmed, kept without any message content.
  await prisma.operationalEvent
    .create({
      data: {
        workspaceId: account.workspaceId,
        source: "WORKER",
        level: "INFO",
        message: "Opening DM confirmed by button",
        payload: {
          automationId: hit.automationId,
          userId: hit.userId,
          messageId: hit.messageId,
          confirmedAt: hit.confirmedAt.toISOString(),
        },
      },
    })
    .catch(() => {});
  await queue.add(
    POSTBACK_JOB_NAME,
    {
      accountConnectionId: account.id,
      instagramAccountId: account.instagramId,
      userId: hit.userId,
      payload: `reveal:${hit.automationId}:open`,
      mid: hit.messageId,
    },
    { jobId }
  );
}
