import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { setRequestLocale } from 'next-intl/server'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { localeAlternates } from '@/components/seo'

type Props = { params: Promise<{ locale: string; slug: string }> }

async function getPost(slug: string, locale: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale: locale as 'de' | 'en',
    depth: 1,
    limit: 1,
  })
  return docs[0] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  if (!post) return {}
  return {
    title: String(post.title),
    description: post.excerpt ? String(post.excerpt) : undefined,
    alternates: localeAlternates({ pathname: '/journal/[slug]', params: { slug } }, locale),
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = await getPost(slug, locale)
  if (!post) notFound()

  return (
    <article className="section article">
      <div className="section-head">
        <span className="eyebrow">Journal</span>
        <h2>{post.title}</h2>
      </div>
      {typeof post.image === 'object' && post.image?.url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hero-img" src={post.image.sizes?.hero?.url || post.image.url} alt={post.image.alt || ''} />
      )}
      {post.content && <RichText data={post.content} />}
    </article>
  )
}
