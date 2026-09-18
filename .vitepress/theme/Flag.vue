<script setup lang="ts">
import type { Locale } from './locales'

// Inline SVG flags: flag emoji don't render on Windows
defineProps<{ code: Locale }>()
</script>

<template>
  <svg
    v-if="code === 'en'"
    viewBox="0 0 60 30"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <clipPath id="flag-uk-s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="flag-uk-t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clip-path="url(#flag-uk-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clip-path="url(#flag-uk-t)"
        stroke="#C8102E"
        stroke-width="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
    </g>
  </svg>
  <svg v-else viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#DA251D" />
    <polygon
      fill="#FFFF00"
      points="15,4 16.35,8.15 20.71,8.15 17.18,10.71 18.53,14.85 15,12.29 11.47,14.85 12.82,10.71 9.29,8.15 13.65,8.15"
    />
  </svg>
</template>
