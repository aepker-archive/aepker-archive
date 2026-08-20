import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { setRequestLocale } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { localeAlternates } from '@/components/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

async function getTrip(slug: string, locale: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'trips',
    where: { slug: { equals: slug } },
    locale: locale as 'de' | 'en',
    depth: 1,
    limit: 1,
  })
  return docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const trip = await getTrip(slug, locale)
  if (!trip) return {}
  return {
    title: String(trip.title),
    description: trip.excerpt ? String(trip.excerpt) : undefined,
    alternates: localeAlternates({ pathname: '/reisen/[slug]', params: { slug } }, locale),
  }
}

export default async function TripPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const trip = await getTrip(slug, locale)
  if (!trip) notFound()

  return (
    <article className="section article">
      <div className="section-head">
        <span className="eyebrow">Aepker Archive</span>
        <h2>{trip.title}</h2>
        {trip.excerpt && <p className="lede">{trip.excerpt}</p>}
      </div>
      {typeof trip.image === 'object' && trip.image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-img" src={trip.image.sizes?.hero?.url || trip.image.url} alt={trip.image.alt || ''} />
      )}
      {trip.content && <RichText data={trip.content} />}
    </article>
  )
}
