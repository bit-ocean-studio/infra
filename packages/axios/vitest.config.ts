import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@/*': './src/*'
    }
  },
  test: {
    // alias: {
    //   '@/*': './src/*'
    // },
    environment: 'happy-dom',
    // browser: {
    //   enabled: true,
    //   headless: true,
    //   name: 'chrome'
    // },
    globals: true
    // coverage: {
    //   enabled: true,
    //   include: ['src/**/*.ts']
    // }
  }
})
