# Lint Command

The `itty lint` command runs ESLint with TypeScript-optimized rules and smart configuration detection. It automatically falls back to built-in configuration when no local ESLint config exists.

## Basic Usage

```bash
itty lint                     # Lint all TypeScript files
itty lint --fix              # Auto-fix issues
itty lint src/ lib/          # Lint specific directories
itty lint --quiet            # Show only errors
```

## How it Works

1. **Detects ESLint configuration** in your project
2. **Falls back to built-in config** if none found
3. **Runs ESLint** with TypeScript support
4. **Reports issues** with clear, actionable messages
5. **Auto-fixes** when possible (with `--fix`)

## Built-in Configuration

When no local ESLint config is found, itty-packager uses a TypeScript-optimized configuration:

- **TypeScript ESLint parser** for accurate type checking
- **Recommended rules** for TypeScript projects
- **Import/export validation** for modern modules
- **Code style consistency** with Prettier compatibility
- **Performance-optimized** for fast execution

## Configuration Options

### `--fix`
**Automatically fix issues**
- **Default:** `false`
- **Example:** `--fix`

Attempts to automatically fix linting issues where possible.

### `--format`
**Output format**
- **Default:** `stylish`
- **Options:** `stylish`, `compact`, `json`, `unix`
- **Example:** `--format=json`

Controls how linting results are displayed.

### `--quiet`
**Show only errors**
- **Default:** `false`
- **Example:** `--quiet`

Suppresses warnings and only shows error-level issues.

## Custom Configuration

You can extend the built-in configuration in your project:

### Using .eslintrc.js
```javascript
module.exports = {
  extends: ['itty-packager/eslint-config'],
  rules: {
    // Your custom rules
    'no-console': 'warn'
  }
}
```

### Using ESM Configuration
```javascript
// eslint.config.mjs
import { createConfig } from 'itty-packager/lib/configs/createConfig.mjs'

export default createConfig({
  rules: {
    // Your custom rules
    'prefer-const': 'error'
  }
})
```

### Using package.json
```json
{
  "eslintConfig": {
    "extends": ["itty-packager/eslint-config"],
    "rules": {
      "no-unused-vars": "error"
    }
  }
}
```

## Examples

### Basic Linting
```bash
# Lint all TypeScript files
itty lint
```

### Auto-fix Issues
```bash
# Fix what can be fixed automatically
itty lint --fix
```

### Specific Directories
```bash
# Lint only certain directories
itty lint src/ test/
```

### CI/CD Pipeline
```bash
# Quiet mode for clean CI output
itty lint --quiet --format=compact
```

### JSON Output
```bash
# Machine-readable output
itty lint --format=json > lint-results.json
```

## Integration with Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "itty lint",
    "lint:fix": "itty lint --fix",
    "lint:ci": "itty lint --quiet",
    "lint:check": "itty lint --format=json"
  }
}
```

## IDE Integration

The built-in ESLint config works with popular editors:

### VS Code
Install the ESLint extension and add to `.vscode/settings.json`:
```json
{
  "eslint.validate": ["typescript", "javascript"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### WebStorm
ESLint is automatically detected and configured when using the built-in config.

## Common Rules

The built-in configuration includes these key rules:

- **@typescript-eslint/no-unused-vars** - Catches unused variables
- **@typescript-eslint/no-explicit-any** - Warns about `any` usage
- **@typescript-eslint/prefer-nullish-coalescing** - Modern null checking
- **import/no-unresolved** - Validates import paths
- **prefer-const** - Enforces immutability where possible

## Error Handling

Common linting scenarios:

- **No config found** - Automatically uses built-in TypeScript config
- **Parse errors** - Shows TypeScript compilation issues
- **Rule violations** - Clear messages with fix suggestions
- **Plugin missing** - Helpful installation instructions

## Performance

The lint command is optimized for speed:
- **Incremental checking** when possible
- **Parallel processing** for multiple files
- **Smart caching** to avoid re-linting unchanged files
- **Minimal rule set** focused on essential issues