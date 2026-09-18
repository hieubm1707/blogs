<script setup lang="ts">
import Date from './Date.vue'
import { computed } from 'vue'
import { data as allPosts } from './posts.data.js'
import { useData } from 'vitepress'
import { useLocale } from './useLocale'

const { frontmatter } = useData()
const { locale, t } = useLocale()

const posts = computed(() =>
  allPosts.filter((p) => p.locale === locale.value)
)
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-slate-200/5">
    <div class="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1
        class="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
      >
        {{ frontmatter.title || t('blog') }}
      </h1>
      <p v-if="frontmatter.subtext" class="text-lg leading-7 text-gray-500 dark:text-gray-400">
        {{ frontmatter.subtext }}
      </p>
    </div>
    <ul class="divide-y divide-gray-200 dark:divide-slate-200/5">
      <li class="py-12" v-for="{ title, url, date, excerpt } of posts" :key="url">
        <article
          class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline"
        >
          <Date :date="date" />
          <div class="space-y-5 xl:col-span-3">
            <div class="space-y-6">
              <h2 class="text-2xl leading-8 font-bold tracking-tight">
                <a class="text-gray-900 dark:text-white hover:text-emerald-500 transition-colors" :href="url">{{
                  title
                }}</a>
              </h2>
              <div
                v-if="excerpt"
                class="prose dark:prose-invert max-w-none text-gray-500 dark:text-gray-300"
                v-html="excerpt"
              ></div>
            </div>
            <div class="text-base leading-6 font-medium">
              <a class="link" aria-label="read more" :href="url">{{ t('readMore') }}</a>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>
