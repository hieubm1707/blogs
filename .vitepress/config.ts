import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  lang: 'en-US',
  title: 'Bùi Minh Hiếu - Software Engineer',
  description:
    'CV and blog of Bùi Minh Hiếu, a backend-focused Software Engineer.',
  cleanUrls: true,
  srcExclude: ['README.md', 'CLAUDE.md', 'cv.md'],
  head: [
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
