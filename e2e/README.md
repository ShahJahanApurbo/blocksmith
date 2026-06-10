# End-to-end tests

Playwright tests target the `@blocksmith/editor` Vite preview dev server (`packages/editor` on port **5174**). The studio app is not required for these tests.

## Prerequisites

```bash
pnpm install
pnpm exec playwright install chromium
```

## Run tests

```bash
# From repo root — starts the editor preview via webServer in playwright.config.ts
pnpm test:e2e

# Interactive UI
pnpm exec playwright test --ui

# Headed browser (debug)
pnpm exec playwright test --headed
```

Unit tests are unchanged:

```bash
pnpm test
```

## Visual regression baselines

Screenshot baselines live in `e2e/__screenshots__/`. Playwright compares new renders with these PNGs on every run (`toHaveScreenshot` in `visual.spec.ts`).

### Update baselines after intentional UI changes

```bash
pnpm exec playwright test --update-snapshots
```

If port **5174** is already in use by an older dev server, stop it first (or run with `CI=true`) so Playwright starts a fresh `@blocksmith/editor` preview.

Review the diff in `e2e/__screenshots__/` before committing. Only commit baseline updates when the visual change is deliberate.

### CI

The `e2e` job in `.github/workflows/ci.yml` runs `pnpm test:e2e` on Ubuntu with Chromium. Failed screenshot comparisons upload a Playwright HTML report artifact.
