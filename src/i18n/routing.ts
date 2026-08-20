import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  // Jede Sprache hat ihr Verzeichnis: /de/... und /en/...
  localePrefix: 'always',
  // Uebersetzte URLs – staerker fuer deutsches SEO
  pathnames: {
    '/': '/',
    '/reisen': { de: '/reisen', en: '/journeys' },
    '/reisen/[slug]': { de: '/reisen/[slug]', en: '/journeys/[slug]' },
    '/journal': '/journal',
    '/journal/[slug]': '/journal/[slug]',
    '/ueber-uns': { de: '/ueber-uns', en: '/about' },
    '/kontakt': { de: '/kontakt', en: '/contact' },
  },
})

export type AppPathname = keyof typeof routing.pathnames
