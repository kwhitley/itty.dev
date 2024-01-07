<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Nesting Routers"
  description="How to nest routers for deep APIs within itty-router."
  />

## Nesting Routers
To create a nested API, simply pass the child router as a route handler on a wildcard route.  

The following example shows a simple nested router:

#### Child Router:
```js
import { Router } from 'itty-router'

export const router = Router()
// optionally include { base: '/v1' } option

router
  .get('/', () => 'API v1 root')
  .get('/item', () => 'API v1 item')
```

#### Parent/Root Router:
```js
import { Router } from 'itty-router'
import { router as childRouter } from './api/v1'

const router = Router({ base: '/api' })

router.all('/v1/*', childRouter) // NEW in v4.1x
```

### Things to Consider
- **Including a `base` path in the child router is *required* for advanced branch paths (e.g. ones with route params).**

- Including a `base` path option in the child router is technically a faster execution path.  ONLY if the base path is included, using the `childRouter.handle` instead of `childRouter` is even faster still (prevents an internal redirect)

- Upstream middleware, such as ones registered in parent routers ahead of child routers, will still affect downstream requests.  This means you only need to register some middleware at the outermost router - for example `withParams`.  This also allows you to authenticate entire API branches.

- Including a 404 at the end of a nested router will prevent further execution/checking of other branches.  This is not strictly necessary (a single 404 at the end of the root router will catch anything), but is a possible performance optimization.

### Changes in v4.1x
Previous to v4.1, nesting required the following:
- always defining the **complete** base path in each child router.
- passing the `childRouter.handle` to the parent route as a handler.

This still works in v4.1x (and is the prefered path for ultimate performance), but **optionally you may use the base-path-less syntax by passing the the entire router.**

```ts
// AFTER (v4.x+)
const childRouter = Router() // no base path
childRouter.get('/foo', () => 'From the child.')

const parentRouter = Router()
parentRouter.all('/child/*', childRouter) // no .handle

// BEFORE (v4.0x)
const childRouter = Router({ base: '/child' })
childRouter.get('/foo', () => 'From the child.')

const parentRouter = Router()
parentRouter.all('/child/*', childRouter.handle)
```

