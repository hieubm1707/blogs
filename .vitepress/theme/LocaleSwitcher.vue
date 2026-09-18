<script setup lang="ts">
import Flag from './Flag.vue'
import { locales, type Locale } from './locales'
import { useLocale } from './useLocale'

// Link to the current page in the other language, or null when there is none
// (e.g. a post without a translation)
defineProps<{ switchLink: string | null }>()

const { locale, t } = useLocale()

const order: Locale[] = ['en', 'vi']
</script>

<template>
  <div
    class="flex items-center gap-1.5 p-1 rounded-lg border border-gray-200 dark:border-slate-700"
  >
    <template v-for="code in order" :key="code">
      <!-- Current language -->
      <span
        v-if="code === locale"
        class="flag ring-2 ring-emerald-500"
        :title="locales[code].name"
        aria-current="true"
      >
        <Flag :code="code" />
        <span class="sr-only">{{ locales[code].name }}</span>
      </span>
      <!-- Other language with a translation -->
      <a
        v-else-if="switchLink"
        class="flag opacity-50 hover:opacity-100 transition"
        :href="switchLink"
        :hreflang="locales[code].lang"
        :title="locales[code].name"
      >
        <Flag :code="code" />
        <span class="sr-only">{{ locales[code].name }}</span>
      </a>
      <!-- Other language without a translation -->
      <span
        v-else
        class="flag opacity-25 grayscale cursor-not-allowed"
        :title="t('noTranslation')"
      >
        <Flag :code="code" />
        <span class="sr-only">{{ t('noTranslation') }}</span>
      </span>
    </template>
  </div>
</template>

<style scoped>
.flag {
  display: inline-flex;
  width: 1.5rem;
  height: 1rem;
  overflow: hidden;
  border-radius: 0.2rem;
}
.flag :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
