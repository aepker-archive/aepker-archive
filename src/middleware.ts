import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Erledigt automatisch: Browsersprache beim Erstbesuch, Cookie-Merken der Sprachwahl,
// Redirect von / auf /de bzw. /en. Kein IP-Zwangsredirect – Google kann alles crawlen.
export default createMiddleware(routing)

export const config = {
  // Admin-Bereich und API von der Sprachlogik ausnehmen
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}
