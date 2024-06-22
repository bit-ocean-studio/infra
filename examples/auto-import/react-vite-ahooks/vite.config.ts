import { ahooksResolver } from '@bit-ocean/auto-import'
import ReactSWC from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    ReactSWC(),
    AutoImport({
      imports: [],
      resolvers: [ahooksResolver()],
      dts: '@types/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/ // .md
      ]
    })
  ]
})
