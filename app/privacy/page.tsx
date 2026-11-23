import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung - Biyon Kattilathu",
  description: "Wie wir Daten verarbeiten, wenn du unter Beiträgen von @biyon kommentierst oder uns auf Instagram schreibst.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Datenschutzerklärung"
      description="Wie wir Daten verarbeiten, wenn du unter Beiträgen von @biyon kommentierst oder uns auf Instagram schreibst."
      updatedAt="23.11.2026"
    >
      <div lang="de" style={{ display: "contents" }}>
        <section>
          <h2 className="text-xl font-bold text-white">1. Verantwortlicher</h2>
          <p className="mt-3">Inderleicht GmbH, vertreten durch Biyon Kattilathu<br />Dödterstraße 10b, 58095 Hagen<br />E-Mail: <a href="mailto:shop@biyon.de">shop@biyon.de</a><br />Telefon: +49 231 952 50 20<br />Amtsgericht Hagen, HRB 11888</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">2. Worum es geht</h2>
          <p className="mt-3">Auf dem Instagram-Profil @biyon kannst du unter bestimmten Beiträgen ein Stichwort kommentieren. Daraufhin antworten wir dir automatisiert, öffentlich unter deinem Kommentar und per Direktnachricht, zum Beispiel mit dem Link zu einer Podcastfolge. Dafür nutzen wir die selbst betriebene Software OpenReply und die offizielle Schnittstelle von Meta. Diese Erklärung gilt für diese Automatisierung und für die Seiten unter dieser Adresse.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">3. Welche Daten wir verarbeiten</h2>
          <ul className="mt-3" style={{ listStyle: "disc", paddingLeft: 20 }}>
            <li>deine Instagram-Kennung und deinen Nutzernamen</li>
            <li>den Inhalt, den Zeitpunkt und die Kennung deines Kommentars</li>
            <li>Direktnachrichten, die du an @biyon schickst oder von uns erhältst, sowie Reaktionen auf Schaltflächen darin</li>
            <li>deine Bestätigung über die Schaltfläche in unserer ersten Nachricht und deren Zeitpunkt; um sie zu erkennen, rufen wir die jüngsten Unterhaltungen des Profils ab und werten nur Nachrichten von Personen aus, denen wir in den letzten 24 Stunden eine solche Nachricht geschickt haben, andere Inhalte speichern wir dabei nicht</li>
            <li>von Meta übermittelte technische Ereignisdaten und Protokolle über Versand, Fehler und Zustellung</li>
            <li>beim Klick auf einen Link aus unseren Nachrichten: Zeitpunkt, eine Prüfsumme (Hash) deiner IP-Adresse, eine pseudonyme Empfängerkennung, Angaben zu Browser und Gerät sowie die verweisende Seite</li>
            <li>bei Personen, die sich in der Verwaltung anmelden: E-Mail-Adresse und Sitzungsdaten</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">4. Zwecke und Rechtsgrundlagen</h2>
          <ul className="mt-3" style={{ listStyle: "disc", paddingLeft: 20 }}>
            <li>Beantwortung deines Kommentars und Zusendung der gewünschten Inhalte: Art. 6 Abs. 1 lit. b DSGVO, soweit du die Zusendung durch deinen Kommentar anforderst, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Kommunikation mit unserer Community)</li>
            <li>Vermeidung doppelter Nachrichten, Fehleranalyse und Sicherheit: Art. 6 Abs. 1 lit. f DSGVO</li>
            <li>Auswertung, wie oft Links angeklickt werden: Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Verbesserung unserer Inhalte)</li>
            <li>soweit wir dich um eine Einwilligung bitten: Art. 6 Abs. 1 lit. a DSGVO, jederzeit mit Wirkung für die Zukunft widerruflich</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">5. Empfänger</h2>
          <p className="mt-3">Wir setzen folgende Dienstleister ein:</p>
          <ul className="mt-3" style={{ listStyle: "disc", paddingLeft: 20 }}>
            <li>Meta Platforms Ireland Ltd. (Instagram): Plattform und Schnittstelle für Kommentare und Nachrichten</li>
            <li>Vercel Inc., USA: Bereitstellung der Web-Anwendung und Nutzungsstatistik der Website (Vercel Web Analytics)</li>
            <li>Railway Corp., USA: Datenbank, Warteschlange und Versanddienst; Serverstandort USA</li>
            <li>Resend, USA: Versand von Anmelde-E-Mails an Personen mit Zugang zur Verwaltung</li>
          </ul>
          <p className="mt-3">Links in unseren Nachrichten können auf Angebote Dritter führen, etwa Spotify oder YouTube. Dort gelten deren Datenschutzhinweise.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">6. Übermittlung in die USA</h2>
          <p className="mt-3">Ein Teil der Daten wird in den USA verarbeitet. Grundlage dafür sind ein Angemessenheitsbeschluss der EU-Kommission, soweit der jeweilige Anbieter danach zertifiziert ist, oder die Standardvertragsklauseln der EU-Kommission (Art. 45, 46 DSGVO).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">7. Speicherdauer</h2>
          <p className="mt-3">Wir speichern die Daten, solange sie für die genannten Zwecke erforderlich sind oder gesetzliche Pflichten bestehen. Danach löschen wir sie. Auf deine Anfrage löschen wir deine Daten früher, sofern keine gesetzlichen Gründe entgegenstehen. Wie das geht, steht auf der Seite <a href="/data-deletion">Datenlöschung</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">8. Deine Rechte</h2>
          <p className="mt-3">Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit (Art. 15 bis 20 DSGVO).</p>
          <p className="mt-3"><strong>Widerspruchsrecht:</strong> Du kannst der Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen (Art. 21 DSGVO). Schreib uns dafür an <a href="mailto:shop@biyon.de">shop@biyon.de</a>.</p>
          <p className="mt-3">Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-white">9. Pflicht zur Bereitstellung</h2>
          <p className="mt-3">Du bist nicht verpflichtet, uns Daten bereitzustellen. Ohne deinen Kommentar oder deine Nachricht können wir dir die Inhalte aber nicht automatisch zusenden. Eine automatisierte Entscheidung mit rechtlicher Wirkung im Sinne von Art. 22 DSGVO findet nicht statt.</p>
        </section>
      </div>
      <section lang="en">
        <h2 className="text-xl font-bold text-white">Summary in English</h2>
        <p className="mt-3">Inderleicht GmbH (Germany) operates this self-hosted tool for the Instagram account @biyon. We process comments, direct messages, Instagram identifiers, delivery logs and link clicks through the official Meta API in order to send the replies people request. Instagram access tokens are encrypted at rest. Contact: <a href="mailto:shop@biyon.de">shop@biyon.de</a>.</p>
      </section>
    </LegalShell>
  );
}
