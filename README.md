# create-waygraph

Scaffolds a new [waygraph](https://github.com/deviate-dv8/waygraph) project - one fixed
shape, no prompts, no template picker.

```bash
npx create-waygraph my-project
cd my-project
npm install
npx playwright install chromium
npm test
```

Generates:

```
my-project/
  package.json          waygraph + @playwright/test
  tsconfig.json
  playwright.config.ts
  .gitignore
  src/
    blocks/load-page.block.ts   one real Block (act/resolve/verify)
    flows/example.flow.ts       Engine.defineFlow([start, LoadPageBlock, end])
  tests/
    example.spec.ts             runs the flow, asserts the terminal Checkpoint
```

`npm test` goes green immediately, offline - the example Block navigates to a self-contained
`data:` URL, not a live site, so scaffolding a project never depends on network access.

Ships as its own package rather than a `waygraph init` subcommand, so consuming `waygraph`
at runtime never pulls in scaffolding code - `npx create-waygraph` resolves and runs without
adding anything to your own `node_modules`.
