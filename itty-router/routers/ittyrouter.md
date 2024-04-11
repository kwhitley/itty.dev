#### Routers
# IttyRouter <u>- itty-router</u> <Badge type="warning" text="new in v5" />

### [![Bundle Size](https://itty.ing/https://deno.bundlejs.com/?q=itty-router/IttyRouter&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router/IttyRouter)

This is the original router; the smallest and least-feature rich one.  It will naturally have the highest performance simply from the lack of stages introduced in [`Router`](/docs/itty-router/routers/router).  That said, to modify the response after a call to `router.fetch` requires tapping into the `.then()` blocks (see example).

## Example
```ts
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

## IttyRouterOptions
### `IttyRouter(options?: IttyRouterOptions): RouterType`

| Name | Type(s) | Description
| --- | --- | ---
| **base** | `string` | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | Array of [`RouteEntry`](/itty-router/typescript/api#routeentry) | Array of manual routes for preloading 
| **...other** | `any` | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.


