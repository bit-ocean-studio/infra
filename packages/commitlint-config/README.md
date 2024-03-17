# @bit-ocean/commitlint-config

![npm](https://img.shields.io/npm/v/@bit-ocean/commitlint-config?logo=commitlint&label=commitlint-config)

> Universal Commitlint configuration.

## Installation

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional cz-git commitizen @bit-ocean/commitlint-config
```

## Configuration

Create a `.commitlintrc.json` file in the root of your project and add the following:

```json
{
  "extends": ["@bit-ocean"]
}
```

Then add the following properties to your `package.json`:

```json
{
  "scripts": {
    "cz": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

## Husky Configuration

Run following command to add `husky` and a `commit-msg` hook:

```bash
pnpm add -D husky
pnpm i
npx husky init
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```

## Usage

Run the following command to commit your changes:

```bash
git add .
pnpm cz
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
