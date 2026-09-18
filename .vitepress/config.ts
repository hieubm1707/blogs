import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'
import { themeInitScript } from './theme/theme.js'

export default defineConfig({
  lang: 'en-US',
  title: 'Bùi Minh Hiếu - Software Engineer',
  description:
    'CV and blog of Bùi Minh Hiếu, a backend-focused Software Engineer.',
  cleanUrls: true,
  // VitePress' built-in dark mode follows the OS preference; the site uses its
  // own light-by-default toggle instead (theme/theme.ts, ThemeToggle.vue)
  appearance: false,
  srcExclude: ['README.md', 'CLAUDE.md', 'cv.md'],
  locales: {
    root: { label: 'English', lang: 'en-US' },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      title: 'Bùi Minh Hiếu - Kỹ sư phần mềm',
      description:
        'CV và blog của Bùi Minh Hiếu, kỹ sư phần mềm tập trung vào backend.'
    }
  },
  // Decap CMS writes posts/<locale>/<slug>.md; serve them at /posts/<slug>
  // (English) and /vi/posts/<slug> (Vietnamese). See theme/locales.ts.
  rewrites: {
    'posts/en/:slug': 'posts/:slug',
    'posts/vi/:slug': 'vi/posts/:slug'
  },
  head: [
    ['script', { id: 'check-dark-mode' }, themeInitScript],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://hieubm.netlify.app/images/avatar.png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  ],
  buildEnd: genFeed
})
