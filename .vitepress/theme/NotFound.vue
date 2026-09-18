<script setup lang="ts">
import { useLocale } from './useLocale'

const { t } = useLocale()
</script>

<template>
  <h1 class="text-3xl font-bold">{{ t('notFound') }}</h1>
</template>
