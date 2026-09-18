<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { THEME_STORAGE_KEY } from './theme'
import { useLocale } from './useLocale'

const { t } = useLocale()

// Light by default. The inline script in config.ts adds the `dark` class
// before first paint when the visitor chose dark, so read the state from it.
const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggle() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light')
  } catch {
    // Storage can be blocked (private mode); the toggle still works for this page
  }
}
</script>

<template>
  <button
    type="button"
    class="p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition"
    :title="isDark ? t('lightMode') : t('darkMode')"
    :aria-label="isDark ? t('lightMode') : t('darkMode')"
    @click="toggle"
  >
    <!-- Sun: shown in dark mode, switches to light -->
    <svg
      v-if="isDark"
      class="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
    <!-- Moon: shown in light mode, switches to dark -->
    <svg
      v-else
      class="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
