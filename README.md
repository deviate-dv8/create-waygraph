# create-waygraph

Scaffolds a new [waygraph](https://github.com/deviate-dv8/waygraph) **offline** project -
one fixed shape, no prompts, no template picker.

This is the scaffold command linked from
[waygraph GitHub Pages](https://deviate-dv8.github.io/waygraph/) (`npx create-waygraph`).
Same template as `npx waygraph init` (waygraph >= 0.12.6). For a live saucedemo walkthrough
without creating a folder in your cwd, use `npx waygraph try demo` instead.

**Scaffold tree (authoritative):** https://deviate-dv8.github.io/waygraph/scaffold.html

```bash
npx create-waygraph my-project
cd my-project
npm install
npx playwright install chromium
npm test
npm run demo
```

Generates (0.12+):

```text
my-project/
  package.json
  STRUCTURE.md
  src/
    blocks/
      SITE-MAP.md
      demo-web/                    # synthetic "/" (data: URL)
        NAV.md
        nav-home.block.ts
        methods/
          assert-hello.method.block.ts
    states/demo.states.ts
    flows/example.flow.ts          # withTitle + withHighlightFixtures
  tests/example.spec.ts
```

`npm test` goes green offline - nav uses a `data:` URL. Stubs / fixtures / one YAP
slide are already wired so `npm run demo` shows narration.

## Consumer layout (App Router projects)

When the target app has real Next.js routes, **block folders mirror `app/` page routes**:

- URL `/` -> nav at namespace root (`zsign-web/` or `pia-web/`), not `landing/` or `root/`
- Route groups `(auth)` / `(app)` vanish from folder names
- Folders with no `page.tsx` are grouping only - no NAV.md, no nav block
- Sidebar / layout chrome -> `shared/chrome/`, not a parallel `shell/nav/*` family

Full contract: waygraph [Consumer layout](https://deviate-dv8.github.io/waygraph/consumer.html)
and mesh handout `WAYGRAPH-CONSUMER-CONVENTION.md`.
