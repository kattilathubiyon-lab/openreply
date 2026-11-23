import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Datenlöschung - Biyon Kattilathu",
  description: "So kannst du die Löschung deiner Daten verlangen, die über die Instagram-Automatisierung von @biyon verarbeitet werden.",
};

export default function DataDeletionPage() {
  return (
    <LegalShell
      title="Datenlöschung"
      description="So kannst du die Löschung deiner Daten verlangen, die über die Instagram-Automatisierung von @biyon verarbeitet werden."
      updatedAt="23.11.2026"
    >
      <div lang="de" style={{ display: "contents" }}>
        <section>
          <h2 className="text-xl font-bold text-white">Löschung beantragen</h2>
          <p className="mt-3">Schreib eine E-Mail an <a href="mailto:shop@biyon.de">shop@biyon.de</a> mit dem Betreff „Datenlöschung Instagram“ und nenne deinen Instagram-Nutzernamen. Wir löschen dann die zu dir gespeicherten Kommentare, Nachrichten- und Versandprotokolle, soweit keine gesetzlichen Pflichten entgegenstehen.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Bestätigung</h2>
          <p className="mt-3">Damit niemand fremde Daten löschen lässt, können wir dich bitten zu bestätigen, dass dir das Instagram-Konto gehört. Wir bearbeiten deine Anfrage unverzüglich, spätestens innerhalb eines Monats.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">Verbindung eines Instagram-Kontos trennen</h2>
          <p className="mt-3">Personen mit Zugang zur Verwaltung können ein verbundenes Konto unter „Settings“ über „Disconnect“ trennen. Dabei werden das gespeicherte Zugriffstoken und die zugehörigen Kampagnen und Versandprotokolle entfernt.</p>
        </section>
      </div>
      <section lang="en">
        <h2 className="text-xl font-bold text-white">Summary in English</h2>
        <p className="mt-3">To request deletion of your data, email <a href="mailto:shop@biyon.de">shop@biyon.de</a> with your Instagram username. We may ask you to verify that the account is yours and will respond within one month.</p>
      </section>
    </LegalShell>
  );
}
