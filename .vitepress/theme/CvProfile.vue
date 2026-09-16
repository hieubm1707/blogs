<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="space-y-16 pb-24 text-gray-800 dark:text-gray-200">
    
    <!-- 1. Hero / Giới thiệu cá nhân -->
    <section class="pt-6 pb-12 border-b border-gray-200 dark:border-slate-800">
      <div class="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
        <div class="space-y-5 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {{ frontmatter.status || 'Đang mở cho các cơ hội hợp tác mới' }}
          </div>

          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Xin chào, tôi là <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              {{ frontmatter.name || 'Nguyễn Văn A' }}
            </span>
          </h1>

          <p class="text-xl font-medium text-gray-700 dark:text-gray-300">
            {{ frontmatter.headline || 'Senior Fullstack Engineer & Software Architect' }}
          </p>

          <p class="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ frontmatter.bio || 'Hơn 5 năm kinh nghiệm trong việc thiết kế, xây dựng và vận hành các hệ thống web quy mô lớn, kiến trúc microservices và giao diện người dùng tối ưu hóa trải nghiệm. Yêu thích mã nguồn mở và chia sẻ kiến thức cộng đồng.' }}
          </p>

          <!-- Quick contact & Links -->
          <div class="flex flex-wrap items-center gap-4 pt-2 text-sm text-gray-600 dark:text-gray-400 font-mono">
            <span v-if="frontmatter.location" class="flex items-center gap-1.5">
              📍 {{ frontmatter.location }}
            </span>
            <span v-if="frontmatter.email" class="flex items-center gap-1.5">
              ✉️ <a :href="'mailto:' + frontmatter.email" class="hover:text-emerald-500 underline underline-offset-2">{{ frontmatter.email }}</a>
            </span>
            <span v-if="frontmatter.github" class="flex items-center gap-1.5">
              🐙 <a :href="frontmatter.github" target="_blank" class="hover:text-emerald-500 underline underline-offset-2">GitHub</a>
            </span>
            <span v-if="frontmatter.linkedin" class="flex items-center gap-1.5">
              💼 <a :href="frontmatter.linkedin" target="_blank" class="hover:text-emerald-500 underline underline-offset-2">LinkedIn</a>
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 pt-4">
            <a 
              v-if="frontmatter.cvLink" 
              :href="frontmatter.cvLink"
              target="_blank"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] transition shadow-md shadow-emerald-600/20"
            >
              <span>📄</span> Tải CV (PDF)
            </a>
            <a 
              href="/blogs" 
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700/80 active:scale-[0.98] transition shadow-sm"
            >
              <span>✍️</span> Xem bài viết Blog
            </a>
          </div>
        </div>

        <div v-if="frontmatter.avatar" class="flex-shrink-0 self-center md:self-auto">
          <div class="relative group">
            <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-30 blur group-hover:opacity-60 transition duration-500"></div>
            <img 
              :src="frontmatter.avatar" 
              alt="Avatar" 
              class="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Thống kê nhanh / Highlights -->
    <section v-if="frontmatter.highlights" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div 
        v-for="(item, idx) in frontmatter.highlights" 
        :key="idx"
        class="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200/70 dark:border-slate-800 text-center"
      >
        <div class="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">{{ item.value }}</div>
        <div class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ item.label }}</div>
      </div>
    </section>

    <!-- 3. Kinh nghiệm làm việc (Work Experience) -->
    <section class="space-y-8">
      <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
          <span>💼</span> Kinh nghiệm làm việc
        </h2>
        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">Timeline</span>
      </div>

      <div class="space-y-8 border-l-2 border-emerald-500/30 pl-6 ml-3">
        <div 
          v-for="(exp, index) in frontmatter.experiences" 
          :key="index"
          class="relative space-y-3 group"
        >
          <!-- Bullet dot -->
          <div class="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform duration-200"></div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ exp.role }} 
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">@ {{ exp.company }}</span>
              </h3>
              <div v-if="exp.location" class="text-xs text-gray-500 dark:text-gray-400">{{ exp.location }}</div>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 w-fit">
              {{ exp.period }}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ exp.description }}</p>

          <!-- Thành tựu / Điểm nổi bật -->
          <ul v-if="exp.achievements" class="space-y-1.5 pl-4 text-xs text-gray-600 dark:text-gray-400 list-disc">
            <li v-for="(ach, i) in exp.achievements" :key="i">{{ ach }}</li>
          </ul>

          <!-- Tech stack sử dụng tại cty -->
          <div v-if="exp.techs" class="flex flex-wrap gap-1.5 pt-1">
            <span 
              v-for="t in exp.techs" 
              :key="t"
              class="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 font-mono"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Kỹ năng chuyên môn (Skills & Technologies) -->
    <section class="space-y-8">
      <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
          <span>🛠️</span> Kỹ năng & Chuyên môn
        </h2>
        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">Tech Stack</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div 
          v-for="(skillGroup, idx) in frontmatter.skillGroups" 
          :key="idx"
          class="p-5 rounded-2xl bg-gray-50/70 dark:bg-slate-800/40 border border-gray-200/80 dark:border-slate-800 hover:border-emerald-500/50 transition duration-200"
        >
          <div class="flex items-center gap-2 mb-3">
            <span v-if="skillGroup.icon" class="text-lg">{{ skillGroup.icon }}</span>
            <h3 class="font-bold text-gray-900 dark:text-white text-sm">{{ skillGroup.category }}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="item in skillGroup.items" 
              :key="item"
              class="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-600 shadow-2xs"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Dự án tiêu biểu (Featured Projects) -->
    <section class="space-y-8">
      <div class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
          <span>🚀</span> Dự án tiêu biểu
        </h2>
        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">Selected Works</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="(project, i) in frontmatter.projects" 
          :key="i"
          class="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
        >
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                {{ project.name }}
              </h3>
              <div class="flex items-center gap-3 shrink-0 text-sm">
                <a 
                  v-if="project.github" 
                  :href="project.github" 
                  target="_blank" 
                  class="text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  title="Source code"
                >
                  GitHub ↗
                </a>
                <a 
                  v-if="project.link" 
                  :href="project.link" 
                  target="_blank" 
                  class="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                  title="Demo / Live site"
                >
                  Live Demo ↗
                </a>
              </div>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- Điểm nổi bật dự án -->
            <ul v-if="project.highlights" class="space-y-1 text-xs text-gray-500 dark:text-gray-400 list-disc pl-4">
              <li v-for="(h, hi) in project.highlights" :key="hi">{{ h }}</li>
            </ul>
          </div>

          <div class="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
            <span 
              v-for="tech in project.techs" 
              :key="tech"
              class="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300"
            >
              #{{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Học vấn & Chứng chỉ (Education & Certifications) -->
    <section v-if="frontmatter.education || frontmatter.certifications" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Học vấn -->
      <div v-if="frontmatter.education" class="space-y-4">
        <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-800">
          <span>🎓</span> Học vấn
        </h2>
        <div class="space-y-4">
          <div 
            v-for="(edu, idx) in frontmatter.education" 
            :key="idx"
            class="p-4 rounded-xl bg-gray-50/60 dark:bg-slate-800/40 border border-gray-200/60 dark:border-slate-800 space-y-1"
          >
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-sm text-gray-900 dark:text-white">{{ edu.degree }}</h3>
              <span class="text-xs text-gray-500 font-mono">{{ edu.period }}</span>
            </div>
            <div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{{ edu.school }}</div>
            <p v-if="edu.description" class="text-xs text-gray-600 dark:text-gray-400 pt-1">{{ edu.description }}</p>
          </div>
        </div>
      </div>

      <!-- Chứng chỉ -->
      <div v-if="frontmatter.certifications" class="space-y-4">
        <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-slate-800">
          <span>📜</span> Chứng chỉ & Thành tích
        </h2>
        <div class="space-y-3">
          <div 
            v-for="(cert, idx) in frontmatter.certifications" 
            :key="idx"
            class="p-4 rounded-xl bg-gray-50/60 dark:bg-slate-800/40 border border-gray-200/60 dark:border-slate-800 flex items-center justify-between"
          >
            <div>
              <h3 class="font-bold text-sm text-gray-900 dark:text-white">{{ cert.title }}</h3>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ cert.issuer }}</div>
            </div>
            <span class="text-xs font-mono text-gray-500 dark:text-gray-400 shrink-0">{{ cert.year }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Call To Action / Liên hệ -->
    <section class="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 text-center space-y-4">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
        Bạn đang có dự án hoặc cơ hội muốn trao đổi?
      </h2>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Tôi luôn sẵn sàng thảo luận về các giải pháp kỹ thuật, cơ hội nghề nghiệp hoặc cùng nhau xây dựng các sản phẩm thú vị.
      </p>
      <div class="pt-2 flex justify-center gap-4">
        <a 
          v-if="frontmatter.email"
          :href="'mailto:' + frontmatter.email" 
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
        >
          <span>✉️</span> Gửi tin nhắn cho tôi
        </a>
      </div>
    </section>

  </div>
</template>
