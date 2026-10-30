# Frontend testing setup

This project uses Jest, ts-jest, React Testing Library, and jest-dom.

## Install dependencies

From the `client` directory, run:

```bash
npm install
```

This also refreshes `package-lock.json` with the Jest/testing dependencies. Commit the updated lockfile together with `package.json` so CI and other developers can use `npm ci` reproducibly.

## Run tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Included coverage

- `src/schemas/__tests__/dashboardSchema.test.ts`: accepts valid dashboard schemas and rejects unsupported widget types and invalid chart/table data.
- `src/components/MetricCard/__tests__/MetricCard.test.tsx`: checks metric title/value and optional unit/trend rendering.
- `src/components/Layout/__tests__/DynamicRenderer.test.tsx`: checks registry-based metric rendering and unsupported-widget fallback.
- `src/components/DynamicForm/__tests__/DynamicForm.test.tsx`: checks configured fields, required-field validation, and blocked negative/scientific-notation keystrokes for numeric input.

These are focused tests of existing behavior; they do not claim full application coverage or replace backend API tests.
