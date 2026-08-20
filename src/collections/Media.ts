import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    imageSizes: [
      { name: 'card', width: 900, height: 675, position: 'centre' },
      { name: 'hero', width: 1920, height: undefined },
    ],
    mimeTypes: ['image/*'],
  },
  access: { read: () => true },
  fields: [
    // Alt-Text zweisprachig – wichtig fuer SEO und Barrierefreiheit
    { name: 'alt', type: 'text', localized: true, required: true },
  ],
}
