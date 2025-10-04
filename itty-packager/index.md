# itty-packager

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-packager)
[![Version](https://img.shields.io/npm/v/itty-packager.svg?style=flat-square)](https://npmjs.com/package/itty-packager)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-packager?style=flat-square)](https://coveralls.io/github/kwhitley/itty-packager)
[![Issues](https://img.shields.io/github/issues/kwhitley/itty-packager?style=flat-square)](https://github.com/kwhitley/itty-packager/issues)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

## Build, lint, and release TypeScript packages with zero configuration.

itty-packager is a modern CLI tool that simplifies the development workflow for TypeScript libraries. It provides four essential commands that handle the entire lifecycle from development to publishing, all optimized for modern JavaScript package distribution.

## What does it do?

itty-packager streamlines your TypeScript package development by providing:

- **Zero-config TypeScript building** with automatic ESM/CJS hybrid output support
- **Manages your package.json exports** for automatically tree-shakeable named exports
- **Built-in ESLint linting** with sane defaults, but using your own local config
- **Complete release management** with version bumping, git tagging, npm publishing, etc.

## The Commands

### [`itty build`](./build.md)
Compiles TypeScript files to optimized JavaScript bundles using Rollup. Automatically generates package.json exports, supports multiple output formats (ESM/CJS), includes minification and sourcemaps, and creates TypeScript declaration files.

### [`itty lint`](lint.md)
Runs ESLint with TypeScript-optimized rules and automatic configuration. Falls back to built-in config when no local ESLint config exists, supports fixing issues automatically, and provides clean, actionable output.

### [`itty prepare`](./prepare.md)
Runs lint, test, and build in sequence - the perfect pre-release workflow. Skips missing steps gracefully, provides clear progress indicators, and supports verbose output for debugging.

### [`itty release`](./release.md)
Complete release automation with version bumping, git operations, and npm publishing. Supports semantic versioning, interactive commit messages, dry-run mode, and automatic rollback on failure.

## Quick Start

```bash
# Install globally or use with npx
npm install -g itty-packager

# In your TypeScript project
itty build           # Build your project
itty lint            # Lint your code
itty prepare         # Run full pre-release sequence
itty release --minor # Release with version bump
```
