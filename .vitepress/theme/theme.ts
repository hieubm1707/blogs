// Light/dark theme. Light is the default; the visitor's choice is stored under
// this key. Shared by ThemeToggle.vue and the inline head script in config.ts
// (keep this file free of `vitepress` imports so config.ts can load it).
export const THEME_STORAGE_KEY = 'theme'

// Runs in <head> before first paint to avoid a light→dark flash
export const themeInitScript = `;(() => {
  try {
    if (localStorage.getItem('${THEME_STORAGE_KEY}') === 'dark')
      document.documentElement.classList.add('dark')
  } catch (e) {}
})()`
