import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  treeshake: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  skipNodeModulesBundle: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  minify: !options.watch
}))
