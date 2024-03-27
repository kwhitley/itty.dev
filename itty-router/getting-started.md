# Getting Started

## 1. Install Itty

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
### `AutoRouter(IttyRouterOptions?): AutoRouterType`
### `Router(RouterOptions?): RouterType`
### `IttyRouter(IttyRouterOptions?): IttyRouterType`

We offer [3 Routers](/itty-router/routers/), depending on your needs.  For most folks we recommend the "batteries-included" [`AutoRouter`](/itty-router/routers/autorouter), which brings default error-handling, JSON-formatting, and the convenience middleware, [`withParams`](/itty-router/middleware/withparams).

Please note that this is *not* a true JavaScript class, but rather a factory function returning a `Proxy`. As such, do not instantiate using the `new` keyword.

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

To define routes, use the corresponding HTTP method "channel" on the router.  For example, to match a GET route, use `router.get()`.

```ts
import { text } from 'itty-router'

router
  .get('/string', () => 'This is just a string.')
  .get('/text', () => new Response('Text Response'))
  .get('/also-text', () => text('Text Response'))
  .get('/hello/:name', ({ params }) => `Hello, ${params.name}!`)
  .post('/form', withContent, ({ content }) => ({
    postedContent: content,
  }))
```

### Notes
- These functions the router itself, allowing chaining route definitions for convenience (see example).
- The `router.all()` channel matches to ALL methods.
- Route-definitions are the same across all router types.

## 4. Handle Requests
### `router.fetch(request: IRequest, ...args) => Promise<any>`
The `router.fetch` method takes a Request-like argument and any additional arguments - then passes them to any matching routes.  This process occurs in a linear loop fashion until *anything at all is returned, from any handler/middleware*, or the routes are exhausted (without a return).  Each handler is **awaited**, allowing both syncronous and asynchronous handlers to work equally well.

```ts
// this would usually come from your server runtime
const request = new Request('https://foo.bar/some/path')

// send requests to router.fetch()
const response = await router.fetch(request)
```

## 5. (Optional) Transform Responses

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
:::

## 6. Export Router
Itty was recently re-specced to match the common export signature of `{ fetch: Request => Response }` (as used in Bun or Cloudflare Workers).  This means the router may be exported directly, and the `fetch` method on it will receive incoming requests.

::: code-group

```ts [Cloudflare Workers]
import { AutoRouter } from 'itty-router' // ~1kB

const router = AutoRouter()

router
  .get('/json', () => [1,2,3])
  .get('/todos/:id', ({ id }) => `You've asked for todo #${id}.`)

export default router
```

```ts [Bun]
import { AutoRouter } from 'itty-router' // ~1kB

const router = AutoRouter({ port: 3001 }) // we can modify the port here

router
  .get('/json', () => [1,2,3])
  .get('/todos/:id', ({ id }) => `You've asked for todo #${id}.`)

export default router
```

:::
