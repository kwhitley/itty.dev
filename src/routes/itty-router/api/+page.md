<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="API Docs"
  description="Complete API docs for itty-router."
  />

<a name="createCors"></a>

## createCors 
Creates a `preflight` middleware and `corsify` Response-handler.  Used together, this handles both OPTIONS requests as well as appends the appropriate CORS headers to created Responses.

### `createCors(options)`

```js
import { Router, createCors, error, json } from 'itty-router'

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
})

const router = Router()

router
  // embed preflight upstream to handle all OPTIONS requests
  .all('*', preflight)

  .get('/foo', () => 'bar')

export default {
  fetch: (...args) => router
                        .handle(...args)
                        .then(json)

                        // embed corsify downstream to attach CORS headers
                        .then(corsify)
                        .catch(error)
}
```

---
<a name="createResponse"></a>

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
<a name="error"></a>

## error 
Returns an error Response

### `error(code: number, body?: string | object): Response`
### `error(error: Error | StatusError): Response`

---
<a name="html"></a>

## html <small class="new">new in v4.x</small> 
Returns an HTML Response

### `html(string, options?: ResponseInit): Response`

---
<a name="jpeg"></a>

## jpeg <small class="new">new in v4.x</small> 
Returns a JPEG Response

### `jpeg(data, options?: ResponseInit): Response`

---
<a name="json"></a>

## json 
Returns a JSON Response

### `json(data, options?: ResponseInit): Response`

---
<a name="png"></a> 

## png <small class="new">new in v4.x</small> 
Returns a PNG Response

### `png(data, options?: ResponseInit): Response`

---
<a name="Router"></a>

## Router 
Constructor function, returning a router Proxy (object).

### `Router(options?: RouterOptions): RouterType`

### Options
| Name | Type(s) | Description
| --- | --- | ---
| `base` | `string` | prefixes all routes with this string
| `routes` | `RouteEntry[]` | array of manual routes for preloading

The router itself has essentially two properties:

- ### The "handle"
  ### `router.handle(request: IRequest, ...args): Promise<any>`
  The handle function takes a request-like argument, returning a Promise.  This will resolve to anything returned from a matching route, or nothing at all (if no route returns).
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
<a name="status"></a>

## status 
Returns a no-body response code.

### `status(code: number, options?: ResponseInit): Response`

```js
return status(204) // returns a 204, without a body
```

---
<a name="StatusError"></a>

## StatusError 
Extends `Error`, adding an HTTP status code to the constructor.  Throwing this is identical to a standard Error, but allows downstream handlers to add context to the error Response.

### `StatusError(statusCode: number, message?: string): StatusError`

```js
throw new StatusError(400, 'Incorrect number of parameters')
```

---
<a name="text"></a>

## text 
Returns a text Response

### `text(data, options?: ResponseInit): Response`

---
<a name="webp"></a>

## webp <small class="new">new in v4.x</small> 
Returns a webp Response

### `webp(data, options?: ResponseInit): Response`

---
<a name="withContent"></a>

## withContent <small>(middleware)</small>
If a request body is attached, this middleware attempts to parse it (as JSON) and embed it within the Request as `request.content`.  See example:

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
<a name="withCookies"></a> 

## withCookies <small>(middleware)</small>
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
## withParams <a name="withParams"></a> <small>(middleware)</small>
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

