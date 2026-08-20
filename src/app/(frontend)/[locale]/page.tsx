import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/components/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates('/', locale) }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('hero')

  return (
    <header className="hero">
      <svg className="route" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
        <path d="M -20 180 C 180 120, 300 250, 480 210 S 760 90, 900 170 S 1130 300, 1240 240" />
      </svg>
      <span className="eyebrow">{t('eyebrow')}</span>
      <h1>
        {t('titleA')} <em>{t('titleEm')}</em>
        <br />
        {t('titleB')}
      </h1>
      <p className="lede">{t('lede')}</p>
      <div className="cta-row">
        <Link className="btn solid" href="/reisen">{t('ctaTrips')}</Link>
        <Link className="btn" href="/kontakt">{t('ctaContact')}</Link>
      </div>
      <svg className="grove" viewBox="0 0 760 190" fill="none" stroke="currentColor" aria-hidden="true">
        <g strokeWidth="1.1">
          <path d="M150 185 C150 130 148 100 152 70" />
          <path d="M152 72 C120 60 95 65 78 82 M152 72 C125 50 100 48 82 55 M152 72 C185 58 210 62 226 80 M152 72 C180 50 205 48 224 56 M152 72 C140 40 145 25 158 12 M152 72 C160 42 172 30 190 24 M152 72 C142 45 130 35 112 30" />
          <path d="M380 186 C380 150 378 130 380 108" />
          <ellipse cx="380" cy="78" rx="72" ry="46" />
          <path d="M330 92 C345 70 365 58 388 56 M352 108 C370 88 395 80 420 84 M340 60 C360 48 385 44 408 52" strokeWidth=".8" />
          <path d="M600 186 C600 160 599 140 600 122" />
          <path d="M600 122 C580 110 574 80 584 52 C590 32 600 20 600 12 C600 20 610 32 616 52 C626 80 620 110 600 122 Z" />
          <path d="M260 186 C262 172 258 162 250 154 M268 186 C270 170 276 162 284 158 M470 186 C472 174 468 164 460 158 M478 186 C480 172 486 164 494 160 M60 186 C62 172 58 162 50 156 M690 186 C692 174 688 164 680 158" strokeWidth=".9" />
          <path d="M20 186 H740" strokeWidth="1" />
          <path d="M300 26 c5 -6 10 -6 14 0 c4 -6 9 -6 14 0 M330 40 c4 -5 8 -5 11 0 c3 -5 7 -5 11 0" strokeWidth=".9" />
        </g>
      </svg>
    </header>
  )
}
