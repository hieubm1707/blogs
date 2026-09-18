// Locale definitions shared by the theme (browser) and genFeed (Node).
// Keep this file free of `vitepress` imports so both sides can use it.

export type Locale = 'en' | 'vi'

export const locales = {
  en: {
    lang: 'en-US',
    // URL prefix of this locale ('' = site root)
    prefix: '',
    // Where the "About" nav link points. There is no Vietnamese CV yet, so
    // both locales use the English one; set vi to '/vi/' once vi/index.md exists.
    home: '/',
    messages: {
      about: 'About',
      blog: 'Blog',
      readMore: 'Read more →',
      nextArticle: 'Next Article',
      previousArticle: 'Previous Article',
      backToBlog: '← Back to the blog',
      publishedOn: 'Published on',
      notFound: '404 Page Not Found',
      switchLocale: 'Tiếng Việt'
    }
  },
  vi: {
    lang: 'vi-VN',
    prefix: '/vi',
    home: '/',
    messages: {
      about: 'Giới thiệu',
      blog: 'Blog',
      readMore: 'Đọc tiếp →',
      nextArticle: 'Bài tiếp theo',
      previousArticle: 'Bài trước',
      backToBlog: '← Quay lại danh sách bài viết',
      publishedOn: 'Đăng ngày',
      notFound: '404 Không tìm thấy trang',
      switchLocale: 'English'
    }
  }
} as const

export type MessageKey = keyof (typeof locales)['en']['messages']

// Decap CMS stores each translation in posts/<locale>/<slug>.md, and
// `rewrites` in config.ts serves them at /posts/<slug> (en) and
// /vi/posts/<slug> (vi). createContentLoader ignores rewrites, so its URLs
// (/posts/en/<slug>) are mapped here.
export function resolvePostUrl(
  rawUrl: string
): { locale: Locale; slug: string; url: string } | null {
  const match = rawUrl.match(/^\/posts\/(en|vi)\/([^/]+?)(\.html)?$/)
  if (!match) return null
  const locale = match[1] as Locale
  const slug = match[2]
  return {
    locale,
    slug,
    url: `${locales[locale].prefix}/posts/${slug}${match[3] ?? ''}`
  }
}
