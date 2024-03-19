#### Routers
# Router <Badge type="warning" text="updated in version 4.3" />

### ~550 bytes [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/Router&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router@next/Router)

This is the core functionality of [`IttyRouter`](/docs/itty-router/routers/ittyrouter), with the addition of `before`, `after`, and `onError` stages for configuration-based flow control.  This allows batteries-included routers like [`AutoRouter`](/docs/itty-router/routers/autorouter) to function.

## Example
```ts
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

## API

### `Router(options?: RouterOptions): RouterType`

### RouterOptions
| Name | Type(s) | Default Value | Description
| --- | --- | --- | ---
| <span class="nowrap">**after** <Badge type="warning" text="v4.3+" /></span> | `ResponseHandler[]` | `[]` | An array of response handlers to execute on any response after route-matching is complete
| **base** | `string` | | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**before** <Badge type="warning" text="v4.3+" /></span> | `RouteHandler[]` | `[]` | An array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**catch** <Badge type="warning" text="v4.3+" /></span> | `ErrorHandler` | | A single error handler to catch any thrown error.  This may be used to return a Response, log errors, etc. If thrown during the `before` stage or route-matching, the `after` stage will still be applied after this catch. Conversely, if an error is thrown *during* the `after` stage, this will still fire, but none of the `after` stage handlers will be applied to it.
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | `RouteEntry[]` | `[]` | Array of manual routes for preloading 
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.

