# HAST Resource Generator

![](https://github.com/croutonn/generate-hast-resource/workflows/Run%20tests/badge.svg)

Generates hast resource for your blog with Github Actions.

This github action scans your PR for changes to `md` files, generates hast resource.

In your action file:

```yml
name: Generate HAST Resource
on:
  pull_request:
    types: [opened, edited]

jobs:
  generate_hast_job:
    runs-on: ubuntu-latest
    name: Generate HAST Resource
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Generate HAST Resource
        uses: croutonn/generate-hast-resource@0.1.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_CONTEXT: ${{ toJson(github) }}
```

## Repository level Props

These are props that you can configure in the action file to customise the working.

| Props     |            Description             | Required |
| --------- | :--------------------------------: | :------: |
| commitMsg | Commit message when image is added |          |

## Contributing

See [docs](./docs/contributors.md)

## Credits

1. [Zeit NCC](Compiler)

2. [Github Image Actions](https://github.com/calibreapp/image-actions)

   For some utils to copy from.
