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
[![Build Status](https://img.shields.io/github/actions/workflow/status/kwhitley/itty-router/verify.yml?branch=v4.x&style=flat-square)](https://github.com/kwhitley/itty-router/actions/workflows/verify.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-router/v4.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-router?branch=v4.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-router?style=flat-square)](https://npmjs.com/package/itty-router)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

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

# What's different about itty? <a name="a-different-kind-of-router"></a>
Itty does a few things very differently from other routers.  This allows itty route code to be shorter and more intuitive than most!

### 1. Simpler handler/middleware flow.
In itty, you simply return (anything) to exit the flow.  If any handler ever returns a thing, that's what the `router.handle` returns.  If it doesn't, it's considered middleware, and the next handler is called. 

That's it!

```ts
// not middleware: any handler that returns (anything at all)
(request) => [1, 4, 5, 1]

// middleware: simply doesn't return
const withUser = (request) => { 
  request.user = 'Halsey'
}

// a middleware that *might* return
const onlyHalsey = (request) => {
  if (request.user !== 'Halsey') {
    return error(403, 'Only Halsey is allowed to see this!')
  }
}

// uses middleware, then returns something
route.get('/secure', withUser, onlyHalsey,
  ({ user }) => `Hey, ${user} - welcome back!`
)
```

### 2. You don't have to build a response in each route handler.
We've been stuck in this pattern for over a decade.  Almost every router still expects you to build and return a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)... in every single route.  

We think you should be able to do that once, at the end. In most modern APIs for instance, we're serving JSON in the majority of our routes.  So why handle that more than once?
```ts
router
  // we can still do it the manual way
  .get('/traditional', (request) => json([1, 2, 3]))

  // or defer to later
  .get('/easy-mode', (request) => [1, 2, 3])

// later, when handling a request
router
  .handle(request)
  .then(json) // we can turn any non-Response into valid JSON.
```

### 3. It's all Promises.
We `await` every handler, looking for a return value.  If we get one, we break the flow and return your value.  If we don't, we continue processing handlers/routes until we do.  This means that every handler can either be synchronous or async - it's all the same.

When paired with the fact that we can simply return raw data and transform it later, this is AWESOME for working with async APIs, database layers, etc.  We don't need to transform anything at the route, we can simply return the Promise (to data) itself!

Check this out:
```ts
import { myDatabase } from './somewhere'

router
  // assumes getItems() returns a Promise to some data
  .get('/items', () => myDatabase.getItems())

// later, when handling a request
router
  .handle(request)
  .then(json) // we can turn any non-Response into valid JSON.
```

### 4. Only one required argument.  The rest is up to you.
We only require one argument in itty - a Request-like object with **url** and **method** properties (usually a native [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)). Because itty is not opinionated about [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) creation, there is no "response" argument requirement.  

**Superpower**: Every argument you pass to `route.handle` is given to each handler, in the same order.

> ### This makes itty one of the most platform-agnostic routers, *period*, as it's able to match up to any platform's signature.

Here's an example using [Cloudflare Worker](https://workers.cloudflare.com/) arguments:
```ts
router
  .get('/my-route', (request, environment, context) => {
    // we can access anything here that was passed to `router.handle`.
  })

// Cloudflare gives us 3 arguments: request, environment, and context.
// Passing them to `route.handle` gives every route handler (above) access to each.  
export default {
  fetch: (request, env, ctx) => router
                                  .handle(request, env, ctx)
                                  .then(json)
                                  .catch(error)
}
```
