# Build Command

The `itty build` command compiles TypeScript files to optimized JavaScript bundles using Rollup and TypeScript. It automatically handles modern package distribution requirements with zero configuration.

## Basic Usage

```bash
itty build                    # Build from src/ to dist/
itty build --minify          # Build with minification
itty build --hybrid          # Build both ESM and CJS
itty build --from=lib --out=build  # Custom directories
```

## How it Works

1. **Discovers TypeScript files** in your source directory
2. **Compiles with TypeScript** for type checking and declaration files
3. **Bundles with Rollup** for optimized output
4. **Updates package.json** with correct exports
5. **Generates sourcemaps** and minified versions (optional)

## Output Structure

For a single file project:
```
dist/
├── index.mjs          # ESM bundle
├── index.d.ts         # TypeScript declarations
└── index.mjs.map      # Source map
```

For multi-file projects:
```
dist/
├── index.mjs
├── index.d.ts
├── utils.mjs
├── utils.d.ts
└── *.mjs.map
```

## Package.json Integration

The build command automatically updates your `package.json` exports. By default, exports are written relative to the output directory (no `dist/` prefix), since `itty release` publishes from `dist/`.

**Single file:**
```json
{
  "exports": {
    ".": {
      "import": "./index.mjs",
      "types": "./index.d.ts"
    }
  }
}
```

**Multiple files:**
```json
{
  "exports": {
    ".": {
      "import": "./index.mjs",
      "types": "./index.d.ts"
    },
    "./utils": {
      "import": "./utils.mjs",
      "types": "./utils.d.ts"
    }
  }
}
```

If releasing from the project root instead (via `itty release --root`), use `--release-from=.` to include the output directory prefix:
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

## Configuration Options

### `--from`
**Source directory for TypeScript files**
- **Default:** `src`
- **Example:** `--from=lib`

Specifies which directory contains your TypeScript source files.

### `--hybrid`
**Enable dual ESM/CJS output**
- **Default:** `false` (ESM only)
- **Example:** `--hybrid`

Generates both ESM (.mjs) and CommonJS (.cjs) bundles for maximum compatibility.

### `--minify`
**Enable code minification**
- **Default:** `false`
- **Example:** `--minify`

Compresses the output using Terser for smaller bundle sizes.

### `--out`
**Output directory**
- **Default:** `dist`
- **Example:** `--out=build`

Specifies where compiled files should be written.

### `--release-from`
**Release directory**
- **Default:** same as `--out`
- **Example:** `--release-from=.`

Controls how export paths are written in `package.json`. By default, exports are relative to the output directory (since `itty release` publishes from there). Use `--release-from=.` when releasing from the project root, so exports include the output directory prefix (e.g. `./dist/index.mjs`).

### `--sourcemap`
**Generate source maps**
- **Default:** `true`
- **Example:** `--no-sourcemap`

Controls whether source maps are generated for debugging.

## Examples

### Basic Library Build
```bash
# Standard TypeScript library
itty build
```

### Production Ready
```bash
# Minified with both ESM and CJS
itty build --minify --hybrid
```

### Custom Directories
```bash
# Build from lib/ to build/
itty build --from=lib --out=build
```

### Without Source Maps
```bash
# Skip source maps for production
itty build --no-sourcemap --minify
```

## Integration with Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "build": "itty build",
    "build:prod": "itty build --minify --hybrid",
    "build:dev": "itty build --sourcemap"
  }
}
```

## TypeScript Configuration

The build command works with your existing `tsconfig.json`. Recommended settings:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext", 
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"]
}
```

## Error Handling

Common build errors and solutions:

- **No TypeScript files found** - Check your `--from` directory contains `.ts` files
- **TypeScript compilation errors** - Fix type errors shown in output
- **Module resolution issues** - Verify your `tsconfig.json` module settings
- **Permission errors** - Ensure write access to output directory