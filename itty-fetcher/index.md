# itty-fetcher

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-fetcher)
[![Version](https://img.shields.io/npm/v/itty-fetcher.svg?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-fetcher&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-fetcher)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-fetcher/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-fetcher?branch=v1.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-fetcher?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

**An ultra-tiny native fetch wrapper to clean up your API calls.**

**~650 bytes** of pure magic to transform your fetch calls from verbose boilerplate into clean, readable API calls.

## What is itty-fetcher?

itty-fetcher is a lightweight wrapper around the native `fetch` API that eliminates common boilerplate and provides a more intuitive way to make HTTP requests. Built with the same philosophy as other [itty.dev](https://itty.dev) libraries - maximum functionality with minimal bytes.

## ✨ Key Features

- **Automatic** - JSON parsing, request serialization, error throwing, etc.
- **Composable** - Set up your API/endpoint once, then call it cleanly
- **Human-Readable** - Method calls that feel natural (`api.get('/users')`, `users.post({ name: 'Steve' })`)
- **100% TypeScript** - Intelligent type inference with generics for request/response shapes
- **Universal** - Works everywhere fetch is supported... and everywhere it's not (through polyfills)

## Quick Comparison

**Before (native fetch):**
```ts
const response = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
})

if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

const user = await response.json()
```

**After (itty-fetcher):**
```ts
const user = await fetcher().post('/api/users', { name: 'Alice' })
```

## Installation

```bash
npm install itty-fetcher
# or
yarn add itty-fetcher
# or
bun add itty-fetcher
```

## Basic Usage

```ts
import { fetcher } from 'itty-fetcher'

// Simple requests
const users = await fetcher().get('/api/users')
const newUser = await fetcher().post('/api/users', { name: 'Alice' })

// Create a reusable API client
const api = fetcher('https://api.example.com', {
  headers: { 'Authorization': 'Bearer token' }
})

const data = await api.get('/users')
```

## Philosophy

Like any [itty.dev](https://itty.dev) project, this is not a kitchen-sink library. If you need advanced features like automatic retries or complex request interception, consider a more full-featured library. This is for when you want native fetch behavior with dramatically less boilerplate.

**✅ Perfect for:**
- Removing boilerplate from fetch calls
- Projects using native fetch today
- Composable API clients
- Simple use-cases where size matters

**❌ Consider alternatives for:**
- Automatic retries or timeout handling
- GraphQL (use a GraphQL client)
- Complex request/response middleware
- Very advanced edge-cases

## Next Steps

- [Getting Started](./getting-started) - Basic setup and first API calls
- [Configuration](./configuration) - All available options
- [API Reference](./api) - Complete method documentation
- [TypeScript Guide](./typescript/) - Type-safe usage patterns
- [Examples](./examples/) - Real-world usage examples