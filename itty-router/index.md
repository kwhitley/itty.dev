# itty-router

[![Version](https://img.shields.io/npm/v/itty-router.svg?style=flat-square)](https://npmjs.com/package/itty-router)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-router/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router/Router)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v4.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v4.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

An ultra-tiny API microrouter, for use when [size matters](https://github.com/TigersWay/cloudflare-playground) (e.g. [Cloudflare Workers](https://developers.cloudflare.com/workers/)).

---

## Features

- Tiny. Routers from [~450 bytes](https://itty.dev/itty-router/routers/ittyrouter) to a [~970 bytes](https://itty.dev/itty-router/routers/autorouter) batteries-included version (~240-500x smaller than Express.js).
- Web Standards. Use it [anywhere, in any environment](https://itty.dev/itty-router/runtimes).
- No assumptions. Return anything; pass in anything.
- Dead-simple user-code.  We want _your_ code to be tiny too.
- Future-proof.  HTTP methods not-yet-invented already work with it.
- [Route-parsing](https://itty.dev/itty-router/route-patterns) & [query parsing](https://itty.dev/itty-router/route-patterns#query).
- [Middleware](https://itty.dev/itty-router/middleware) - use ours or write your own.
- [Supports Nesting](https://itty.dev/itty-router/nesting).

## Example

```js
import { AutoRouter } from 'itty-router' // ~1kB

const router = AutoRouter()

router
  .get('/hello/:name', ({ name }) => `Hello, ${name}!`)
  .get('/json', () => [1,2,3])
  .get('/promises', () => Promise.resolve('foo'))

export default router

// that's it ^-^
```
