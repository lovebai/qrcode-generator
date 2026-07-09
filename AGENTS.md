# AGENTS.md

## Project Overview

QR Code generator built with Create React App. Uses React 18, Ant Design 5, `qrcode.react` for QR generation, `html2canvas` + `file-saver` for image download. Written in JavaScript (JSX). No TypeScript.

## Build / Lint / Test Commands

```bash
npm start          # Dev server at localhost:3000 (webpack-dev-server)
npm run build      # Production build to build/
npm test           # Launch Jest in interactive watch mode
npm run serve      # Serve production build (requires: npm install -g serve)
```

### Running a single test

```bash
# By filename pattern
npm test -- --testNamePattern="component name"
npm test -- App.test.js
npm test -- src/components/MyComponent.test.jsx

# Watch mode — press 'p' to filter by filename, 't' to filter by test name
```

### Debugging tests

```bash
# Run tests in non-watch mode with verbose output
node scripts/test.js -- --watchAll=false --verbose

# Run with coverage
node scripts/test.js -- --coverage
```

## Code Style Guidelines

### Imports

- Use ES module syntax (`import`/`export`). No CommonJS.
- Group imports by type (blank line between groups):
  1. React/hooks
  2. Third-party libraries (antd, qrcode.react, etc.)
  3. Local components
  4. CSS/styles (last)
- Named imports for specific library members: `import { Card, Tabs, Input, Button } from "antd"`
- Default export for components: `export default App`

### Formatting & Linting

- ESLint config: `react-app` + `react-app/jest` presets (extends in package.json)
- No Prettier config found — follow existing conventions (single `"` or `""`).
- Current code uses double quotes with semicolons.
- 2-space indentation throughout.
- Trailing newline at end of files.

### Naming Conventions

- **Components**: PascalCase (`App`, `MyComponent`)
- **Files**: PascalCase for components (`App.js`), camelCase for utilities (`reportWebVitals.js`, `setupTests.js`)
- **Variables/functions**: camelCase (`handleInputChange`, `selectedKey`, `temp`)
- **Event handlers**: prefix with `handle` + element/event name (`handleInputChange`, `handleTabChange`, `handleSave`)
- **Constants**: camelCase (no UPPER_SNAKE_CASE observed)
- **Test files**: `*.test.js`, `*.spec.js`, or `__tests__/*.js`

### React / JSX Conventions

- Functional components only (no classes)
- `const App = () => { ... }` style
- Hooks: `useState` for local state; group at top of component
- Inline `style={{}}` objects for styling (no CSS modules or styled-components in use)
- Conditional rendering via ternary or `&&`; avoid extracting separate render methods
- Event handlers defined as arrow functions within the component
- Avoid commented-out code; remove dead code rather than commenting it

### Error Handling

- No formal error handling conventions exist yet
- Add try/catch for async operations (e.g., `html2canvas`, `fetch`)
- Avoid swallowing errors silently — at minimum `console.error` or user-facing feedback via antd `message`
- No error boundaries currently; add if introducing error-prone features

### Project Structure

```
src/
  App.js          # Main component (all logic lives here currently)
  index.js        # Entry point
  index.css       # Global styles
  setupTests.js   # Jest setup (imports @testing-library/jest-dom)
  reportWebVitals.js
config/           # Webpack, Jest, env config (CRA eject output)
scripts/          # Build/start/test scripts
public/           # Static assets
```

### Testing Conventions

- Use `@testing-library/react` + `@testing-library/jest-dom`
- No tests exist yet — follow standard RTL patterns when adding:
  - `render(<Component />)` + `screen.getByText/TestId/Role`
  - `userEvent` (v13) for interactions
  - Prefer `getByRole` over `getByTestId` where possible
- Test files co-located: `src/Component.test.js` or `src/__tests__/Component.test.js`

### File & Export Conventions

- One component per file, default export
- Non-component utilities: named exports preferred
- No index.js barrel files

### CSS

- Tailwind CSS is a dependency (installed) but not currently used in source files
- Index uses plain CSS for body/code reset
- Components use inline `style={{}}` — avoid external CSS files for component styles
- If adding Tailwind, prefer utility classes over inline styles for consistency