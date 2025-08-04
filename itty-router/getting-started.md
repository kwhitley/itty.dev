# Getting Started <u>- itty-router</u>

## 1. Install

::: code-group

```bash [npm]
npm install itty-router
```

```bash [yarn]
yarn add itty-router
```

```bash [pnpm]
pnpm i itty-router
```

:::

## 2. Create a Router

We offer [3 Routers](/itty-router/routers/), depending on your needs.  For most folks we recommend the "batteries-included" [`AutoRouter`](/itty-router/routers/autorouter), which brings default error-handling, JSON-formatting, and the convenience middleware, [`withParams`](/itty-router/middleware/withparams).

::: code-group

```ts [AutoRouter]
import { AutoRouter } from 'itty-router'

const router = AutoRouter()
```

```ts [Router]
import { Router } from 'itty-router'

const router = Router()
```

```ts [IttyRouter]
import { IttyRouter } from 'itty-router'

const router = IttyRouter()
```

:::

## 3. Register Routes
### `router[method: string](route: string, ...handlers): Router`

To define routes, use the corresponding HTTP method "channel" on the router. For example, `.get()` listens to HTTP `GET` requests, `.post()` to `POST`, and so on.

```ts
// assumes router instance (above)

router
  .get('/hello/:name', ({ params }) => `Hello, ${params.name}!`)
  .get('/json', () => ({ foo: 'bar' }))
```

### Notes
- These functions return the router itself, allowing chaining route definitions for convenience (see example).
- The `router.all()` channel matches to ALL methods.
- Route-definitions are the same across all router types.
<!--
## 4. Handle Requests
### `router.fetch(request: IRequest, ...args): Promise<any>`
The `router.fetch` method takes a Request-like argument and any additional arguments - then passes them to any matching routes.  This process occurs in a linear loop until *anything at all is returned, from any handler/middleware*, or the routes are exhausted (without a return).
```ts
// assumes instantiated router (above)

const response = await router.fetch(new Request('https://foo.bar'))
``` -->

<!--
## 5. (optional) Transform responses

While you can certainly return a valid `Response` using each route-handler, usually it's more convenient to process them all at once, at the end.  This is also how you would add [CORS](/itty-router/cors) headers to existing `Response` objects.

::: code-group
```ts [AutoRouter]
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

// catches errors and responds as JSON
await router.fetch(request)
```

```ts [Router]
import { Router, error, json } from 'itty-router'

// add transformers to Router stages
const router = Router({
  catch: error,
  finally: [json],
})

// catches errors and responds as JSON
await router.fetch(request)
```

```ts [IttyRouter/manual]
import { error, json } from 'itty-router'

await router
        .fetch(request)
        .then(json)     // turn any raw objects into JSON Response
        .catch(error)   // Response from thrown Error/StatusError.
```
::: -->

## 4. Export Router
The router itself (intentionally) looks like the commonly-expected signature of:

```ts
{
  fetch: (request: Request, ...args: any) => Response
  ...otherPropsYouPassAsOptions
}
```

As a result, in environments that expect that (e.g. Cloudflare Workers or Bun), we can simply export the router itself.  Notice that we recommend spreading the router object to strip the internal Proxy magic.  Otherwise, an environment may be confused, causing errors.

```ts
// typically just...

export default { ...router }
```

## (Optional) Handling Requests Manually

To manually fetch using any of the routers, simply pass your `request` and any additional arguments to `.fetch()` on the router.  All matching handlers/middleware will receive these arguments and be given an opportunity to respond to the request.

```ts
const request = new Request('https://foo.bar')

// assumes router is instantiated above
const response = await router.fetch(request)
```

## Complete Example

The following examples create an equivalent API (using each of the 3 routers), including downstream JSON-formatting and catching errors.

In the example, [`Router`](/itty-router/routers/router) uses stages to create `Response`s and handle errors, while [`IttyRouter`](/itty-router/routers/ittyrouter) achieves the same effect using the Promise chain of `router.fetch()` itself.

[`AutoRouter`](/itty-router/routers/autorouter) has this same functionality built-in already.

<small>(examples assume web standards environment)</small>

::: code-group
```ts [AutoRouter]
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router
  .get('/hello/:name', ({ name }) => `Hello, ${name}!`)
  .get('/json', () => ({ foo: 'bar' }))
  .get('/throw', (a) => a.b.c) // safely throws

export default { ...router }
```

```ts [Router]
import { Router, json, error, withParams } from 'itty-router'

const router = Router({
  before: [withParams], // upstream middleware
  catch: error,         // error handling
  finally: [json],      // downstream response formatting
})

router
  .get('/hello/:name', ({ name }) => `Hello, ${name}!`)
  .get('/json', () => ({ foo: 'bar' }))
  .get('/throw', (a) => a.b.c) // safely throws

export default { ...router }
```

```ts [IttyRouter]
import { IttyRouter, json, error, withParams } from 'itty-router'

const router = IttyRouter()

router
  .all('*', withParams) // upstream middleware
  .get('/hello/:name', ({ name }) => `Hello, ${name}!`)
  .get('/json', () => ({ foo: 'bar' }))
  .get('/throw', (a) => a.b.c) // safely throws

export default {
  fetch: (request, ...args) =>
    router
      .fetch(request, ...args)
      .then(json)       // downstream response formatting
      .catch(error)     // error handling
}
```
:::
