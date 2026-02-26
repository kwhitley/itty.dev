# Release Command

The `itty release` command provides complete release automation with version bumping, git operations, and npm publishing. It creates a clean, flat package structure optimized for consumption in node_modules.

## Basic Usage

```bash
itty release                  # Patch release from dist/
itty release --minor --tag   # Minor release with git tag
itty release --dry-run       # Test without publishing
itty release --root          # Release from project root
```

## How it Works

1. **Verifies npm auth** (prompts for login if session expired)
2. **Bumps version** in package.json (patch by default)
3. **Extracts build artifacts** to temporary directory
4. **Copies essential files** (README, LICENSE, etc.)
5. **Publishes to npm** from temporary directory
6. **Creates git tags** and commits (only after successful publish)
7. **Cleans up** temporary files

## Release Process

### Version Bumping
Uses semantic versioning with these options:
- `--patch` (default): 1.0.0 → 1.0.1
- `--minor`: 1.0.0 → 1.1.0  
- `--major`: 1.0.0 → 2.0.0
- `--type=alpha`: 1.0.0 → 1.0.0-alpha.0

### Package Structure

The build command writes exports relative to the release directory (no `dist/` prefix by default), so no path transformation is needed at release time. The release command simply extracts `dist/` contents into a flat package.

**In your repo:**
```
dist/
├── index.mjs
├── index.d.ts
└── utils.mjs
package.json (exports: "./index.mjs")
README.md
LICENSE
```

**In npm (after publish):**
```
index.mjs
index.d.ts
utils.mjs
package.json (exports: "./index.mjs")
README.md
LICENSE
```

This creates a clean, flat structure in node_modules without nested dist/ directories.

## Configuration Options

### `--dry-run`
**Test release without publishing**
- **Default:** `false`
- **Example:** `--dry-run`

Performs all steps except actual npm publishing. Perfect for testing your release process.

### `--major`
**Major version bump**
- **Default:** `false` (patch)
- **Example:** `--major`

Increments the major version number for breaking changes.

### `--minor` 
**Minor version bump**
- **Default:** `false` (patch)
- **Example:** `--minor`

Increments the minor version number for new features.

### `--no-cleanup`
**Leave temporary directory**
- **Default:** `false` (cleanup enabled)
- **Example:** `--no-cleanup`

Preserves the temporary release directory for inspection.

### `--no-git`
**Skip git operations**
- **Default:** `false` (git enabled)
- **Example:** `--no-git`

Disables all git operations (commits, tags, pushes).

### `--no-license`
**Skip LICENSE file copy**
- **Default:** `false` (copy LICENSE)
- **Example:** `--no-license`

Prevents copying LICENSE file to the release package.

### `--patch`
**Patch version bump**
- **Default:** `true`
- **Example:** `--patch`

Increments the patch version number for bug fixes.

### `--prepare`
**Run prepare before release**
- **Default:** `false`
- **Example:** `--prepare`

Runs `itty prepare` (lint, test, build) before starting the release process.

### `--public`
**Publish as public package**
- **Default:** `false`
- **Example:** `--public`

Adds `--access=public` to npm publish for scoped packages.

### `--push`
**Push changes and tags to git**
- **Default:** `false`
- **Example:** `--push`

Commits version changes and pushes to the remote repository with interactive commit message prompt.

### `--root`
**Release from project root**
- **Default:** `false` (uses dist/)
- **Example:** `--root`

Releases directly from the project root instead of extracting from dist/. Equivalent to `--src=.`.

### `--silent`
**Skip interactive prompts**
- **Default:** `false`
- **Example:** `--silent`

Uses default commit messages without prompting for input.

### `--src`
**Source directory for release**
- **Default:** `dist`
- **Example:** `--src=build`

Specifies which directory contains the files to publish.

### `--tag`
**Create git tag**
- **Default:** `false`
- **Example:** `--tag`

Creates a git tag for the release version.

### `--type`
**Custom version type**
- **Example:** `--type=beta`

Creates pre-release versions like 1.0.0-beta.0.

### `--verbose`
**Show detailed output**
- **Default:** `false`
- **Example:** `--verbose`

Displays detailed information about each step of the release process.

## Interactive Features

### Commit Message Prompts
When using `--push`, you'll be prompted for an optional commit message:

```
📝 Enter commit message (optional, press Enter to skip): 
> feat: add new features and improvements

✅ Using commit message: "feat: add new features and improvements"
```

**Controls:**
- **Enter** - Skip and use default message
- **Escape/Ctrl+C** - Cancel release and revert version
- **Type** - Custom commit message

## Examples

### Basic Patch Release
```bash
# Simple patch release
itty release
```

### Feature Release with Git
```bash
# Minor version with tag and push
itty release --minor --tag --push
```

### Pre-release Testing
```bash
# Test the full process
itty release --dry-run --verbose
```

### Complete Workflow
```bash
# Prepare, release, and tag
itty release --prepare --minor --tag --push
```

### Beta Release
```bash
# Pre-release version
itty release --type=beta --tag
```

### Root Release
```bash
# Release from project root (no build step)
itty release --root --minor
```

## Error Handling & Rollback

The release command includes automatic rollback on failure:

```bash
❌ Release failed: npm publish failed
🔄 Rolling back version from v1.1.0 to v1.0.0
✅ Version reverted to v1.0.0
```

Common failure scenarios:
- **npm authentication issues** - Check `npm whoami`
- **Network problems** - Retry or use `--dry-run` to test
- **Version already exists** - Bump version manually first
- **Source directory missing** - Run build first or check `--src`

## Integration with Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "release": "itty release",
    "release:minor": "itty release --minor --tag --push",
    "release:major": "itty release --major --tag --push", 
    "release:beta": "itty release --type=beta --tag",
    "release:dry": "itty release --dry-run --verbose"
  }
}
```

## CI/CD Integration

### GitHub Actions
```yaml
- name: Release
  run: itty release --minor --tag --silent
  if: github.ref == 'refs/heads/main'
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Automated Releases
```bash
# Automated release with prepare
itty release --prepare --patch --tag --push --silent
```

## Best Practices

- **Always test with `--dry-run`** before your first release
- **Use `--prepare`** to validate before releasing  
- **Tag releases** with `--tag` for version tracking
- **Push to git** with `--push` to keep repository in sync
- **Use semantic versioning** consistently (patch/minor/major)
- **Review package contents** with `--no-cleanup` and `--dry-run`

## Package Structure Benefits

The release command creates an optimal package structure:
- **No nested dist/ folder** in node_modules
- **Shorter import paths** for consumers
- **Cleaner package.json exports** with relative paths
- **Better IDE support** with flatter structure
- **Faster installs** with fewer directory traversals