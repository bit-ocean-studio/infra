# @bit-ocean/bootstrap-animation

![npm](https://img.shields.io/npm/v/@bit-ocean/bootstrap-animation?logo=vite&label=bootstrap-animation)

> Universal bootstrap animation configuration, support Vite plugin.

## Installation

```bash
pnpm add -D @bit-ocean/bootstrap-animation
```

## Configuration

### Vite

```ts
// vite.config.ts
import { BootstrapAnimation } from '@bit-ocean/bootstrap-animation'

export default defineConfig({
  plugins: [BootstrapAnimation()]
})
```

### Next.js

```js
// next.config.js
const { bootstrapLog } = require('@bit-ocean/bootstrap-animation')

bootstrapLog()
```

### React Native

```js
// metro.config.js
const { bootstrapLog } = require('@bit-ocean/bootstrap-animation')

bootstrapLog()
```

## Rewrite default config

```ts
// vite.config.ts
import { BootstrapAnimation } from '@bit-ocean/bootstrap-animation'

export default defineConfig({
  plugins: [
    BootstrapAnimation({
      author: ''
    })
  ]
})
```
