import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen - Biyon Kattilathu",
  description: "Bedingungen für die Instagram-Automatisierung von @biyon.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Nutzungsbedingungen"
      description="Bedingungen für die Instagram-Automatisierung von @biyon."
      updatedAt="23.11.2026"
    >
      <div lang="de" style={{ display: "contents" }}>
        <section>
          <h2 className="text-xl font-bold text-white">Anbieter</h2>
          <p className="mt-3">Inderleicht GmbH, vertreten durch Biyon Kattilathu<br />Dödterstraße 10b, 58095 Hagen<br />E-Mail: <a href="mailto:shop@biyon.de">shop@biyon.de</a><br />Telefon: +49 231 952 50 20<br />Amtsgericht Hagen, HRB 11888</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Nutzung</h2>
          <p className="mt-3">Die Automatisierung sendet dir Inhalte, wenn du unter einem Beitrag von @biyon das angegebene Stichwort kommentierst. Das ist für dich kostenlos und freiwillig. Es gelten zusätzlich die Nutzungsbedingungen von Instagram.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Zugang zur Verwaltung</h2>
          <p className="mt-3">Der Verwaltungsbereich ist nur für Personen bestimmt, die von uns freigeschaltet wurden. Sie müssen die Plattformbedingungen von Meta sowie geltendes Datenschutz- und Wettbewerbsrecht einhalten.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Verfügbarkeit</h2>
          <p className="mt-3">Der Dienst hängt von Drittanbietern ab, insbesondere von Meta. Wir können nicht zusagen, dass jede Nachricht jederzeit zugestellt wird. Wir dürfen die Automatisierung jederzeit ändern oder beenden.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Links</h2>
          <p className="mt-3">Für Inhalte auf verlinkten Angeboten Dritter sind deren Betreiber verantwortlich.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Datenschutz</h2>
          <p className="mt-3">Informationen findest du in der <a href="/privacy">Datenschutzerklärung</a>.</p>
        </section>
      </div>
      <section lang="en">
        <h2 className="text-xl font-bold text-white">Summary in English</h2>
        <p className="mt-3">This free service sends content to people who comment a keyword on posts by @biyon. The admin area is restricted to authorised users, who must follow the Meta Platform Terms.</p>
      </section>
    </LegalShell>
  );
}
