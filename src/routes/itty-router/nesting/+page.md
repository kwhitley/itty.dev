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
To created a nested API, simply use a child router's `router.handle` as a route handler in a parent router, typically on a wildcard route.  The following example shows a simple nested router.

#### Child Router:
```js
import { Router } from 'itty-router'

export const router = Router({ base: '/v1' })

router
  .get('/', () => 'API v1 root')
  .get('/item', () => 'API v1 item')
```

#### Parent/Root Router:
```js
import { Router, error, json } from 'itty-router'
import { router as routerV1 } from './api/v1'

const router = Router()

router
  // register the child router
  .all('/v1/*', routerV1.handle)

  // 404 for all misses
  .all('*', () => error(404))

export default {
  fetch: (...args) => router
                        .handle(...args)
                        .then(json)
                        .catch(error)
}
```

### Things to consider
- To preserve the incredibly small size of itty-router, we do not include any sort of automatic path-building like other routers have.  This means each child router must include a `base` option to prefix every route within that router (optionally, each route can simply define itself from the root).  In the example above, please note that the base of the child router MUST match the base of the route (wildcard aside) it was registered for in the parent router.

- You may nest any number of routers, but be sure to keep track of the required base path.

- Upstream middleware, such as ones registered in parent routers ahead of child routers, will still affect downstream requests.  This means you only need to register some middleware at the outermost router - for example `withParams`.  This also allows you to authenticate entire API branches.

- Unless you have a specific 404 message for a child router, there is no need to register that catch-all route within each router.  Simply include that logic once in the root router.

- Similarly, a single downstream `json` handler (shown in the example above) will form a Response for the final returned value, even if the match occured within a child router.
