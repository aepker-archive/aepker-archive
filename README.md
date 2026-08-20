# Aepker Archive – Website, Blog & CMS

Next.js 15 + Payload CMS 3 + PostgreSQL (Supabase), zweisprachig (DE/EN) mit übersetzten URLs,
hreflang, Sitemap und Cookie-basiertem Sprachswitch. Gebaut für Hostinger Node.js-Hosting.

## Struktur

- `aepker-archive.com/de/…` – deutsche Website (`/de/reisen`, `/de/journal`, …)
- `aepker-archive.com/en/…` – englische Website (`/en/journeys`, `/en/journal`, …)
- `aepker-archive.com/admin` – Redaktionsoberfläche (Payload CMS)
- `aepker-archive.de` → 301-Weiterleitung auf `aepker-archive.com/de/` (im hPanel einrichten, nicht im Code)

## Einrichtung in 5 Schritten

### 1. Dieses Projekt in dein GitHub-Repo laden
Alle Dateien (inkl. versteckter wie `.gitignore`) ins Repo hochladen bzw. pushen.

### 2. Supabase-Projekt anlegen
1. supabase.com → neues Projekt, **Region Frankfurt (eu-central-1)**, starkes DB-Passwort setzen.
2. Project Settings → Database → **Connection String** (URI, „Transaction pooler") kopieren → das ist `DATABASE_URI`.
3. Für Bilder: Storage → neuen Bucket `media` anlegen (public). Unter Storage → Settings die
   **S3 Access Keys** erzeugen → ergibt `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.
   (Kann auch später passieren – ohne S3-Variablen speichert Payload Bilder lokal, was nur zum Testen taugt.)

### 3. Hostinger verbinden
hPanel → Node.js-Web-App → „Git-Repository importieren" → GitHub autorisieren → Repo wählen.
Framework wird als Next.js erkannt. Build-Befehl `npm run build`, Start-Befehl `npm start` (Standard).

### 4. Umgebungsvariablen setzen
Im Hostinger-Deploy-Dialog (oder App-Einstellungen → Environment Variables) alle Variablen
aus `ENV-ANLEITUNG.md` eintragen. Dann deployen – der erste Build dauert einige Minuten.
Payload legt die Datenbanktabellen beim ersten Start automatisch an.

### 5. Domain & Erstlogin
- Domain `aepker-archive.com` der App zuweisen (SSL kommt automatisch).
- `https://aepker-archive.com/admin` öffnen → ersten Admin-Benutzer anlegen.
- Im hPanel bei `aepker-archive.de`: Weiterleitung → `https://aepker-archive.com/de/` → **301 permanent**.

## Inhalte pflegen

Unter `/admin` gibt es **Reisen** und **Journal**. Jedes Textfeld existiert auf Deutsch und
Englisch – oben rechts im Editor zwischen den Sprachen umschalten. Der `slug` bestimmt die URL
und sollte pro Sprache übersetzt sein (z. B. de: `stille-kuesten`, en: `quiet-coasts`).
Einträge sind erst nach „Publish" öffentlich (Entwürfe möglich).

## Lokal entwickeln (optional)

```bash
cp .env.example .env   # Werte eintragen
npm install
npm run dev            # http://localhost:3000
```

## SEO – was schon eingebaut ist

- hreflang-Alternates (de/en/x-default) auf jeder Seite
- Canonical-URLs, lokalisierte `sitemap.xml`, `robots.txt` (Admin/API ausgeschlossen)
- Sprach-Erkennung ohne IP-Zwangsredirect (Google kann beide Sprachen crawlen)
- Meta-Title/-Description pro Eintrag aus dem CMS (`title`, `excerpt`)

Noch offen (nächste Ausbaustufen): Schema.org-Markup (TouristTrip/Article), Kontaktformular
mit Resend, OG-Images, Kundenportal.
