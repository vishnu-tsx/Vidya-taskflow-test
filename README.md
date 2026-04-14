# Taskflow

A React + TypeScript + Vite demo that renders an AG Grid populated from the
Random User API, with filters, pagination, cell editing, and conditional
row/cell styling.

## Stack

- React 19 + TypeScript (Vite 7)
- AG Grid Community 35 via `ag-grid-react`
- Tailwind CSS 4
- Axios for HTTP
- Vitest + Testing Library for tests
- Biome for linting and formatting, CSpell for spell-check

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck + production build
```

## Scripts

| Script                 | What it does                                                |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Start Vite dev server                                       |
| `npm run build`        | Run project references build + `vite build`                 |
| `npm run typecheck`    | Typecheck both `tsconfig.app.json` and `tsconfig.node.json` |
| `npm run lint`         | Biome lint across `src/`, `vite.config.ts`, and root config |
| `npm run lint:fix`     | Biome check with autofix                                    |
| `npm run format`       | Biome format in-place                                       |
| `npm run format:check` | Biome format check (CI-friendly)                            |
| `npm run spell`        | CSpell across `src/`                                        |
| `npm run test`         | Vitest (watch). Use `vitest run` for a single pass          |

## Project layout

```
src/
  app/                       # App shell (main.tsx, App.tsx)
  features/aggrid/
    components/              # AgGridDemo, FilterToggle, column defs
    hooks/                   # useAgGridData (data fetch + error/abort)
    services/                # Random User API client
    models/                  # User / Gender types
    utils/                   # Cell & row styling helpers
    constants.ts             # Magic values (ages, colors, page sizes)
    testFixtures.ts          # Shared mock users
  test/setup.ts              # Vitest global setup (RTL cleanup)
  utils/testUtils.ts         # Grid DOM inspection helpers
```

## Testing

Tests live next to the code they cover (`*.test.ts[x]`). They exercise
the component, hook, service, and styling helpers independently — the
component tests assert on user-visible output (row text, column headers,
button roles/`aria-pressed`) rather than AG Grid DOM internals alone.
