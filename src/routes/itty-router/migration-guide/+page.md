<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Migrating to v4.x"
  description="A guide to migrating between versions within itty-router.  In particular, we focus on the latest v3.x to v4.x migration."
  />

## Migrating to v4.x
Migrating to v4.x will be largely transparent for most users, with a few notable exceptions.  The follow changes have been made in this overhaul.

### 1. Massive TypeScript overhaul
The types have been rewritten from the ground up, finally allowing better control over request types (or additional `router.handle` arguments)  through the route definitions.

For a full guide on using the v4.x types, please see the [TypeScript](/itty-router/typescript) section.

### 2. itty-router-extras and itty-cors are now "in-house"
As of v4.x, you may simply import any of these items directly from **itty-router**.  In the meantime, your code importing from the separate modules will continue to work just fine!

#### Previously
```js
import { Router } from 'itty-router'
import { json } from 'itty-router-extras'
import { createCors } from 'itty-cors'
```

#### Now
```js
import { Router, json, createCors } from 'itty-router'
```

### Migrating from `itty-router-extras` <small class="new">NOTICE</small>

Not everything made the cut, as you might expect. `itty-router-extras` was meant to test out the functions for possible inclusion in the core library, and it served us well. Here are the following changes:

- **`missing(message)`has gone... "missing"**.  

  There was too much naming debate over `missing` vs. `notFound` vs. just leaving it as `error(404, message)`.  In the end, the simplest (and fewest bytes) answer won.  We'll consider publishing an entire library of convenience wrappers around status codes (if somone doesn't beat us to it).  Here's a hint:

  ```ts
  import { error } from 'itty-router/error'

  export const badRequest (...args) = error(400, ...args)
  export const notFound (...args) = error(404, ...args)
  export const conflict (...args) = error(409, ...args)
  // etc
  ```

- **`ThrowableRouter()` has been removed**  

  This was a fun convenience early on, but it left too little control for the user, such as dealing with CORS, late-stage transformations, or custom error handling. Ultimately, not worth the calories.

  ```ts
  import { Router, error } from 'itty-router/error'

  // preferred replacement
  const router = Router()

  router
    .handle(request)
    .then(json)
    .catch(error)
  ```

- **`withParams` (middleware) now works globally!** 

  Previously, [`withParams`](/itty-router/api#withParams) was only useable directly on a route.  This limited its ability to really cut boilerplate, and added verbosity to a bunch of route declarations.  Now we have it working as an upstream middleware, allowing you to apply it globally upstream, while benefiting from it on the route level.

  #### Previously
  ```js
  router
    .get('/foo/:bar', withParams, ({ bar }) => bar)
    .get('/:id',  withParams, ({ id }) => id)
  ```

  #### Now
  ```js
  router
    .all('*', withParams) // <--- apply upstream
    .get('/foo/:bar', ({ bar }) => bar)
    .get('/:id', ({ id }) => id)
  ```

### 4. Added convenience response helpers
We've added the following response helpers on top of the ones already included in `itty-router-extras`... because why not?
- [html](/api/#html)
- [jpeg](/api/#jpeg)
- [png](/api/#png)
- [webp](/api/#webp)

### 5. Exporting createResponse
[`createResponse`](/itty-router/api#createResponse) is the function we use to create all the familiar response helpers, including [`json`](/itty-router/api#json).  We now expose this, allowing you to create your own custom types.  

In v4.x, we've also added a second argument; a body transform function.  If present, anything you pass to the helper will be passed through this function.  For example, in [`json`](/itty-router/api#json), we pass `JSON.stringify` to the second argument.

### 6. Slight tweaks to the RegEx
In order to code-golf the regex even further (huge shoutout to [@DrLoopFall](https://twitter.com/DrLoopFall)), we've accepted some slight changes in v4.x that hopefully should affect no one at all.

