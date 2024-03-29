### Routing Basics
# Nesting Routers <u>- itty-router</u>

To create a nested API, simply use a child router's `router.fetch` as a route handler in a parent router, typically on a wildcard route.  

## Requirements
1. <u>Each subrouter needs to explicity declare its ENTIRE base path</u>, not just the relative path. While unlike most routers, this is the small price we pay for keeping itty so tiny.
1. Pass the `subrouter.fetch` function to a route on the parent router.  This is typically in a wildcard route on the `.all` channel (if the subrouter needs access to multiple HTTP methods).  Adjust to suite your requirements.

The following example shows a simple nested router:

#### Parent/Root Router:
```js
import { AutoRouter } from 'itty-router'
import { router as childRouter } from './api/v1'

export default AutoRouter({ base: '/api' })
  .all('/child/*', childRouter.fetch) // register child router
  .get('/', () => 'Hello from the parent!')
```

#### Child Router:
```js
import { AutoRouter } from 'itty-router'

// NOTE: this base must include the *complete* base path
export default AutoRouter({ base: '/api/v1' })
  .get('/', () => 'Hello from the child!')
```

## Things to consider
- To preserve the incredibly small size of itty-router, we do not include any sort of automatic path-building like other routers have.  This means each child router must include a `base` option to prefix every route within that router (optionally, each route can simply define itself from the root).  In the example above, please note that the base of the child router MUST match the base of the route (wildcard aside) it was registered for in the parent router.

- You may nest any number of routers, but be sure to keep track of the required base path.

- Upstream middleware, such as ones registered in parent routers ahead of child routers, will still affect downstream requests.  This means you only need to register some middleware at the outermost router - for example `withParams`.  This also allows you to authenticate entire API branches.

- Unless you have a specific 404 message for a child router, or prevent other API branches from being analyzed, there is no need to register that catch-all route within each router.  Simply include that logic once in the root router.

- Similarly, a single downstream `json` handler (shown in the example above) will form a Response for the final returned value, even if the match occured within a child router.

- Upstream middleware (from the parent router) will still affect downstream routes.  For example, a single `withParams` middleware inclusion at the parent router will cover your entire API!
