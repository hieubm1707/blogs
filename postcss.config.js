import tailwind from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'

export default {
  plugins: [
    tailwind({
      // Toggled by the `dark` class on <html> (ThemeToggle.vue), not the OS setting
      darkMode: 'class',
      content: ['./.vitepress/theme/**/*.vue'],
      plugins: [tailwindTypography]
    })
  ]
}
