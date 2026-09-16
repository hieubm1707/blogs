<script setup lang="ts">
import { useData } from 'vitepress'
import CvProfile from './CvProfile.vue'
import BlogList from './BlogList.vue'
import Article from './Article.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="antialiased min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <header class="flex justify-between items-center py-8 border-b border-gray-100 dark:border-slate-800">
        <!-- Logo / Home Link -->
        <a class="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900 dark:text-white" href="/" aria-label="Home">
          <img
            class="inline-block"
            style="width: 32px; height: 28px"
            alt="logo"
            src="/logo.svg"
          />
          <span class="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Portfolio & Blog</span>
        </a>

        <!-- Navigation Menu -->
        <nav class="flex items-center gap-6 text-sm font-semibold">
          <a
            class="transition hover:text-emerald-600 dark:hover:text-emerald-400"
            :class="{ 'text-emerald-600 dark:text-emerald-400': frontmatter.pageType === 'cv' || page.relativePath === 'index.md' }"
            href="/"
          >
            Hồ sơ (CV)
          </a>
          <a
            class="transition hover:text-emerald-600 dark:hover:text-emerald-400"
            :class="{ 'text-emerald-600 dark:text-emerald-400': frontmatter.pageType === 'blog' || page.relativePath === 'blogs.md' || page.relativePath.startsWith('posts/') }"
            href="/blogs"
          >
            Bài viết (Blogs)
          </a>
          <a
            class="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 transition"
            href="/admin/"
            target="_blank"
          >
            Quản trị ↗
          </a>
        </nav>
      </header>
    </div>

    <!-- Main Content -->
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0 pt-8">
      <NotFound v-if="page.isNotFound" />
      <!-- Trang chủ: CV -->
      <CvProfile v-else-if="frontmatter.pageType === 'cv' || page.relativePath === 'index.md'" />
      <!-- Trang danh sách blogs -->
      <BlogList v-else-if="frontmatter.pageType === 'blog' || page.relativePath === 'blogs.md'" />
      <!-- Trang chi tiết bài viết blog -->
      <Article v-else />
    </main>
  </div>
</template>
