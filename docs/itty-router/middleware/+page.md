<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Middleware"
  description="Building and using middleware within itty-router."
  />

## Middleware
Technically, any function within itty-router can be considered middlware, and you may attach any number of these to a given route.

These follow a few simple rules:

1. All route handlers are equal in itty.
1. A handler becomes "middleware" simply by being upstream of subsequent handlers/routes and *not returning* (or returning undefined).
1. The return of each of each handler is "awaited", allowing any handler to use sync/async syntax.
1. You may pass any number of handlers to a given route.

Execution of each matched function will proceed until the list is exhausted (no match), or one of them returns *anything at all*.  This is fundamentally different from say, Express.js, where middleware must call a `next()` function to continue.  In itty, just omit a return to continue.  This creates fantastically small middleware/route code.

Every handler/middleware has the following signature, where `...args` are whatever you passed into the `router.handle(request, ..args)` function.
### `(request: IRequest, ...args): any`

### Example 1 - simple middleware

In this example, we create a single `withKitten` middleware, and use it just upstream of a route handler.  This embeds the `kitten` attribute on the `request` object.

```js
import { Router } from 'itty-router'

// middleware is any function that doesn't return
const withKitten = (request) => {
  request.kitten = {
    name: 'Halsey',
    description: 'adorable',
  }
}

// define our router
export const router = Router()

router
  // GET kitten - the kitten is embedded into the request via middleware
  .get('/kitten', withKitten, ({ kitten }) => kitten.name)
```

### Example 2 - sync vs. async middleware

Since all handlers are awaited during execution, both sync and async handlers are fine to use, with no changes in your route code/flow. :)

```js
// sync middleware
const withSyncData = (request) => {
  request.foo = 'bar'
}

// async middleware
const withAsyncData = async (request) => {
  request.items = await db.getItems()
}

// and to use...

router.get('/test', withSyncData, withAsyncData,
  ({ foo, items }) => `foo is ${foo} and you have ${items.length} items`
)
```

### Example 3 - global middleware

Any upstream route matches affect all others downstream.  This means you can put global middleware at the top of a router, branch, etc.  Here we'll show an example of simple user authentication on a particular branch.


```js
import { error, json, Router } from 'itty-router'
import { getUser } from './user-validation'

// MIDDLEWARE: withAuthenticatedUser - embeds user in Request or returns a 401
const withAuthenticatedUser = (request) => {
  const token = request.headers.get('Authorization')
  const user = getUser(token)
  
  // by returning early here, we cut off all future handlers
  if (!user) return error(401, 'Invalid user.')

  // otherwise, we embed the user for future use
  request.user = user
}

// define our router
export const router = Router()

router
  // wildcard will match any route, and "all" matches any HTTP method
  .all('*', withAuthenticatedUser)

  // nothing downstream will be accessible without an authenticated user
  .get('/secret', ({ user }) => user.name)
```
