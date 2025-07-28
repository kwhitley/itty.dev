# itty-fetcher

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-fetcher)
[![Version](https://img.shields.io/npm/v/itty-fetcher.svg?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-fetcher&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-fetcher)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-fetcher/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-fetcher?branch=v1.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-fetcher?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)


## Fetch, without the boilerplate (and Typed).
Fetcher is an ultra-compact (~650 bytes) wrapper around native `Fetch`, designed purely to avoid boilerplate steps and shrink downstream code.

### Fetcher allows this:
```ts
const newUser = await fetcher().post<NewUser, User>('/api/users', { name: 'Alice' })
```

### Instead of this:
```ts
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
}).then(response => {
  if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)

  return response.json()
})
```

## Philosophy

Like any [itty.dev](https://itty.dev) project, this is not a kitchen-sink library. If you need advanced features like automatic retries or complex request interception, consider a more full-featured library. This is for when you want native fetch behavior with dramatically less boilerplate.

**✅ Perfect for:**
- Simplifying data fetching/sending
- Composable API clients
- Saving bundle size (this pays for itself within a few calls)

**❌ Consider alternatives for:**
- Automatic retries or timeout handling
- GraphQL (use a GraphQL client)
- VanillaJS purists (we applaud your unwavering resolve)
- Streams?