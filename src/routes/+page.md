# welcome to <span class="accent">itty</span>.dev

The itty ecosystem was born from a fun little experiment:  To create the world's smallest, full-featured microrouter.  Originally, this served the emerging edge function space, where API routing appeared to be in a rather barbaric state.  Nowadays, we have many great router and/or framework options, depending on your environment, but itty still remains the smallest (by far).

Each of the additional libraries was developed to support other elements of API generation, with the goal of making the functions you've probably written a million times, but hopefully smaller than you get it yourself (thus earning its spot as a dependency in your project).  Luckily, the community has helped code golf the heck out of these to ensure this remains true!

Here are the current itty libraries:

## [itty-router](/itty-router) - [![itty-router](https://img.shields.io/npm/dw/itty-router?style=for-the-badge&logo=npm&color=ded&label=itty-router)](https://npmjs.com/package/itty-router)

At only 430 bytes, itty-router is arguably the world's smallest, feature-rich router, designed for use in nearly *any* environment or runtime.  It has two goals in mind: 1. have nearly zero impact on your bundle sizes, and 2. keep your API code looking tiny and beautiful.

```js
import { 
  error,              // creates error Responses
  json,               // creates JSON Responses
  Router,             // the Router itself
} from 'itty-router'

const router = Router()

router
  // GET a route, with a route param
  .get('/todos/:id', 
    ({ params }) => ({ message: `You fetched todo #${params.id}` })
  )

  // *any* HTTP method works, even ones you make up
  .puppy('/secret', () => 'Because why not?')

  // return a 404 for anything else
  .all('*', () => error(404))

// Example showing Cloudflare module syntax
export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)   // turn any raw data into JSON
                              .catch(error) // and catch any uncaught errors
}
```

## [itty-fetcher](/itty-fetcher) - [![itty-fetcher](https://img.shields.io/npm/dw/itty-fetcher?style=for-the-badge&logo=npm&color=ded&label=itty-fetcher)](https://npmjs.com/package/itty-fetcher)

The same boilerplate native Fetch API helper you've probably written dozens of times - just hopefully a bit smaller, allowing you to write your fetch calls like this:

```js
// optionally predefine an API
const api = fetcher({ base: 'https://foo.bar/api/v1' })

// GET some JSON (everything is auto-parsed by default)
const data = await api.get('/my/json/api')

// or POST some data
await api.post('/my/collection', { foo: 'bar' })
```

## [itty-time](/itty-time) - [![itty-time](https://img.shields.io/npm/dw/itty-time?style=for-the-badge&logo=npm&color=ded&label=itty-time)](https://npmjs.com/package/itty-time)

So you've written an API but need to calculate max-age, expirations, etc.  This library simplifies the process, allowing you to write durations such as "1 week, 2 days, and 4 hours" instead of... 1000 \* 60 \* 60 \* 24 \* 7 + 1000 \* 60 \* 60 \* 24 \* 2 + 1000 \* 60 \* 60... well, you get the point.  All this is done in about 500 bytes.

```js
// get seconds for TTL
const ttl = getSeconds('1 month and 30 minutes')

// or get a future date
const expiration = datePlus('1 week')

// or a future date from another date
const expiration = datePlus('1 week', datePlus('1 year'))
```

[![itty-fetcher](https://img.shields.io/npm/dw/itty-fetcher?style=for-the-badge&logo=npm&color=ded&label=itty-fetcher)](https://npmjs.com/package/itty-fetcher)
- At some point, you'll need to talk to these APIs you've written.  This simplifies that process, leaving your code short and beautiful, while only costing you around 600 bytes.

[![itty-durable](https://img.shields.io/npm/dw/itty-durable?style=for-the-badge&logo=npm&color=ded&label=itty-durable)](https://npmjs.com/package/itty-durable)
- A bit of an experiemental package, yet one I use in production all the time.  This takes the incredibly powerful [Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects/) (thanks, Cloudflare!), but gives it a MUCH improved interface for simple tasks.  This library removes nearly every bit of the boilerplate when working with DOs, leaving your code tiny, readable, and powerful.

<style lang="scss">
  img {
    width: auto;
    height: 1.5rem;
    vertical-align: middle;
  }
</style>
