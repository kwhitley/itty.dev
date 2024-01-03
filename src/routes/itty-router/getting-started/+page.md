<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Getting Started"
  description="How to quickly get up and running using itty-router to create an API."
  />

## Getting Started

### 1. Create a Router
### `Router(options?: RouterOptions): Proxy`

Simple create a router using the `Router()` function.  Please note that this is *not* a true JavaScript class, but rather a factory function returning a Proxy. As such, do not instantiate using the `new` keyword.
```js
import { Router } from 'itty-router'

const router = Router() // no "new", as this is not a real class
```

### 2. Register Route(s)
### `router[method: string](route: string, ...handlers): Router`

To define routes, call the lowercase matching HTTP method on the [`router`](./api#Router) object (e.g. 'get' for the GET HTTP method).  Thanks to the underlying Proxy, *any* method (except ALL) can be mapped, allowing itty to be used in non-standard applications.

Standard route params, optional route params, wildcards, file formats, and even greedy params are supported within the core library.  For full-manual control, see [Advanced Usage](/itty-router/custom-regex).

```js
// register a route on the "GET" method
router
  .get('/todos/:id', (request) => {
    const { params } = request

    return `You've asked for todo #${params.id}.`
  })

  // we can chain definitions to reduce boilerplate
  .get('*', () => error(404))
```

### 3. Handle Incoming Request
### `async router.handle(request: IRequest, ...args) => Promise<any>`
The `router.handle` method takes a Request-like argument and any additional arguments - then passes them to any matching routes.  This process occurs in a linear loop fashion until *anything at all is returned, from any handler/middleware*, or the routes are exhausted (without a return).  Each handler is **awaited**, allowing both syncronous and asynchronous handlers to work equally well.

**NOTE:** Requests in itty should have both a **method** and full **url**, but otherwise do not need to implement the full Request specification.

```js
const request = new Request('https://foo.bar/todos/jane')

// attempt to match Request to registered routes
await router.handle(request)

// or a more robust handling
await router
        .handle(request)
        .then(json)       // transform all unformed responses to JSON
        .catch(error)     // and catch any uncaught errors
```
