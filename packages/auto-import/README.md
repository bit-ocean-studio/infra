# @bit-ocean/auto-import

English / [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/@bit-ocean/auto-import?logo=typescript&label=auto-import)

> Universal auto-import module.

This package provides some universal auto-import presets and resolvers for all our projects.

## Installation

```bash
pnpm add -D unplugin-auto-import @bit-ocean/auto-import
```

## Configuration

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { reactPresets } from '@bit-ocean/auto-import'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: reactPresets,
      dts: '@types/auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/ // .md
      ]
    })
  ]
})
```

### Next.js

```js
// next.config.js
const AutoImport = require('unplugin-auto-import/next').default
const { nextPresets } = require('@bit-ocean/auto-import')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      AutoImport({
        imports: nextPresets,
        dts: '@types/auto-imports.d.ts'
      })
    )
    return config
  }
}
module.exports = nextConfig
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
