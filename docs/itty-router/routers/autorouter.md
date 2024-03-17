#### Routers
# AutoRouter <Badge type="warning" text="new in version 4.3+" />

### ~1 kB

AutoRouter is a batteries-included thin-wrapper of [`Router`](/docs/itty-router/routers/router), with the following behaviors:

- [`withParams`](/docs/itty-router/api#withparams) middleware is included by default.
- [`json`](/docs/itty-router/api#json) response formatter is included by default. By default, all non-Responses will be converted to JSON. Override by setting the `format` option.
- [`error`](/docs/itty-router/api#error) <Badge type="tip" text="response formatter" /> is included by default as `errors: [error]` to catch uncaught errors (returning with a generic 500). Override by manually setting the `errors` stage.
- a generic 404 will be returned on any un-matched route.  This is equivalent to adding `router.all('*', () => error(404))` to your routes, and may be overridden using the `missing` option (below).

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

