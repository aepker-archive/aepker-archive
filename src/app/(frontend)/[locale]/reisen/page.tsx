import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/components/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'trips' })
  return { title: t('title'), alternates: localeAlternates('/reisen', locale) }
}

export default async function TripsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('trips')
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'trips',
    locale: locale as 'de' | 'en',
    sort: '-createdAt',
    depth: 1,
    limit: 50,
  })

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Aepker Archive</span>
        <h2>{t('title')}</h2>
      </div>
      {docs.length === 0 ? (
        <p className="empty">{t('empty')}</p>
      ) : (
        <div className="grid">
          {docs.map((trip) => (
            <Link key={trip.id} className="card" href={{ pathname: '/reisen/[slug]', params: { slug: String(trip.slug) } }}>
              {typeof trip.image === 'object' && trip.image?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={trip.image.sizes?.card?.url || trip.image.url} alt={trip.image.alt || ''} loading="lazy" />
              )}
              <h3>{trip.title}</h3>
              {trip.excerpt && <p>{trip.excerpt}</p>}
              <span className="meta eyebrow">
                {trip.durationDays ? `${trip.durationDays} ${t('days')}` : ''}
                {trip.priceFrom ? ` · ${t('from')} ${trip.priceFrom} €` : ''}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
