# Frontend testing setup

This project uses Jest, ts-jest, React Testing Library, and jest-dom.

## Install dependencies

From the `client` directory, run:

```bash
npm install
```

Commit the refreshed `package-lock.json` together with `package.json` so installs are reproducible.

## Run tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Included tests

- Dashboard schema validation
- MetricCard rendering
- DynamicRenderer registered-widget and fallback behavior
- DynamicForm rendering and required-field validation

These are focused tests of existing behavior; they do not represent full application or backend API coverage.
