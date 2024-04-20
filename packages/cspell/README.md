# @bit-ocean/cspell

![npm](https://img.shields.io/npm/v/@bit-ocean/cspell?logo=npm&label=cspell)

> Universal CSpell dictionary configuration.

We use [`CSpell`](https://cspell.org/) for code spell checking. This package provides some universal dictionaries for all our projects.

## Installation

```bash
pnpm add -D cspell @bit-ocean/cspell
```

## Configuration

Create a `.cspell.json` file in the root of your project and add the following:

```json
{
  "$schema": "https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json",
  "version": "0.2",
  "language": "en",
  "dictionaries": ["custom-words"],
  "dictionaryDefinitions": [
    {
      "name": "custom-words",
      "path": ".cspell.txt",
      "addWords": true
    }
  ],
  "import": ["@bit-ocean/cspell"]
}
```

Add `cspell` script to your `package.json`:

```json
{
  "scripts": {
    "cspell:sort:dicts": "pnpm bo cspell:sort:dicts",
    "cspell:check": "cspell --no-progress --show-suggestion --show-context --cache **"
  }
}
```

## License

[MIT](/LICENSE) License &copy; 2024 Bit Ocean
