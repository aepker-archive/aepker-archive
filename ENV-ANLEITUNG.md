# Umgebungsvariablen – was wo eintragen

Diese Werte trägst du bei Hostinger unter **Environment Variables** ein
(beim Verbinden des Repos oder später in den App-Einstellungen).

## Pflicht

### `DATABASE_URI`
Die Verbindungs-URL deiner Supabase-Datenbank.
Supabase → Project Settings → Database → Connection String → **URI**, Variante
„Transaction pooler" (Port 6543). Sieht so aus:
`postgresql://postgres.abcdefghij:DEIN-PASSWORT@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
Das `DEIN-PASSWORT` ist das Datenbank-Passwort, das du beim Anlegen des Supabase-Projekts
vergeben hast.

### `PAYLOAD_SECRET`
Ein langer, geheimer Zufallsstring (mind. 32 Zeichen), mit dem Payload Logins verschlüsselt.
Einmal erzeugen und nie ändern (sonst werden alle Sessions ungültig). Erzeugen z. B. auf
der Kommandozeile mit `openssl rand -hex 32` oder einfach 40+ zufällige Zeichen tippen.

### `NEXT_PUBLIC_SERVER_URL`
Die öffentliche Adresse der Website: `https://aepker-archive.com`
(ohne Slash am Ende). Wird für Sitemap, hreflang und absolute Links verwendet.

## Optional (für Bild-Uploads – kann später nachgetragen werden)

### `S3_ENDPOINT`
Supabase → Storage → Settings → „S3 Connection": der Endpoint, z. B.
`https://abcdefghij.storage.supabase.co/storage/v1/s3`

### `S3_BUCKET`
Name des Buckets, Standard: `media`

### `S3_REGION`
Steht ebenfalls bei den S3-Einstellungen, z. B. `eu-central-1`

### `S3_ACCESS_KEY_ID` und `S3_SECRET_ACCESS_KEY`
Supabase → Storage → Settings → „New access key" erzeugen und beide Werte kopieren.

**Wichtig:** Solange die S3-Variablen fehlen, speichert Payload Bilder im Dateisystem der
App – die sind nach dem nächsten Deploy weg. Für den echten Betrieb also unbedingt setzen,
bevor ihr Bilder hochladet.
