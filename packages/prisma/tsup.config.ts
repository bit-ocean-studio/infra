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
  format: ['cjs'],
  minify: !options.watch,
  external: ['@prisma/client', '@nestjs/common', '@nestjs/core']
}))
