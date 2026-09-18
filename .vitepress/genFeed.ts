import path from 'path'
import { mkdirSync, writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import { author } from './theme/author.js'
import { locales, resolvePostUrl, type Locale } from './theme/locales.js'

const baseUrl = `https://hieubm.netlify.app`

const feedInfo: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Bùi Minh Hiếu - Blog',
    description:
      'Notes and articles by Bùi Minh Hiếu on what I learn as a Software Engineer.'
  },
  vi: {
    title: 'Bùi Minh Hiếu - Blog',
    description:
      'Ghi chép và bài viết của Bùi Minh Hiếu về những gì tôi học được khi làm kỹ sư phần mềm.'
  }
}

// Writes one feed per locale: /feed.rss (English) and /vi/feed.rss
export async function genFeed(config: SiteConfig) {
  const posts = await createContentLoader('posts/*/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const locale of Object.keys(locales) as Locale[]) {
    const { prefix, lang } = locales[locale]
    const feed = new Feed({
      ...feedInfo[locale],
      id: `${baseUrl}${prefix}/`,
      link: `${baseUrl}${prefix}/blogs`,
      language: lang,
      image: `${baseUrl}/logo.png`,
      favicon: `${baseUrl}/favicon.ico`,
      copyright: 'Copyright (c) 2026-present, HieuBm. All rights reserved.'
    })

    for (const { url, excerpt, frontmatter, html } of posts) {
      const resolved = resolvePostUrl(url)
      if (resolved?.locale !== locale) continue
      feed.addItem({
        title: frontmatter.title,
        id: `${baseUrl}${resolved.url}`,
        link: `${baseUrl}${resolved.url}`,
        description: excerpt,
        content: html?.replaceAll('&ZeroWidthSpace;', ''),
        author: [{ name: author.name, link: author.linkedin }],
        date: frontmatter.date
      })
    }

    const outDir = path.join(config.outDir, prefix)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(path.join(outDir, 'feed.rss'), feed.rss2())
  }
}
