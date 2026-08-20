import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { localeAlternates } from '@/components/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('title'), alternates: localeAlternates('/kontakt', locale) }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('contact')
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Aepker Archive</span>
        <h2>{t('title')}</h2>
        <p className="lede">{t('body')}</p>
        <p><a className="btn solid" href={`mailto:${t('email')}`}>{t('email')}</a></p>
      </div>
    </section>
  )
}
