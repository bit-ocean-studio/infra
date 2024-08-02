import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Bit Ocean Docs',
      description: 'Documentation site for Bit Ocean.',
      logo: {
        src: '/src/assets/bit_ocean.png'
      },
      social: {
        github: 'https://github.com/bit-ocean-studio'
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: {
            directory: 'guides'
          }
        },
        {
          label: 'Reference',
          autogenerate: {
            directory: 'reference'
          }
        }
      ]
    })
  ]
})
