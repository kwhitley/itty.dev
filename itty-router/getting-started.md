# Getting Started

## Install dependencies

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

## 1. Create a Router
### `Router(options?: RouterOptions): Proxy`

Simple create a router using the `Router()` function.  Please note that this is *not* a true JavaScript class, but rather a factory function returning a Proxy. As such, do not instantiate using the `new` keyword.
```js
import { AutoRouter } from 'itty-router'

const router = AutoRouter() // no "new", as this is not a real class
```

## 2. Register Route(s)
### `router[method: string](route: string, ...handlers): Router`

To define routes, call the lowercase matching HTTP method on the [`router`](./api#Router) object (e.g. 'get' for the GET HTTP method).  Thanks to the underlying Proxy, *any* method (except ALL) can be mapped, allowing itty to be used in non-standard applications.

Standard route params, optional route params, wildcards, file formats, and even greedy params are supported within the core library.  For full-manual control, see [Advanced Usage](/itty-router/custom-regex).

```js
// register a route on the "GET" method
router
  .get('/json', () => [1,2,3]) // no problem
  .get('/todos/:id', ({ id }) => `You've asked for todo #${id}.`)
```

## 3. Handle Incoming Request
### `async router.fetch(request: IRequest, ...args) => Promise<any>`
The `router.fetch` method takes a Request-like argument and any additional arguments - then passes them to any matching routes.  This process occurs in a linear loop fashion until *anything at all is returned, from any handler/middleware*, or the routes are exhausted (without a return).  Each handler is **awaited**, allowing both syncronous and asynchronous handlers to work equally well.

```js
const request = new Request('https://foo.bar/todos/jane')

// attempt to match Request to registered routes
await router.fetch(request)

// or a more robust handling
await router
        .fetch(request)
        .then(json)       // transform all unformed responses to JSON
        .catch(error)     // and catch any uncaught errors
```

## 4. Export (environment-specific)
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
