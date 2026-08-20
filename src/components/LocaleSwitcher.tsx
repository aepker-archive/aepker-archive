'use client'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams } from 'next/navigation'

// Wechselt auf die aequivalente Seite der anderen Sprache.
// next-intl merkt sich die Wahl per Cookie – wer einmal wechselt, bleibt in seiner Sprache.
export function LocaleSwitcher() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const other = locale === 'de' ? 'en' : 'de'

  return (
    <button
      className="lang-switch"
      onClick={() =>
        // @ts-expect-error dynamische Params sind zur Laufzeit korrekt
        router.replace({ pathname, params }, { locale: other })
      }
    >
      {t('langSwitch')}
    </button>
  )
}
