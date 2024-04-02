# API Reference <u>- itty-router</u>

## AutoRouter <Badge type="warning" text="v5" />

A batteries-included version of [`Router`](/itty-router/routers/router), with included default behaviors, and additional fine-grained controls.  While ~1kB, this includes `withParams`, `json` and `error`.

### `AutoRouter(options?: AutoRouterOptions): RouterType`

### AutoRouterOptions
| Name | Type(s) | Default Value | Description
| --- | --- | --- | ---
| **base** | `string` | | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**before** <Badge type="warning" text="v5" /></span> | Array of [`RequestHandler`](/itty-router/typescript/api#requesthandler) | `[]` | An array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**catch** <Badge type="warning" text="v5" /></span> | [`ErrorHandler`](/itty-router/typescript/api#errorhandler) | `error` | A single error handler to catch any thrown error.  This may be used to return a Response, log errors, etc. If thrown during the `before` stage or route-matching, the `finally` stage will still be applied after this catch. Conversely, if an error is thrown *during* the `finally` stage, this will still fire, but none of the `finally` stage handlers will be applied to it.
| <span class="nowrap">**finally** <Badge type="warning" text="v5" /></span> | Array of [`ResponseHandler`](/itty-router/typescript/api#responsehandler) | `[]` | An array of response handlers to execute on any response after route-matching is complete
| <span class="nowrap">**format** <Badge type="warning" text="v5" /></span> | [`ResponseHandler`](/itty-router/typescript/api#responsehandler) | `json` | The default formatter for unformatted responses.  This may be replaced (e.g. with `text`) or set to a no-op `() => {}` to avoid formatting altogether.
| <span class="nowrap">**missing** <Badge type="warning" text="v5" /></span> | [`RequestHandler`](/itty-router/typescript/api#requesthandler) | `() => error(404)` | The default 404 message.  To prevent a 404, enter a no-op `() => {}`.
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | Array of [`RouteEntry`](/itty-router/typescript/api#routeentry) | `[]` | Array of manual routes for preloading 
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.

### Example
```ts
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)

export default router
```

---

## [cors](/itty-router/cors)
Creates a `preflight` middleware and `corsify` Response-handler.  Used together, this handles both OPTIONS requests as well as appends the appropriate CORS headers to existing Responses.

### `cors(options?: CorsOptions) => { preflight, corsify }`

### Example
```ts
import { AutoRouter, cors } from 'itty-router'

const { preflight, corsify } = cors()

const router = AutoRouter({
  before: [preflight],  // <-- put preflight upstream
  finally: [corsify],   // <-- put corsify downstream
})

export default router
```


---

## createResponse 
Creates a response helper from a MIME-type (string), and optionally, a body-transform (function).

### `createResponse(mimeType: string, transform?: Function): ResponseHelper`

For example, here's how we created the [`json`](/itty-router/api#json) helper:

```js
import { createResponse } from 'itty-router'

export const json = createResponse('application/json', JSON.stringify)

json({ foo: 'bar' }) // creates JSON-formatted Response
```

---

## error 
Returns an error Response

### `error(code: number, body?: string | object): Response`
### `error(error: Error | StatusError): Response`

---

## html <Badge type="warning" text="v4.0+" />
Returns an HTML Response

### `html(string, options?: ResponseInit): Response`

--- 

## IttyRouter <Badge type="warning" text="v5" />

### `IttyRouter(options?: IttyRouterOptions): RouterType`

### IttyRouterOptions
| Name | Type(s) | Description
| --- | --- | ---
| **base** | `string` | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | `RouteEntry[]` | Array of manual routes for preloading 
| **...other** | `any` | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.

---

## jpeg <Badge type="warning" text="v4.0+" />
Returns a JPEG Response

### `jpeg(data, options?: ResponseInit): Response`

---

## json 
Returns a JSON Response

### `json(data, options?: ResponseInit): Response`

--- 

## png <Badge type="warning" text="v4.0+" />
Returns a PNG Response

### `png(data, options?: ResponseInit): Response`

---

## Router <Badge type="warning" text="updated in v5" />
The basic `Router` factory function.

### `Router(options?: RouterOptions): RouterType`

### RouterOptions
| Name | Type(s) | Default Value | Description
| --- | --- | --- | ---
| **base** | `string` | | Prefixes all routes with this string. For example, `Router({ base: '/docs' })` would prefix all route matches with `/docs`.
| <span class="nowrap">**before** <Badge type="warning" text="v5" /></span> | `RequestHandler[]` | `[]` | An array of route handlers/middleware to execute on requests before any route-matching
| <span class="nowrap">**catch** <Badge type="warning" text="v5" /></span> | `ErrorHandler` | | A single error handler to catch any thrown error.  This may be used to return a Response, log errors, etc. If thrown during the `before` stage or route-matching, the `finally` stage will still be applied after this catch. Conversely, if an error is thrown *during* the `finally` stage, this will still fire, but none of the `finally` stage handlers will be applied to it.
| <span class="nowrap">**finally** <Badge type="warning" text="v5" /></span> | `ResponseHandler[]` | `[]` | An array of response handlers to execute on any response after route-matching is complete
| <span class="nowrap">**routes** <Badge type="danger" text="advanced" /></span> | `RouteEntry[]` | `[]` | Array of manual routes for preloading 
| **...other** <Badge type="warning" text="v4.1+" /> | `any` | | Any other object attributes that don't conflict with methods will be embedded in the final Router object.  This is useful for attaching additional information to the router for exporting.  For example: `Router({ port: 3001 })` could be used to control the port in a Bun setup.

### Example
```ts
import { Router, json, error, withParams } from 'itty-router'

const router = Router({
  before: [withParams],
  catch: error,
  finally: [json],
})

router
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)

export default router
```

The router itself has essentially two properties:

- ### The fetch method
  ### `router.fetch(request: IRequest, ...args): Promise<any>`
  The fetch function takes a request-like argument, returning a Promise.  This will resolve to anything returned from a matching route, or nothing at all (if no route returns).
- ### The route registers
  ### `router[method: string](route: string, ...handlers): Router`
  Any other property accessed off the router object maps to the corresponding uppercase HTTP method (even non-standard ones), returning a function that takes a path (string) and any number of handlers/middleware, and returns the router again (for optional declaration chaining).
  
  The one notable exception to this is the `.all()` channel, which matches to *any* HTTP method (similar to `.use()` in many other routers).

  ```js
  import { Router, error, withParams } from 'itty-router'
  import { todos } from './fake-todo-service'

  // define a router
  const router = Router()

  router
    // this route will match *any* HTTP method, e.g. POST, PUT, GET
    .all('/foo', 
      ({ method }) => `Accessed via the ${method} HTTP method`
    )

    // GET todos list or single todo
    .get('/todos/:id?', withParams, 
      ({ id }) => id
                  ? (todos.getTodo(id) || error(404))
                  : todos.list()
    )

    // DELETE todo
    .delete('/todos/:id', withParams, 
      ({ id }) => todos.remove(id)
    )
  ```

---

## status 
Returns a no-body response code.

### `status(code: number, options?: ResponseInit): Response`

```js
return status(204) // returns a 204, without a body
```

---

## StatusError 
Extends `Error`, adding an HTTP status code to the constructor.  Throwing this is identical to a standard Error, but allows downstream handlers to add context to the error Response.

### `StatusError(statusCode: number, message?: string): StatusError`

```js
throw new StatusError(400, 'Incorrect number of parameters')
```

---

## text 
Returns a text Response

### `text(data, options?: ResponseInit): Response`

---

## webp <Badge type="warning" text="v4.0+" />
Returns a webp Response

### `webp(data, options?: ResponseInit): Response`

---

## withContent <Badge type="info" text="middleware" /> <Badge type="warning" text="updated in v4.2" />
If a request body is attached, this middleware attempts to parse it, embedding the results within the Request as `request.content`. 

<p class="new">
  v4.2 -changes - withContent now attempts several parsing passes.  The order of attempted parsing is JSON -> FormData -> text (fallback).  Thus if sending JSON (and well-formed), request.content will be parsed as JSON, if sending FormData, request.content will be parsed as FormData, etc.
</p>

See example:

### `withContent(): void`

```js
import { Router, withContent } from 'itty-router'

const router = Router()

router
  .post('/foo', withContent, 
    ({ content }) => `Your bar is a ${content.bar}.`
  )

// POST { bar: 'baz' } to /foo results in
// "Your bar is a baz."
```

---

## withCookies <Badge type="info" text="middleware" />
Extracts cookies from the headers into a `cookies` object on the Request. See example:

### `withCookies(): void`

```js
import { Router, error, withCookies } from 'itty-router'

const router = Router()

router
  .get('/foo', withCookies, 
    ({ cookies }) => {
      if (!cookies.Authorization) {
        return error(401)
      }

      // do something
    }
  )
```

---
## withParams <Badge type="info" text="middleware" />
Extracts route params into the Request itself, for convenience.  The example shows route params with and without this middleware.  This becomes more useful with more route params, or when using `withParams` as a global upstream middleware, to avoid middleware duplication within each route.

### `withParams(): void`

```js
import { Router, error, withParams } from 'itty-router'

const router = Router()

router
  // accessing params from request.params
  .get('/:id', ({ params }) => `Your id is ${params.id}`
  
  // access params directly from the request
  .get('/:id', withParams, ({ id }) => `Your id is ${id}`)
```

<p class="new">
  v4.x changes - <code>withParams</code> may <em>finally</em> be used as a global upstream middleware, saving the many boilerplatey injections throughout your routes.  Hooray!
</p>

