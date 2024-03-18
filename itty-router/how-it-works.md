# How does it work?
Itty does a few things very differently from other routers.  This allows itty route code to be shorter and more intuitive than most!

## 1. Proxy === future-proof
In order to save bytes, we don't define every HTTP method - in fact, we define *none of them<sup>1</sup>*. Instead, we leverage a core Proxy to map method calls to route handlers. In the year 2077, when we have HTTP methods like `AI` and `CYBERPUPPY`, itty will still have you covered.

<sub>1: We do include an `all` channel...</sub>

## 2. Any handler can be middleware
In itty, you simply return (anything) to exit the flow.  If any handler ever returns a thing, that's what the `router.fetch` returns.  If it doesn't, it's considered middleware, and the next handler is called. 

That's it!

::: code-group

```js [JavaScript]
// middleware: simply doesn't return
const withUser = (request) => { 
  request.user = 'Halsey'
}

// uses middleware, then returns something
router.get('/secure', withUser,
  ({ user }) => `Hey, ${user} - welcome back!`
)
```

```ts [TypeScript]
import { IRequest } from 'itty-router'

// custom request type
type UserRequest = {
  user: string
} & IRequest

// middleware: simply doesn't return
const withUser = (request: IRequest) => { 
  request.user = 'Halsey'
}

// uses middleware, then returns something
router.get<UserRequest>('/secure', withUser,
  ({ user }) => `Hey, ${user} - welcome back!`
)
```

:::

## 3. It's just Promises
We `await` every handler, looking for a return value.  If we get one, we break the flow and return your value (this can be anything).  If we don't, we continue processing handlers/routes until we do.  This means that every handler can either be synchronous or async - it's all the same.


## 4. You don't have to format a response in each route handler.
Since itty doesn't care what you return, we can format everything at once, downstream in the `.then()` block (or `after` stage if using [`Router`](/itty-router/routers/router) or [`AutoRouter`](/itty-router/routers/autorouter)). This even works for async external calls (that eventually return data).

::: code-group 

```ts [IttyRouter]
const router = IttyRouter()

router
  .get('/manual', (request) => json([1, 2, 3]))
  .get('/easy-mode', (request) => [1, 2, 3])

router
  .fetch(request)
  .then(json) // we can turn any non-Response into valid JSON.
```

```ts [Router]
const router = Router({
  after: [json],
})

router
  .get('/manual', (request) => json([1, 2, 3]))
  .get('/easy-mode', (request) => [1, 2, 3])

router
  .fetch(request) // automatically formatted to a JSON Response
```

```ts [AutoRouter]
const router = AutoRouter()

router
  .get('/manual', (request) => json([1, 2, 3]))
  .get('/easy-mode', (request) => [1, 2, 3])

router
  .fetch(request) // automatically formatted to a JSON Response
```

:::

### 4. `router.fetch(request, ...args)` passes any additional args to ALL handlers.
Every argument you pass to `route.fetch` is given to each handler, in the same order.

We only require one argument in itty - a Request-like object with **url** and **method** properties (usually a native [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)). Because itty is not opinionated about [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) creation, there is no "response" argument requirement.

As a result of this, exporting the default fetch will automatically work in environments like [Cloudflare Workers](https://workers.cloudflare.com/) where an environment and context are passed in:

::: code-group 

```ts [Cloudflare Worker]
const router = AutoRouter()

router.get('/my-route', (request, environment, context) => {
  // we can access anything here that was passed to `router.fetch`.
})

// translates to an object with { fetch: Function } shape
export default router
```

```ts [Custom]
const router = AutoRouter()
const harry = { name: 'Harry' }

router.get('/greeting', (request, user) => `Welcome, ${user.name}!`)

router
  fetch(request, harry)
```

:::
