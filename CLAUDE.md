# CLAUDE.md

This is a personal CV and blog site: VitePress with a custom theme, content managed by Decap CMS, deployed free on Netlify. The site is **bilingual (English default, Vietnamese under `/vi/`)** for the blog; the CV is English-only for now. CMS labels are in English and the docs (`README.md`) are in Vietnamese. The user talks in Vietnamese; reply in Vietnamese.

## Commands

```bash
pnpm install
pnpm dev          # vitepress dev server (auto-opens browser)
pnpm build        # vitepress build → .vitepress/dist (also writes feed.rss)
pnpm preview      # preview the production build
pnpm cms:proxy    # npx decap-server, the local CMS backend (use with `pnpm dev`, then open /admin/)
```

There are no tests and no linter. To verify a change, run `pnpm build`: it fails on template or TS errors and on broken data loaders. Formatting follows `.prettierrc` (no semicolons, single quotes, width 80, no trailing commas).

## Architecture

- **Custom theme only.** `.vitepress/theme/index.ts` exports just `Layout`. VitePress's default theme is not used, so default-theme config (`themeConfig`, `nav`, `sidebar`) has no effect.
- **Routing happens in `Layout.vue`**, based on frontmatter and path:
  - `pageType: cv` or `index.md` → `CvProfile.vue`
  - `pageType: blog` or `blogs.md` → `BlogList.vue`
  - `page.isNotFound` → `NotFound.vue`
  - anything else (the `posts/*.md` files) → `Article.vue`
  
  `index.md` and `blogs.md` set `layout: false`.
- **The CV is data-driven.** All CV content lives in the YAML frontmatter of `index.md`, and `CvProfile.vue` renders it through `useData().frontmatter`. Keys: `name, headline, bio, status, location, avatar, email, github, linkedin, cvLink, highlights[], experiences[], skillGroups[], projects[], education[], certifications[]`. To change CV content, edit the YAML, not the Vue file. `CvProfile.vue` has no placeholder fallbacks; each section hides itself when its key is missing. Only put facts the user has provided into the CV; never invent roles, numbers or certifications. If you add a key, update both files.
- **Posts** live in `posts/en/<slug>.md` and `posts/vi/<slug>.md` (one file per language, same slug). Decap CMS on production commits posts straight to `main` through the GitHub API, which triggers a Netlify deploy, so the local copy can fall behind. Run `git pull` before editing posts. `posts/.gitkeep` keeps the folder in the repo, and the build must keep working when `posts/` is empty. `theme/posts.data.ts` (a `createContentLoader` over `posts/*/*.md` with `excerpt: true`) loads them, tags each with `locale` and `slug`, and sorts them newest first; `BlogList.vue` and `Article.vue` filter that data by the current locale. The excerpt is everything above the first `---` separator in the post body.
- **Post frontmatter**: only `title` and `date` (YYYY-MM-DD). This must stay in sync with the `posts` collection fields in `public/admin/config.yml`.
- **The author is fixed.** Name (`Hieubm`), avatar (`/images/avatar.png`, stored in `public/images/`) and LinkedIn URL are defined once in `.vitepress/theme/author.ts` and used by `Author.vue` and `genFeed.ts`. Any `author`, `gravatar`, `twitter` or `linkedin` keys in post frontmatter are ignored. Don't use Gravatar, and don't show Twitter/X links. The CV in `index.md` uses the same avatar and LinkedIn; keep them in sync.
- **i18n**:
  - `config.ts` declares VitePress `locales` (`root` = en-US, `vi` = vi-VN at `/vi/`) and `rewrites` that serve `posts/en/<slug>.md` at `/posts/<slug>` and `posts/vi/<slug>.md` at `/vi/posts/<slug>`.
  - `createContentLoader` does **not** apply `rewrites` (checked in VitePress 1.3.4), so its URLs are mapped with `resolvePostUrl()` in `theme/locales.ts`. Any code that lists posts must go through it, or `Article.vue`'s `route.path` lookup fails.
  - `theme/locales.ts` holds locale metadata and every UI string (`messages`); it must not import `vitepress` because `genFeed.ts` (Node) uses it too. Components get strings through `useLocale().t()` from `theme/useLocale.ts`. Add new UI strings to both locales there instead of hardcoding them.
  - `Layout.vue` shows a language switcher on the blog list and on posts that have a translation (matched by slug). The CV has no Vietnamese version yet: `locales.vi.home` points to `/`, and `CvProfile.vue` headings are still hardcoded English. To add a Vietnamese CV, create `vi/index.md`, set `home: '/vi/'`, and move the `CvProfile.vue` headings into `messages`.
- **RSS**: `.vitepress/genFeed.ts` runs as the `buildEnd` hook and writes one feed per locale: `feed.rss` and `vi/feed.rss`.
- **Styling**: Tailwind 3 through `postcss.config.js`. Its `content` glob only scans `./.vitepress/theme/**/*.vue`, so classes used anywhere else get purged. Dark mode uses `dark:` classes. The accent color is emerald.
- **`srcExclude`** in `config.ts` keeps `README.md`, `CLAUDE.md` and `cv.md` (the raw source text of the CV) out of the build. Without it they become pages, fall through to `Article.vue`, and crash the build (the post lookup returns `undefined`). Any new root-level `.md` file that is not a page must be added there.
- **`cleanUrls: true`** means pages are served without `.html`.

## CMS and deploy

- `public/admin/index.html` loads Decap CMS 3 from unpkg and the Netlify Identity widget. `public/admin/config.yml` sets `backend: git-gateway`, repo `hieubm1707/blogs`, branch `main`, and `local_backend: true`.
- Decap `i18n` uses `structure: multiple_folders` with locales `en` (default) and `vi`: publishing a post commits both `posts/en/<slug>.md` and `posts/vi/<slug>.md`. `title` and `body` are per-language, `date` is `i18n: duplicate`.
- Media uploads go to `public/images`, served at `/images`.
- `netlify.toml` builds with `pnpm build` and publishes `.vitepress/dist`. Netlify Identity and Git Gateway must be enabled on the site. Every push to `main`, including CMS commits, triggers a deploy.

## Site identity

- Domain: `https://hieubm.netlify.app` (used as `baseUrl` in `genFeed.ts` and in the `twitter:image` meta in `config.ts`). Update both if the domain changes.
- Title `Bùi Minh Hiếu - Software Engineer`, `lang: 'en-US'`. There is no analytics script; the Vue Fathom script from the fork was removed on purpose.
- `vercel.json` is a leftover from the vuejs/blog fork; Netlify is the actual host.

## Conventions

- Keep the site fully static and free to host: no server code and no paid services.
- Match the existing Tailwind utility style in the `.vue` files; don't add a CSS framework or component library.
- Put post images in `public/images/` (the CMS media folder, served at `/images`).
