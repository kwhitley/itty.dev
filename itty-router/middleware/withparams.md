### Middleware
# <u>Middleware -</u> withParams <u>- itty-router</u>

`withParams` simply allows you to request route params directly from the Request itself, rather than through `request.params`.  It does this by adding a fallback - if `request['your param name']` isn't found, it tries again from `request.params['your param name']`.

That's all it does.

### Example: *without* `withParams`
```ts
router.get('/items/:id', ({ params }) => `Your id is ${params.id}.`)
```

### Example: with `withParams`
```ts
router.get('/items/:id', withParams, ({ id }) => `Your id is ${id}.`)
```

## Including Globally
If using `withParams`, it's suggested to leverage this upstream (globally), rather than for each individual route.

Here's how to do it using each available Router:

::: code-group

```ts [AutoRouter]
import { AutoRouter } from 'itty-router'

// withParams is included by default
export default AutoRouter()
  .get('/items/:id', ({ id }) => `Your id is ${id}.`)
```

```ts [Router]
import { Router, withParams } from 'itty-router'

// add withParams to the before stage
export default Router({ before: [withParams] })
  .get('/items/:id', ({ id }) => `Your id is ${id}.`)
```

```ts [IttyRouter (or manually)]
import { IttyRouter, withParams } from 'itty-router'

export default IttyRouter()
  .all('*', withParams) // as global upstream middleware
  .get('/items/:id', ({ id }) => `Your id is ${id}.`)
```

:::

## Notes
- [`AutoRouter`](/itty-router/routers/autorouter) includes `withParams` by default as a convenience.
- For the fastest possible performance, use [`Router`](/itty-router/routers/router) instead of [`AutoRouter`](/itty-router/routers/autorouter) and do *not* use `withParams`.  The additional proxy layer over the `Request` object will fractionally slow down all requests of it.
