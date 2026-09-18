// Locale definitions shared by the theme (browser) and genFeed (Node).
// Keep this file free of `vitepress` imports so both sides can use it.

export type Locale = 'en' | 'vi'

export const locales = {
  en: {
    lang: 'en-US',
    // Shown as the flag's tooltip in the language switcher
    name: 'English',
    // URL prefix of this locale ('' = site root)
    prefix: '',
    // CV page of this locale (index.md / vi/index.md)
    home: '/',
    messages: {
      about: 'About',
      blog: 'Blog',
      readMore: 'Read more →',
      nextArticle: 'Next Article',
      previousArticle: 'Previous Article',
      backToBlog: '← Back to the blog',
      publishedOn: 'Published on',
      notFound: '404 Page Not Found',
      noTranslation: 'No translation available',
      lightMode: 'Switch to light mode',
      darkMode: 'Switch to dark mode',
      // CV page
      greeting: "Hi, I'm",
      downloadCv: 'Download CV (PDF)',
      readBlog: 'Read my blog',
      workExperience: 'Work Experience',
      timeline: 'Timeline',
      skills: 'Skills',
      techStack: 'Tech Stack',
      featuredProjects: 'Featured Projects',
      selectedWorks: 'Selected Works',
      education: 'Education',
      certifications: 'Certifications & Awards',
      sourceCode: 'Source code',
      liveDemo: 'Live Demo',
      liveDemoTitle: 'Demo / Live site',
      ctaTitle: 'Have a project or an opportunity in mind?',
      ctaText:
        "I'm always happy to talk about technical challenges, career opportunities, or building something interesting together.",
      sendMessage: 'Send me a message'
    }
  },
  vi: {
    lang: 'vi-VN',
    name: 'Tiếng Việt',
    prefix: '/vi',
    home: '/vi/',
    messages: {
      about: 'Giới thiệu',
      blog: 'Blog',
      readMore: 'Đọc tiếp →',
      nextArticle: 'Bài tiếp theo',
      previousArticle: 'Bài trước',
      backToBlog: '← Quay lại danh sách bài viết',
      publishedOn: 'Đăng ngày',
      notFound: '404 Không tìm thấy trang',
      noTranslation: 'Bài viết chưa có bản dịch',
      lightMode: 'Chuyển sang giao diện sáng',
      darkMode: 'Chuyển sang giao diện tối',
      // CV page
      greeting: 'Xin chào, tôi là',
      downloadCv: 'Tải CV (PDF)',
      readBlog: 'Đọc blog của tôi',
      workExperience: 'Kinh nghiệm làm việc',
      timeline: 'Hành trình',
      skills: 'Kỹ năng',
      techStack: 'Công nghệ',
      featuredProjects: 'Dự án tiêu biểu',
      selectedWorks: 'Dự án chọn lọc',
      education: 'Học vấn',
      certifications: 'Chứng chỉ & Thành tích',
      sourceCode: 'Mã nguồn',
      liveDemo: 'Xem demo',
      liveDemoTitle: 'Demo / Trang chạy thật',
      ctaTitle: 'Bạn có dự án hoặc cơ hội muốn trao đổi?',
      ctaText:
        'Tôi luôn sẵn lòng trao đổi về các bài toán kỹ thuật, cơ hội nghề nghiệp, hoặc cùng nhau xây dựng những sản phẩm thú vị.',
      sendMessage: 'Gửi tin nhắn cho tôi'
    }
  }
} as const

export type MessageKey = keyof (typeof locales)['en']['messages']

// Decap CMS stores each translation in posts/<locale>/<slug>.md, and
// `rewrites` in config.ts serves them at /posts/<slug> (en) and
// /vi/posts/<slug> (vi). createContentLoader ignores rewrites, so its URLs
// (/posts/en/<slug>) are mapped here.
export function resolvePostUrl(
  rawUrl: string
): { locale: Locale; slug: string; url: string } | null {
  const match = rawUrl.match(/^\/posts\/(en|vi)\/([^/]+?)(\.html)?$/)
  if (!match) return null
  const locale = match[1] as Locale
  const slug = match[2]
  return {
    locale,
    slug,
    url: `${locales[locale].prefix}/posts/${slug}${match[3] ?? ''}`
  }
}
