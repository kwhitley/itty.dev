#### Routers
# Router <u>- itty-router</u> <Badge type="warning" text="updated in v5" />

### [![Bundle Size](https://deno.bundlejs.com/?q=itty-router/Router&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router/Router)

This is the core functionality of [`IttyRouter`](/docs/itty-router/routers/ittyrouter), with the addition of `before`, `finally`, and `catch` stages for configuration-based flow control.  This allows batteries-included routers like [`AutoRouter`](/docs/itty-router/routers/autorouter) to function.

## Example
```ts
import { Router, error, json, withParams } from 'itty-router'

const router = Router({
  before: [withParams],
  catch: error,
  finally: [json],
})

router
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
  .all('*', () => error(404))

export default { ...router }
```

## RouterOptions
### `Router(options?: RouterOptions): RouterType`

| Name | Type(s) | Default Value | Description
| --- | --- | --- | ---
| **base** | `string` | | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**before** <Badge type="warning" text="v5" /></span> | Array of [`RequestHandler`](/itty-router/typescript/api#requesthandler) | `[]` | An array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**catch** <Badge type="warning" text="v5" /></span> | [`ErrorHandler`](/itty-router/typescript/api#errorhandler) | | A single error handler to catch any thrown error.  This may be used to return a Response, log errors, etc. If thrown during the `before` stage or route-matching, the `finally` stage will still be applied after this catch. Conversely, if an error is thrown *during* the `finally` stage, this will still fire, but none of the `finally` stage handlers will be applied to it.
| <span class="nowrap">**finally** <Badge type="warning" text="v5" /></span> | Array of [`ResponseHandler`](/itty-router/typescript/api#responsehandler) | `[]` | An array of response handlers to execute on any response after route-matching is complete
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | Array of [`RouteEntry`](/itty-router/typescript/api#routeentry) | `[]` | Array of manual routes for preloading
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.
