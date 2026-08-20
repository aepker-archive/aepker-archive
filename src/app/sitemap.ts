import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getPathname } from '@/i18n/navigation'

const BASE = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

function entry(href: Parameters<typeof getPathname>[0]['href']): MetadataRoute.Sitemap[number] {
  const de = BASE + getPathname({ locale: 'de', href })
  const en = BASE + getPathname({ locale: 'en', href })
  return {
    url: de,
    alternates: { languages: { de, en } },
    changeFrequency: 'weekly',
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    entry('/'),
    entry('/reisen'),
    entry('/journal'),
    entry('/ueber-uns'),
    entry('/kontakt'),
  ]

  try {
    const payload = await getPayload({ config })
    for (const collection of ['trips', 'posts'] as const) {
      const pathname = collection === 'trips' ? ('/reisen/[slug]' as const) : ('/journal/[slug]' as const)
      const { docs } = await payload.find({ collection, locale: 'de', limit: 500, depth: 0 })
      for (const doc of docs) {
        if (doc.slug) entries.push(entry({ pathname, params: { slug: String(doc.slug) } } as never))
      }
    }
  } catch {
    // Datenbank (noch) nicht erreichbar oder leer – die statischen Seiten reichen
  }
  return entries
}
