import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/configs/**'],
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
