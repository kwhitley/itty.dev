# itty-router

[![Version](https://img.shields.io/npm/v/itty-router.svg?style=flat-square)](https://npmjs.com/package/itty-router)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-router/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router/Router)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kwhitley/itty-router/verify.yml?branch=v4.x&style=flat-square)](https://github.com/kwhitley/itty-router/actions/workflows/verify.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v4.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v4.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

`itty-router` delivers tiny, powerful APIs when bytes matter (your code + ours).

## Example Usage

::: code-group

```ts [AutoRouter (1kB)]
import { AutoRouter } from 'itty-router'

export default AutoRouter()
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
```

```ts [Router (550 bytes)]
import { Router, error, json, withParams } from 'itty-router'

const router = Router({
  before: [withParams],
  after: [json],
  catch: error,
})

router
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
  .all('*', () => error(404))

export default router
```


```ts [IttyRouter (460 bytes)]
import { IttyRouter, error, json, withParams } from 'itty-router'

const router = IttyRouter()

router
  .all('*', withParams)
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
  .all('*', () => error(404))

export default {
  fetch: (request, ...args) => 
    router
      .fetch(request, ...args)
      .then(json)
      .catch(error)
}
```

:::

### Ultra-Light
We include routers ranging from ~450 bytes to ~1kB based on your needs.  Beyond that, we allow _your_ code to stay tiny too.  Every bit helps!

### Ultra-Flexible
Itty is environment-agnostic, so you can use it _anywhere_ (e.g. [Cloudflare Workers](/itty-router/runtimes/cloudflare-workers), [Bun](/itty-router/runtimes/bun), [Node](/itty-router/runtimes/node), in Service Workers, or even in the browser). Additionally, with a simple and highly-extensible design, itty gives you *complete* control over the API flow, from start to finish.

### Battle-Tested
With over two millions downloads each year, itty has been hardened and tested by dozens of contributors over several years. It currently handles many millions of requests daily across an assortment of production APIs, with an enormous battery of tests (100% coverage) to ensure it stays stable across releases.

We also take *great pains* to evolve the library slowly, with every byte being weighed for value to the typical user.  Edge cases need not apply here.
