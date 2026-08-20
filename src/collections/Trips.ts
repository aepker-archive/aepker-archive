import type { CollectionConfig } from 'payload'

export const Trips: CollectionConfig = {
  slug: 'trips',
  labels: { singular: 'Reise', plural: 'Reisen' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'region', '_status'] },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    {
      name: 'slug',
      type: 'text',
      localized: true,
      required: true,
      unique: true,
      admin: { description: 'URL-Teil, z. B. "stille-kuesten-schottland" (deutsch) / "quiet-coasts-scotland" (englisch)' },
    },
    {
      name: 'region',
      type: 'select',
      options: [
        { label: 'Nord', value: 'nord' },
        { label: 'Sued', value: 'sued' },
        { label: 'Fern', value: 'fern' },
      ],
    },
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Kurzbeschreibung fuer Listen und Meta-Description (max. ~155 Zeichen)' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', localized: true },
    { name: 'durationDays', type: 'number', label: 'Dauer (Tage)' },
    { name: 'priceFrom', type: 'number', label: 'Preis ab (EUR)' },
  ],
}
