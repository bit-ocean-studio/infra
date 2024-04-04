import type { Options } from 'prettier'

export const astroPresets: Options = {
  astroAllowShorthand: false,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  plugins: ['prettier-plugin-astro']
}
