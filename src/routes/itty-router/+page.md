<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  description="A tiny, zero-dependency router, designed to make beautiful APIs in any environment."
  />

<div class="byline">
  A ~450 byte router, designed to make beautiful APIs <em>anywhere</em>.
</div>

[![Version](https://img.shields.io/npm/v/itty-router.svg?style=flat-square)](https://npmjs.com/package/itty-router)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-router/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router/Router)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kwhitley/itty-router/verify.yml?branch=v3.x&style=flat-square)](https://github.com/kwhitley/itty-router/actions/workflows/verify.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v3.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v3.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Discord](https://img.shields.io/discord/832353585802903572?style=flat-square)](https://discord.com/channels/832353585802903572)

### Use Anywhere
Itty is, at its heart, a completely environment-agnostic microrouter.  This means you can use it _anywhere_ (e.g. [Cloudflare Workers](/itty-router/runtimes#Cloudflare%20Workers), [Bun](/itty-router/runtimes#Bun), [Node](/itty-router/runtimes#Node), in Service Workers, or even in the browser).

### Ultra-Flexible
Itty makes zero underlying assumptions of how or where you'll use it.  By maintaining a simple signature, and following Web Standards/Fetch API, it can be used in virtually all modern environments, and easily adapted to others.

### Ultra-Light
We're not just talking about bundle size here.  We like seeing tiny, readable route code too.  Itty helps with that!

### Battle-Ready
With over a million downloads a year, itty has been hardened and tested by dozens of contributors over several years. It currently handles many millions of requests daily across an assortment of production APIs, with an enormous battery of tests (100% coverage) to ensure it stays stable across releases.

### Example Usage

```js
import { 
  error,              // creates error Responses
  json,               // creates JSON Responses
  Router,             // the Router itself
  withParams,         // middleware to extract params into the Request itself
} from 'itty-router'

// we'll start with some fake data
const todos = [
  { id: '1', message: 'Pet the puppy'. },
  { id: '2', message: 'Pet the kitty'. },
]

const router = Router()

router
  // GET todos - just return some data!
  .get('/todos', () => todos)

  // GET single todo
  .get('/todos/:id', withParams, 
    ({ id }) => {
      const todo = todos.find(t => t.id === id)

      return todo || error(404, 'That todo was not found!')
    }
  )

  // *any* HTTP method works, even ones you make up
  .puppy('/secret', () => 'Because why not?')

  // return a 404 for anything else
  .all('*', () => error(404))

// Example showing Cloudflare module syntax
export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)
                              .catch(error)
}
```
