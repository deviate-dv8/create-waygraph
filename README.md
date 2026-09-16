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

## Consumer layout (App Router projects)

The minimal scaffold above is intentionally tiny (one block, no route tree). When the target
app has real Next.js routes, **block folders mirror `app/` page routes**:

- URL `/` -> nav at namespace root (`zsign-web/` or `pia-web/`), not `landing/` or `root/`
- Route groups `(auth)` / `(app)` vanish from folder names
- Folders with no `page.tsx` are grouping only - no NAV.md, no nav block
- Sidebar / layout chrome -> `shared/chrome/`, not a parallel `shell/nav/*` family

Full contract: `WAYGRAPH-CONSUMER-CONVENTION.md` in your mesh
(`.sm/seats/_shared/` on zsign/pia). Engine API: package `waygraph` README + WAYGRAPH-HANDOUT.
