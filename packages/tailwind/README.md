# @bit-ocean/tailwind

![npm](https://img.shields.io/npm/v/@bit-ocean/tailwind?logo=tailwindcss&label=tailwind)

> Universal Tailwind CSS configuration.

## Installation

```bash
pnpm add -D tailwindcss postcss autoprefixer @bit-ocean/tailwind
npx tailwindcss init -p
```

## Configuration

Add the following styles to your `src/styles/index.scss` or global styles file:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then add the following tailwind config presets to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@bit-ocean/tailwind')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
}
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
