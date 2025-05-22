# itty-router

[![Version](https://img.shields.io/npm/v/itty-router.svg?style=flat-square)](https://npmjs.com/package/itty-router)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-router/Router&badge&badge-style=flat-square)](https://itty.ing/https://deno.bundlejs.com/?q=itty-router/Router)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v5.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

An ultra-tiny API microrouter, for use when [size matters](https://github.com/TigersWay/cloudflare-playground) (e.g. [Cloudflare Workers](https://developers.cloudflare.com/workers/)).

---

## Features

- Tiny, with zero dependencies. Routers from [~450 bytes](/itty-router/routers/ittyrouter) to a [~970 bytes](/itty-router/routers/autorouter) batteries-included version (~240-500x smaller than Express.js).
- [TypeScript](/itty-router/typescript). Powerfully (and flexibly) typed for any environment.
- [Route-parsing](/itty-router/route-patterns) & [query parsing](/itty-router/query-params).
- [Middleware](/itty-router/middleware). Use ours or write your own.
- [100% Test Coverage](https://coveralls.io/github/kwhitley/itty-router?branch=v5.x). Bulletproof for production peace-of-mind.
- Designed specifically for serverless (but works anywhere).
- No assumptions. Return anything; pass in anything.
- Future-proof.  HTTP methods not-yet-invented already work with it.

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
