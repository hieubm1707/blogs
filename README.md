# Portfolio & Blog

Trang CV cá nhân kèm blog, nơi tôi đăng các bài viết về những gì tự tìm hiểu được. Trang được build tĩnh bằng [VitePress](https://vitepress.dev), soạn bài qua [Decap CMS](https://decapcms.org) và deploy miễn phí trên [Netlify](https://www.netlify.com).

- **Trang chủ (`/`)**: hồ sơ CV, gồm giới thiệu, kinh nghiệm, kỹ năng, dự án, học vấn và chứng chỉ.
- **Blog (`/blogs`, `/vi/blogs`)**: danh sách bài viết tiếng Anh và tiếng Việt, bài mới nhất ở trên.
- **Bài viết (`/posts/<slug>`, `/vi/posts/<slug>`)**: trang chi tiết của từng bài, có nút chuyển ngôn ngữ.
- **CMS (`/admin`)**: giao diện soạn và đăng bài, không cần tự dựng server.
- **RSS (`/feed.rss`, `/vi/feed.rss`)**: tự tạo mỗi lần build, mỗi ngôn ngữ một feed.

## Công nghệ

| Thành phần | Công cụ |
| --- | --- |
| Static site generator | VitePress 1.x (custom theme, không dùng default theme) |
| UI | Vue 3 + TailwindCSS 3 + `@tailwindcss/typography` |
| CMS | Decap CMS 3 (backend `git-gateway`) + Netlify Identity |
| RSS | `feed` |
| Hosting | Netlify (có sẵn `vercel.json` nếu muốn chuyển sang Vercel) |
| Package manager | pnpm 9 |

## Chạy trên máy

Cần có Node.js 18 trở lên và pnpm 9.

```bash
pnpm install
pnpm dev          # dev server, tự mở trình duyệt
pnpm build        # build ra .vitepress/dist
pnpm preview      # xem thử bản build
```

### Soạn bài bằng CMS trên máy

`public/admin/config.yml` đã bật `local_backend: true`, nên khi chạy trên máy, CMS ghi thẳng vào file mà không đi qua GitHub. Mở hai terminal:

```bash
pnpm cms:proxy    # chạy decap-server (cổng 8081)
pnpm dev
```

Sau đó mở `http://localhost:5173/admin/`. Nhớ commit và push các file CMS vừa tạo. Trước khi viết bài ở local, nên chạy `git pull` để lấy các bài đã đăng từ CMS trên production, tránh bị conflict.

## Cấu trúc thư mục

```
.
├── index.md                  # Trang CV: toàn bộ nội dung nằm trong frontmatter
├── blogs.md                  # Trang danh sách bài viết tiếng Anh (pageType: blog)
├── vi/blogs.md               # Trang danh sách bài viết tiếng Việt
├── posts/
│   ├── en/<slug>.md          # Bản tiếng Anh, phục vụ tại /posts/<slug>
│   └── vi/<slug>.md          # Bản tiếng Việt, phục vụ tại /vi/posts/<slug>
├── public/
│   ├── admin/
│   │   ├── index.html        # Nạp Decap CMS và Netlify Identity widget
│   │   └── config.yml        # Cấu hình CMS: backend, collections, media
│   ├── favicon.ico
│   └── logo.png              # Logo BM ở header (tự đảo màu khi dark mode)
├── .vitepress/
│   ├── config.ts             # Title, meta, head scripts, hook buildEnd
│   ├── genFeed.ts            # Tạo feed.rss
│   └── theme/
│       ├── Layout.vue        # Header, điều hướng, chọn view theo trang
│       ├── CvProfile.vue     # Giao diện trang CV
│       ├── BlogList.vue      # Giao diện danh sách bài
│       ├── Article.vue       # Giao diện chi tiết bài
│       ├── author.ts         # Thông tin tác giả cố định: tên, avatar, LinkedIn
│       ├── locales.ts        # Ngôn ngữ, chữ giao diện EN/VI, map URL bài viết
│       ├── useLocale.ts      # Composable t() lấy chữ theo ngôn ngữ trang
│       ├── Author.vue, Date.vue, NotFound.vue
│       ├── posts.data.ts     # Data loader: đọc posts/*.md và sắp xếp theo ngày
│       └── style.css
├── README.md, CLAUDE.md      # Tài liệu (bị loại khỏi build qua srcExclude)
├── netlify.toml              # Lệnh build và thư mục publish
└── postcss.config.js         # Cấu hình Tailwind
```

## Viết bài mới

Có hai cách:

Blog song ngữ: mỗi bài có một bản tiếng Anh và một bản tiếng Việt, cùng slug.

1. **Qua CMS**: vào `/admin`, đăng nhập bằng Netlify Identity, chọn **Posts** rồi **New Posts**. Màn hình soạn có hai ngôn ngữ EN và VI; nhập tiêu đề và nội dung cho cả hai, ngày đăng chỉ nhập một lần. Khi publish, Decap commit cả `posts/en/<slug>.md` và `posts/vi/<slug>.md` vào `main` và Netlify tự build lại.
2. **Viết tay**: tạo cả `posts/en/<slug>.md` và `posts/vi/<slug>.md`, rồi commit và push:

```markdown
---
title: Tiêu đề bài viết
date: 2026-09-17
---

Đoạn mở đầu. Phần trước dấu `---` bên dưới sẽ làm excerpt ở trang danh sách và trong RSS.

---

Nội dung chính...
```

Thông tin tác giả (tên, avatar, LinkedIn) là cố định cho mọi bài và được khai báo trong `.vitepress/theme/author.ts`, nên không cần ghi vào frontmatter của bài.

Tên file chính là slug trong URL: `posts/en/hello.md` thành `/posts/hello`, `posts/vi/hello.md` thành `/vi/posts/hello` (nhờ `rewrites` trong `.vitepress/config.ts`). Bài chỉ có một ngôn ngữ vẫn hiện bình thường ở ngôn ngữ đó, chỉ là không có nút chuyển ngôn ngữ.

## Cập nhật CV

Toàn bộ nội dung CV nằm trong **frontmatter** của `index.md`. Phần HTML do `CvProfile.vue` render, nên thường chỉ cần sửa YAML:

| Khóa | Nội dung |
| --- | --- |
| `name`, `headline`, `bio`, `status`, `location`, `avatar` | Phần giới thiệu |
| `email`, `github`, `linkedin`, `cvLink` | Liên hệ và link tải CV |
| `highlights[]` | Các ô số liệu (`value`, `label`) |
| `experiences[]` | `role`, `company`, `location`, `period`, `description`, ... |
| `skillGroups[]` | `category`, `icon`, `items[]` |
| `projects[]` | `name`, `period`, `description`, `github`, `link`, `highlights[]`, `techs[]` |
| `education[]` | `degree`, `school`, `period`, `description` |
| `certifications[]` | `title`, `issuer`, `year` |

## Deploy lên Netlify

1. Push repo lên GitHub rồi tạo site mới trên Netlify từ repo đó. Build command (`pnpm build`) và thư mục publish (`.vitepress/dist`) đã khai báo sẵn trong `netlify.toml`.
2. Vào **Site configuration → Identity** và bấm **Enable Identity**.
3. Ở phần Identity:
   - Đặt **Registration** thành *Invite only*, rồi tự mời email của mình.
   - Trong **Services**, bật **Git Gateway**.
4. Kiểm tra `backend.repo` và `backend.branch` trong `public/admin/config.yml` có khớp với repo GitHub không.
5. Mở `https://<site>.netlify.app/admin/`, chấp nhận lời mời và đặt mật khẩu. Từ đây có thể đăng bài.

Mỗi lần push lên `main`, dù từ máy hay từ CMS, Netlify sẽ tự build và deploy.

## Ghi chú

- Giao diện mặc định là tiếng Anh; tiếng Việt nằm dưới `/vi/`. Chữ giao diện của cả hai ngôn ngữ nằm trong `.vitepress/theme/locales.ts`.
- Trang CV hiện chỉ có tiếng Anh. Muốn thêm CV tiếng Việt: tạo `vi/index.md`, đổi `home` của `vi` trong `locales.ts` thành `'/vi/'`, và chuyển các tiêu đề mục trong `CvProfile.vue` vào `messages`.
- Domain production là `https://hieubm.netlify.app`. Nếu đổi domain, sửa `baseUrl` trong `.vitepress/genFeed.ts` và thẻ `twitter:image` trong `.vitepress/config.ts`.
- Ảnh upload từ CMS được lưu vào `public/images/` (cùng thư mục với avatar `avatar.png`).
- `vercel.json` còn sót lại từ bản fork [vuejs/blog](https://github.com/vuejs/blog); host thật là Netlify.
