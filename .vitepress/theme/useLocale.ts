import { computed } from 'vue'
import { useData } from 'vitepress'
import { locales, type Locale, type MessageKey } from './locales'

export function useLocale() {
  const { localeIndex } = useData()

  const locale = computed<Locale>(() =>
    localeIndex.value === 'vi' ? 'vi' : 'en'
  )
  const config = computed(() => locales[locale.value])

  function t(key: MessageKey) {
    return config.value.messages[key]
  }

  return { locale, config, t }
}
