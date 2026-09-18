<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import CvProfile from './CvProfile.vue'
import BlogList from './BlogList.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'
import LocaleSwitcher from './LocaleSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'
import { data as posts } from './posts.data.js'
import { locales } from './locales'
import { useLocale } from './useLocale'

const { page, frontmatter } = useData()
const route = useRoute()
const { locale, config, t } = useLocale()

const isCv = computed(
  () => frontmatter.value.pageType === 'cv' || page.value.relativePath === 'index.md'
)
const isBlogList = computed(
  () => frontmatter.value.pageType === 'blog' || page.value.relativePath.endsWith('blogs.md')
)

// Link to the same page in the other language. Posts only get a switcher
// when a translation with the same slug exists.
const otherLocale = computed(() => (locale.value === 'en' ? 'vi' : 'en'))
const switchLink = computed(() => {
  if (page.value.isNotFound) return null
  if (isCv.value) return locales[otherLocale.value].home
  if (isBlogList.value) return locales[otherLocale.value].prefix + '/blogs'
  const current = posts.find((p) => p.url === route.path)
  const translation = current
    ? posts.find((p) => p.slug === current.slug && p.locale === otherLocale.value)
    : undefined
  return translation?.url ?? null
})
</script>

<template>
  <div class="antialiased min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <header class="flex justify-between items-center py-8 border-b border-gray-100 dark:border-slate-800">
        <!-- Logo / Home Link -->
        <a class="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white" :href="config.home" aria-label="Home">
          <img
            class="inline-block w-8 h-8 dark:invert"
            alt="logo"
            src="/logo.png"
          />
          <span class="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Portfolio & Blog</span>
        </a>

        <!-- Navigation Menu -->
        <nav class="flex items-center gap-6 text-sm font-semibold">
          <a
            class="transition hover:text-emerald-600 dark:hover:text-emerald-400"
            :class="{ 'text-emerald-600 dark:text-emerald-400': isCv }"
            :href="config.home"
          >
            {{ t('about') }}
          </a>
          <a
            class="transition hover:text-emerald-600 dark:hover:text-emerald-400"
            :class="{ 'text-emerald-600 dark:text-emerald-400': !isCv && !page.isNotFound }"
            :href="config.prefix + '/blogs'"
          >
            {{ t('blog') }}
          </a>
          <LocaleSwitcher :switch-link="switchLink" />
          <ThemeToggle />
        </nav>
      </header>
    </div>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 pt-8">
      <NotFound v-if="page.isNotFound" />
      <!-- Home: CV -->
      <CvProfile v-else-if="isCv" />
      <!-- Blog post list -->
      <BlogList v-else-if="isBlogList" />
      <!-- Single blog post -->
      <Article v-else />
    </main>
  </div>
</template>
