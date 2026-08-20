import type { Metadata } from 'next'
import { getPathname } from '@/i18n/navigation'
import { routing, type AppPathname } from '@/i18n/routing'

type Href =
  | AppPathname
  | { pathname: AppPathname; params?: Record<string, string> }

// Erzeugt canonical + hreflang-Alternates fuer eine Seite in beiden Sprachen.
// x-default zeigt auf Englisch (internationale Besucher ohne klare Sprache).
export function localeAlternates(href: Href, currentLocale: string): Metadata['alternates'] {
  const de = getPathname({ locale: 'de', href: href as never })
  const en = getPathname({ locale: 'en', href: href as never })
  return {
    canonical: currentLocale === 'de' ? de : en,
    languages: { de, en, 'x-default': en },
  }
}

export const allLocales = routing.locales
