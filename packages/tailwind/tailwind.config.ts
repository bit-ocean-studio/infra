import type { Config } from 'tailwindcss'

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {}
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
}
export default config
