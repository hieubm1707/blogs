# Portfolio & Blog

Trang CV cá nhân kèm blog, nơi tôi đăng các bài viết về những gì tự tìm hiểu được. Trang được build tĩnh bằng [VitePress](https://vitepress.dev), soạn bài qua [Decap CMS](https://decapcms.org) và deploy miễn phí trên [Netlify](https://www.netlify.com).

- **Trang chủ (`/`)**: hồ sơ CV, gồm giới thiệu, kinh nghiệm, kỹ năng, dự án, học vấn và chứng chỉ.
- **Blog (`/blogs`)**: danh sách bài viết, bài mới nhất ở trên.
- **Bài viết (`/posts/<slug>`)**: trang chi tiết của từng bài.
- **CMS (`/admin`)**: giao diện soạn và đăng bài, không cần tự dựng server.
- **RSS (`/feed.rss`)**: tự tạo mỗi lần build.

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
├── blogs.md                  # Trang danh sách bài viết (pageType: blog)
├── posts/                    # Bài viết Markdown (.gitkeep giữ thư mục khi chưa có bài)
├── public/
│   ├── admin/
│   │   ├── index.html        # Nạp Decap CMS và Netlify Identity widget
│   │   └── config.yml        # Cấu hình CMS: backend, collections, media
│   ├── favicon.ico
│   └── logo.svg
├── .vitepress/
│   ├── config.ts             # Title, meta, head scripts, hook buildEnd
│   ├── genFeed.ts            # Tạo feed.rss
│   └── theme/
│       ├── Layout.vue        # Header, điều hướng, chọn view theo trang
│       ├── CvProfile.vue     # Giao diện trang CV
│       ├── BlogList.vue      # Giao diện danh sách bài
│       ├── Article.vue       # Giao diện chi tiết bài
│       ├── Author.vue, Date.vue, NotFound.vue
│       ├── posts.data.ts     # Data loader: đọc posts/*.md và sắp xếp theo ngày
│       └── style.css
├── README.md, CLAUDE.md      # Tài liệu (bị loại khỏi build qua srcExclude)
├── netlify.toml              # Lệnh build và thư mục publish
└── postcss.config.js         # Cấu hình Tailwind
```

## Viết bài mới

Có hai cách:

1. **Qua CMS**: vào `/admin`, đăng nhập bằng Netlify Identity, chọn **Bài viết** rồi **New**. Khi publish, Decap sẽ commit bài vào nhánh `main` và Netlify tự build lại.
2. **Viết tay**: tạo file `posts/<slug>.md`, rồi commit và push:

```markdown
---
title: Tiêu đề bài viết
date: 2026-09-17
author: Tên tác giả
gravatar: <md5 của email>   # không bắt buộc
twitter: '@handle'          # không bắt buộc
---

Đoạn mở đầu. Phần trước dấu `---` bên dưới sẽ làm excerpt ở trang danh sách và trong RSS.

---

Nội dung chính...
```

Tên file chính là slug trong URL (`cleanUrls: true`), ví dụ `posts/hello.md` sẽ thành `/posts/hello`.

## Cập nhật CV

Toàn bộ nội dung CV nằm trong **frontmatter** của `index.md`. Phần HTML do `CvProfile.vue` render, nên thường chỉ cần sửa YAML:

| Khóa | Nội dung |
| --- | --- |
| `name`, `headline`, `bio`, `status`, `location`, `avatar` | Phần giới thiệu |
| `email`, `github`, `linkedin`, `cvLink` | Liên hệ và link tải CV |
| `highlights[]` | Các ô số liệu (`value`, `label`) |
| `experiences[]` | `role`, `company`, `location`, `period`, `description`, ... |
| `skillGroups[]` | `category`, `icon`, `items[]` |
| `projects[]` | `name`, `description`, `github`, `link`, `highlights[]`, `techs[]` |
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

## Việc còn tồn đọng

Dự án được fork từ blog chính thức của Vue ([vuejs/blog](https://github.com/vuejs/blog)), nên vẫn còn vài chỗ chưa đổi:

- [ ] `.vitepress/config.ts`: `title`, `description` và meta Twitter vẫn là của *The Vue Point*. Script Fathom analytics vẫn dùng `data-site` của Vue.
- [ ] `.vitepress/genFeed.ts`: `baseUrl` vẫn là `https://blog.vuejs.org`, cần đổi sang domain Netlify của mình. `title` và `copyright` cũng cần đổi.
- [ ] `index.md`: dữ liệu CV hiện là dữ liệu mẫu.
- Ảnh upload từ CMS sẽ lưu vào `public/images/`. Thư mục này sẽ tự được tạo ở lần upload đầu tiên.
