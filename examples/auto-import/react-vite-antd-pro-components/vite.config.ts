import { antdProComponentsResolver, antdResolver } from '@bit-ocean/auto-import'
import ReactSWC from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    ReactSWC(),
    AutoImport({
      imports: [],
      resolvers: [antdResolver(), antdProComponentsResolver()],
      dts: '@types/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/ // .md
      ]
    })
  ]
})
