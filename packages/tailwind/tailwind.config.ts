import { themeBaseToken } from '@bit-ocean/theme'
import type { Config } from 'tailwindcss'

const toPx = (value: number) => `${value}px`

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      screens: {
        sm: toPx(themeBaseToken.screenSMMin!),
        md: toPx(themeBaseToken.screenMDMin!),
        lg: toPx(themeBaseToken.screenLGMin!),
        xl: toPx(themeBaseToken.screenXLMin!),
        '2xl': toPx(themeBaseToken.screenXXLMin!)
      }
    }
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
}
export default config
