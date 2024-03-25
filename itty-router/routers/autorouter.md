#### Routers
# AutoRouter <Badge type="warning" text="new in v5" />

### ~1 kB (includes `error`, `json`, and `withParams`) [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter)

AutoRouter is a batteries-included thin-wrapper of [`Router`](/docs/itty-router/routers/router), with the following behaviors:

- [`withParams`](/docs/itty-router/api#withparams) middleware is included by default, upstream of any other `before` stage handlers.
- [`json`](/docs/itty-router/api#json) response formatter is included by default. By default, all non-Responses will be converted to JSON. Override by setting the `format` option.
- [`error`](/docs/itty-router/api#error) <Badge type="tip" text="response formatter" /> is included by default as `catch: error` to catch uncaught errors (returning with a generic 500).
- A generic 404 will be returned on any un-matched route.  This is equivalent to adding `router.all('*', () => error(404))` to your routes, and may be overridden using the `missing` option (below).

## Example
```ts
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)

export default router
```

## API

### `AutoRouter(options?: AutoRouterOptions): RouterType`

### AutoRouterOptions
| Name | Type(s) | Default Value | Description
| --- | --- | --- | ---
| **base** | `string` | | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**before** <Badge type="warning" text="v5" /></span> | `RouteHandler[]` | `[]` | An array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**catch** <Badge type="warning" text="v5" /></span> | `ErrorHandler` | `error` | A single error handler to catch any thrown error.  This may be used to return a Response, log errors, etc. If thrown during the `before` stage or route-matching, the `finally` stage will still be applied after this catch. Conversely, if an error is thrown *during* the `finally` stage, this will still fire, but none of the `finally` stage handlers will be applied to it.
| <span class="nowrap">**finally** <Badge type="warning" text="v5" /></span> | `ResponseHandler[]` | `[]` | An array of response handlers to execute on any response after route-matching is complete
| <span class="nowrap">**format** <Badge type="warning" text="v5" /></span> | `Response Handler` | `json` | The default formatter for unformatted responses.  This may be replaced (e.g. with `text`) or set to a no-op `() => {}` to avoid formatting altogether.
| <span class="nowrap">**missing** <Badge type="warning" text="v5" /></span> | `RouteHandler` | `() => error(404)` | The default 404 message.  To prevent a 404, enter a no-op `() => {}`.
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | `RouteEntry[]` | `[]` | Array of manual routes for preloading 
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.


