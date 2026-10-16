# Architecture

## Tests

- Keep unit and integration tests next to the code they exercise as
  `*.test.ts` or `*.test.tsx` files under `src/`. Do not add `__tests__`
  directories.
- Reserve the root `__mocks__/` directory for Jest manual mocks of packages.
  Keep demo data and fixtures with their feature, and shared test helpers in
  `src/test/`.
- Use `renderWithProviders` from `src/test/render.tsx` for components that
  need the React Query and theme providers. It can also seed the wallet-backed
  auth store for a test and restores that state on unmount.
- Keep browser end-to-end tests in `e2e/`; use Playwright specs, fixtures, and
  support files there rather than importing test helpers from application
  code.
