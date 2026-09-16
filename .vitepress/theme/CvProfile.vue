<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="space-y-12 pb-16">
    <!-- Hero / Intro Section -->
    <section class="pt-8 pb-10 border-b border-gray-200 dark:border-slate-800">
      <div class="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8">
        <div class="space-y-4 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sẵn sàng cho các cơ hội mới
          </div>
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Xin chào, tôi là <span class="text-emerald-600 dark:text-emerald-400">{{ frontmatter.name || 'Software Engineer' }}</span>
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ frontmatter.bio || 'Kỹ sư phần mềm đam mê xây dựng các sản phẩm công nghệ hiệu năng cao, trải nghiệm người dùng mượt mà và kiến trúc sạch sẽ.' }}
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a 
              href="/blogs" 
              class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
            >
              Đọc Blog của tôi →
            </a>
            <a 
              v-if="frontmatter.cvLink" 
              :href="frontmatter.cvLink"
              target="_blank"
              class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Tải CV (PDF) 📄
            </a>
          </div>
        </div>

        <div v-if="frontmatter.avatar" class="flex-shrink-0">
          <img 
            :src="frontmatter.avatar" 
            alt="Avatar" 
            class="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-xl"
          />
        </div>
      </div>
    </section>

    <!-- Experience / Kinh nghiệm -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
        <span>💼</span> Kinh nghiệm làm việc
      </h2>
      <div class="space-y-6 border-l-2 border-emerald-500/30 pl-4 ml-2">
        <div 
          v-for="(exp, index) in frontmatter.experiences" 
          :key="index"
          class="relative space-y-1.5"
        >
          <div class="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900"></div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ exp.role }} <span class="text-emerald-600 dark:text-emerald-400">@ {{ exp.company }}</span></h3>
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ exp.period }}</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ exp.description }}</p>
        </div>
      </div>
    </section>

    <!-- Skills / Kỹ năng -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
        <span>🛠️</span> Kỹ năng chuyên môn
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="(skillGroup, idx) in frontmatter.skillGroups" 
          :key="idx"
          class="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200/80 dark:border-slate-800"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white text-sm mb-2">{{ skillGroup.category }}</h3>
          <div class="flex flex-wrap gap-1.5">
            <span 
              v-for="item in skillGroup.items" 
              :key="item"
              class="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600 shadow-2xs"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects / Dự án -->
    <section class="space-y-6">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
        <span>🚀</span> Dự án tiêu biểu
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div 
          v-for="(project, i) in frontmatter.projects" 
          :key="i"
          class="p-5 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition group flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                {{ project.name }}
              </h3>
              <a v-if="project.link" :href="project.link" target="_blank" class="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
                Xem dự án ↗
              </a>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ project.description }}</p>
          </div>
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-slate-800/80">
            <span 
              v-for="tech in project.techs" 
              :key="tech"
              class="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
            >
              #{{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
