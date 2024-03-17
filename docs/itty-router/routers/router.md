#### Routers
# Router <Badge type="warning" text="updated in version 4.3" />

### ~550 bytes

This is the core functionality of [`IttyRouter`](/docs/itty-router/routers/ittyrouter), with the addition of `before`, `after`, and `onError` stages for configuration-based flow control.  This allows batteries-included routers like [`AutoRouter`](/docs/itty-router/routers/autorouter) to function.

## Example
```ts
import { Router, error, json, withParams } from 'itty-router'

const router = Router({
  before: [withParams],
  onError: [error],
  after: [json],
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
| Name | Type(s) | Description
| --- | --- | ---
| **base** | `string` | prefixes all routes with this string
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | `RouteEntry[]` | array of manual routes for preloading 
| <span class="nowrap">**before** <Badge type="warning" text="v4.3+" /></span> | `RouteHandler[]` | an array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**after** <Badge type="warning" text="v4.3+" /></span> | `ResponseHandler[]` | an array of response handlers to execute on any response after route-matching is complete
| <span class="nowrap">**onError** <Badge type="warning" text="v4.3+" /></span> | `ErrorHandler[]` | an array of error/response handlers to execute on any error thrown prior to or during route-matching.  This may be used to return a Response, log errors, etc.  The first handler is guaranteed to receive the original thrown Error as its first argument.  Each subsequent handler will receive either the original error, or any response if passed along.
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.

## Things to Consider
1. When using the `onError` stage, only errors <em><u>thrown</u></em> will be sent here.  If terminating responses by returning an `error()`, for instance, this stage will not be run.
