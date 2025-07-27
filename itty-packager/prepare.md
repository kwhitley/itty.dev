# Prepare Command

The `itty prepare` command runs lint, test, and build in sequence - the perfect pre-release workflow. It provides a one-command solution to validate your package before publishing.

## Basic Usage

```bash
itty prepare                  # Run lint → test → build
itty prepare --verbose       # Show detailed output
```

## How it Works

1. **Runs lint** using `npm run lint` or built-in linting
2. **Runs tests** using `npm run test` (if script exists)
3. **Runs build** using `npm run build` or built-in build
4. **Stops on failure** - won't continue if any step fails
5. **Reports progress** with clear status indicators

## Execution Sequence

### Step 1: Lint
- Tries `npm run lint` script first
- Falls back to `itty lint` if no script found
- Uses built-in TypeScript ESLint config as fallback

### Step 2: Test  
- Runs `npm run test` if script exists
- Skips gracefully if no test script found
- Shows skip message for transparency

### Step 3: Build
- Tries `npm run build` script first  
- Falls back to `itty build` if no script found
- Uses built-in TypeScript compilation

## Progress Indicators

The prepare command shows clear progress with emoji indicators:

```
🚀 Running prepare sequence...
🔍 Running lint script...
✅ Lint passed
🧪 Running test script...
✅ Tests passed  
🔨 Running built-in build...
✅ Build completed
🎉 Prepare sequence completed successfully
```

## Configuration Options

### `--verbose`
**Show detailed output**
- **Default:** `false`
- **Example:** `--verbose`

Displays the full output from each command instead of just progress indicators.

## Error Handling

The prepare command stops immediately on the first failure:

### Lint Failure
```
🚀 Running prepare sequence...
🔍 Running lint script...
❌ Command failed: Lint failed: ESLint exited with code 1

[ESLint error details]
```

### Test Failure  
```
🚀 Running prepare sequence...
🔍 Running lint script...
✅ Lint passed
🧪 Running test script...
❌ Command failed: Tests failed: Script 'test' exited with code 1

[Test error details]
```

### Build Failure
```
🚀 Running prepare sequence...
🔍 Running lint script...
✅ Lint passed
🧪 Running test script...  
✅ Tests passed
🔨 Running built-in build...
❌ Command failed: Build failed: [error details]
```

## Script Detection

The prepare command intelligently detects and uses your package.json scripts:

```json
{
  "scripts": {
    "lint": "eslint src/",           // Used for lint step
    "test": "jest",                  // Used for test step  
    "build": "tsc && rollup -c"      // Used for build step
  }
}
```

## Fallback Behavior

When scripts don't exist, prepare gracefully falls back:

- **No lint script:** Uses `itty lint` with built-in config
- **No test script:** Skips test step with notification
- **No build script:** Uses `itty build` with default settings

## Examples

### Basic Prepare
```bash
# Run full prepare sequence
itty prepare
```

### Verbose Output
```bash
# See detailed output from each step
itty prepare --verbose
```

### Integration with Release
```bash
# Prepare then release
itty prepare && itty release
```

## Integration with Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "prepare": "itty prepare",
    "prepublishOnly": "itty prepare",
    "pre-release": "itty prepare --verbose"
  }
}
```

## CI/CD Integration

Perfect for continuous integration:

```yaml
# GitHub Actions example
- name: Prepare package
  run: itty prepare --verbose
  
- name: Release
  run: itty release --dry-run
  if: github.ref == 'refs/heads/main'
```

## Common Workflows

### Development Workflow
```bash
# Check before committing
itty prepare
git add .
git commit -m "feat: new feature"
```

### Release Workflow  
```bash
# Validate before releasing
itty prepare
itty release --minor --tag --push
```

### CI Validation
```bash
# Full validation in CI
itty prepare --verbose
```

## Custom Scripts Integration

Works seamlessly with your existing tooling:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.js",
    "test": "vitest run",
    "build": "tsup src/index.ts",
    "type-check": "tsc --noEmit"
  }
}
```

## Performance

The prepare command is optimized for efficiency:
- **Early exit** on first failure saves time
- **Parallel execution** where possible
- **Smart caching** leverages tool-specific caching
- **Progress indicators** keep you informed without overwhelming

## Best Practices

- **Run before every release** to catch issues early
- **Use in CI/CD** to validate all changes
- **Combine with git hooks** for automatic validation
- **Add to pre-commit hooks** for team consistency