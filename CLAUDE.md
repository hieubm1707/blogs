# CLAUDE.md

This is a personal CV and blog site: VitePress with a custom theme, content managed by Decap CMS, deployed free on Netlify. The UI text and most content are in **Vietnamese**, so keep new UI strings in Vietnamese. The user talks in Vietnamese; reply in Vietnamese.

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
- **The CV is data-driven.** All CV content lives in the YAML frontmatter of `index.md`, and `CvProfile.vue` renders it through `useData().frontmatter`. Keys: `name, headline, bio, status, location, avatar, email, github, linkedin, cvLink, highlights[], experiences[], skillGroups[], projects[], education[], certifications[]`. To change CV content, edit the YAML, not the Vue file. If you add a key, update both files.
- **Posts** live in `posts/*.md`. Decap CMS on production commits posts straight to `main` through the GitHub API, which triggers a Netlify deploy, so the local copy can fall behind. Run `git pull` before editing posts. `posts/.gitkeep` keeps the folder in the repo, and the build must keep working when `posts/` is empty. `theme/posts.data.ts` (a `createContentLoader` with `excerpt: true`) loads them and sorts them newest first; `BlogList.vue` and `Article.vue` use that data. The excerpt is everything above the first `---` separator in the post body.
- **Post frontmatter**: `title`, `date` (YYYY-MM-DD), `author`, and optionally `gravatar` (MD5 of the email) and `twitter`. This must stay in sync with the `posts` collection fields in `public/admin/config.yml`.
- **RSS**: `.vitepress/genFeed.ts` runs as the `buildEnd` hook and writes `feed.rss` into the output directory.
- **Styling**: Tailwind 3 through `postcss.config.js`. Its `content` glob only scans `./.vitepress/theme/**/*.vue`, so classes used anywhere else get purged. Dark mode uses `dark:` classes. The accent color is emerald.
- **`srcExclude`** in `config.ts` keeps `README.md` and `CLAUDE.md` out of the build. Without it they become pages, fall through to `Article.vue`, and crash the build (the post lookup returns `undefined`). Any new root-level `.md` file that is not a page must be added there.
- **`cleanUrls: true`** means `posts/foo.md` is served at `/posts/foo`.

## CMS and deploy

- `public/admin/index.html` loads Decap CMS 3 from unpkg and the Netlify Identity widget. `public/admin/config.yml` sets `backend: git-gateway`, repo `hieubm1707/blogs`, branch `main`, and `local_backend: true`.
- Media uploads go to `public/images`, served at `/images`.
- `netlify.toml` builds with `pnpm build` and publishes `.vitepress/dist`. Netlify Identity and Git Gateway must be enabled on the site. Every push to `main`, including CMS commits, triggers a deploy.
- `vercel.json` is a leftover from the fork; Netlify is the actual host.

## Known leftovers from the vuejs/blog fork

- `.vitepress/config.ts` still has "The Vue Point" as title and description, `@vuejs` Twitter meta, and Vue's Fathom analytics script.
- `genFeed.ts` still has `baseUrl = https://blog.vuejs.org` and Vue's feed title and copyright.
- `index.md` holds placeholder CV data.

Don't "fix" these unless asked. When the user asks for rebranding, these are the places to change.

## Conventions

- Keep the site fully static and free to host: no server code and no paid services.
- Match the existing Tailwind utility style in the `.vue` files; don't add a CSS framework or component library.
- Put post images in `public/images/` (the CMS media folder, served at `/images`).
