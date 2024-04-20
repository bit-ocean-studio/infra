# @bit-ocean/prettier-config

![npm](https://img.shields.io/npm/v/@bit-ocean/prettier-config?logo=prettier&label=prettier-config)

> Universal Prettier configuration.

We use [`Prettier`](https://prettier.io/) for code formatting. This package provides a universal configuration for all our projects.

## Installation

```bash
pnpm add -D prettier @bit-ocean/prettier-config
```

## Configuration

Create a `.prettierrc` file in the root of your project and add the following:

```json
"@bit-ocean/prettier-config"
```

Use Astro:

```json
"@bit-ocean/prettier-config/astro"
```

Or add the following prettier property to your `package.json`:

```json
{
  "prettier": "@bit-ocean/prettier-config"
}
```

Use Astro:

```json
{
  "prettier": "@bit-ocean/prettier-config/astro"
}
```

Add the `prettier` scripts to your `package.json`:

```json
{
  "scripts": {
    "prettier:check": "prettier --check --cache --ignore-unknown .",
    "prettier:fix": "prettier --write --cache --ignore-unknown ."
  }
}
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
