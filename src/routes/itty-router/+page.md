# <span class="accent">itty</span>-router
<div class="byline">
  An extremely tiny (~430 bytes) router, designed to make lightweight APIs &mdash; anywhere.
</div>

### Use Anywhere
Originally created for lightweight serverless and client environments (e.g. Service Workers, Cloudflare Workers, etc.), itty-router is, at its heart, a completely environment-agnostic microrouter.  This means you can use it anywhere, knowing it will leave a near-zero impact on your bundle size.

### Ultra-Flexible
Unlike many framework routers, itty makes no underlying assumptions of how or where you'll use it. It has an extremely simplified handler signature, requiring only a Request-like object, with the rest left up to you! This can even be used to emulate the syntax of other popular routers (e.g. Express.js), if you're inclined.

### Ultra-Light
We're not just talking about bundle size here.  We like seeing tiny, readable route code too.  Itty helps with that.

### Battle-Ready
This little router nets over 1 million downloads a year, has been hardened and tested by dozens of contributors over two years, and currently handles many millions of requests daily across an assortment of production APIs.  These 430 tiny bytes have an enormous battery of test coverage to ensure it stays stable across releases.

### Example Usage

```js
import { 
  error,              // creates error Responses
  json,               // creates JSON Responses
  Router,             // the Router itself
  withParams,         // middleware to extract params into the Request itself
} from 'itty-router'

// we'll start with some fake data
const todos = [
  { id: '1', message: 'Pet the puppy'. },
  { id: '2', message: 'Pet the kitty'. },
]

const router = Router()

router
  // GET todos - just return some data!
  .get('/todos', () => todos)

  // GET single todo
  .get('/todos/:id', withParams, 
    ({ id }) => {
      const todo = todos.find(t => t.id === id)

      return todo || error(404, 'That todo was not found!')
    }
  )

  // *any* HTTP method works, even ones you make up
  .puppy('/secret', () => 'Because why not?')

  // return a 404 for anything else
  .all('*', () => error(404))

// Example showing Cloudflare module syntax
export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)
                              .catch(error)
}
```
