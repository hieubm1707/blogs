<script setup lang="ts">
import type { Post } from './posts.data.js'
import { useLocale } from './useLocale'

const props = defineProps<{ date: Post['date'] }>()
const { t } = useLocale()

function getDateTime() {
  return new Date(props.date.time).toISOString()
}
</script>

<template>
  <dl>
    <dt class="sr-only">{{ t('publishedOn') }}</dt>
    <dd class="text-base leading-6 font-medium text-gray-500 dark:text-gray-300">
      <time :datetime="getDateTime()">{{ date.string }}</time>
    </dd>
  </dl>
</template>
