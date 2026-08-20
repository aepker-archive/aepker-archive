import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { localeAlternates } from '@/components/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'journal' })
  return { title: t('title'), alternates: localeAlternates('/journal', locale) }
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('journal')
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    locale: locale as 'de' | 'en',
    sort: '-publishedAt',
    depth: 1,
    limit: 50,
  })

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Journal</span>
        <h2>{t('title')}</h2>
      </div>
      {docs.length === 0 ? (
        <p className="empty">{t('empty')}</p>
      ) : (
        <div className="grid">
          {docs.map((post) => (
            <Link key={post.id} className="card" href={{ pathname: '/journal/[slug]', params: { slug: String(post.slug) } }}>
              {typeof post.image === 'object' && post.image?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image.sizes?.card?.url || post.image.url} alt={post.image.alt || ''} loading="lazy" />
              )}
              <h3>{post.title}</h3>
              {post.excerpt && <p>{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
