import { Options } from 'prettier'

export const tailwindPresets: Options = {
  tailwindAttributes: ['className', 'class', ':class'],
  tailwindFunctions: ['clsx', 'tw'],
  plugins: ['prettier-plugin-tailwindcss']
}
