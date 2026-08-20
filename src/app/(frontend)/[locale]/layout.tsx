import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Fraunces, Karla } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './globals.css'

// Seiten werden pro Anfrage gerendert (nicht beim Build) – so braucht der
// Build keine Datenbank und Inhalte aus dem CMS sind sofort aktuell.
export const dynamic = 'force-dynamic'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', style: ['normal', 'italic'] })
const karla = Karla({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '500'] })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return {
    metadataBase: new URL(base),
    title: {
      default: locale === 'de' ? 'Aepker Archive – Kuratierte Reisen' : 'Aepker Archive – Curated Journeys',
      template: '%s · Aepker Archive',
    },
    description:
      locale === 'de'
        ? 'Individuelle Reisen in stille Landschaften – von Hand geplant, persönlich begleitet.'
        : 'Individual journeys into quiet landscapes – planned by hand, personally guided.',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('nav')
  const tf = await getTranslations('footer')

  return (
    <html lang={locale} className={`${fraunces.variable} ${karla.variable}`}>
      <body>
        <NextIntlClientProvider>
          <div className="frame">
            <nav>
              <Link className="wordmark" href="/">
                aepker<span>;</span>
              </Link>
              <ul>
                <li><Link href="/reisen">{t('trips')}</Link></li>
                <li><Link href="/journal">{t('journal')}</Link></li>
                <li><Link href="/ueber-uns">{t('about')}</Link></li>
                <li><Link href="/kontakt">{t('contact')}</Link></li>
                <li><LocaleSwitcher /></li>
              </ul>
            </nav>
            <main>{children}</main>
            <footer>
              <span className="wordmark">aepker<span>;</span></span>
              <span className="eyebrow">Aepker Archive · {tf('legal')}</span>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
