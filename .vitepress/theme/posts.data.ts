import { createContentLoader } from 'vitepress'
import { locales, resolvePostUrl, type Locale } from './locales.js'

export interface Post {
  title: string
  url: string
  locale: Locale
  // Shared by all translations of a post, used by the language switcher
  slug: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .flatMap(({ url, frontmatter, excerpt }) => {
        const resolved = resolvePostUrl(url)
        if (!resolved) return []
        return [
          {
            title: frontmatter.title,
            url: resolved.url,
            locale: resolved.locale,
            slug: resolved.slug,
            excerpt,
            date: formatDate(frontmatter.date, resolved.locale)
          }
        ]
      })
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string, locale: Locale): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString(locales[locale].lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
