# @bit-ocean/renovate-config

![npm](https://img.shields.io/npm/v/@bit-ocean/renovate-config?logo=renovatebot&label=renovate-config)

> Universal Renovate configuration.

We use [`Renovate`](https://docs.renovatebot.com/) for automated dependency updating. This package provides a universal configuration for all our projects.

## Installation

```bash
pnpm add -D @bit-ocean/renovate-config
```

## Configuration

Create a `.renovaterc` file in the root of your project and add the following:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["@bit-ocean"]
}
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
