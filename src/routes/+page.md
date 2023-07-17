<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="Welcome to itty.dev"
  description="Official documentation and learning site for the itty JavaScript libraries (itty-router, itty-fetcher, itty-time, and itty-durable)."
  />

# welcome to <span class="accent">itty</span>.dev

The itty ecosystem was born from a fun little experiment:  To create the world's smallest, full-featured JavaScript microrouter for use in edge/client environments where bundle size matters.  Thus [itty-router](/itty-router) was born. 

Each of the additional libraries were later developed to support other elements of API generation.

> We remove boilerplate noise through high-impact, low-calorie microlibraries.

By creating minimalist (yet flexible) versions of common patterns, we've made low-cost alternatives to many current larger libraries we all use.  Some of these we've written countless times in our own projects (e.g. [**itty-fetcher**](/itty-fetcher) or [**itty-time**](/itty-time)), as certainly you've done as well.  

The catch?  We also aim to make them *even smaller* than you might write yourself, making them a guiltless inclusion within each project!

# the lineup:

## [itty-router](/itty-router) - [![itty-router](https://img.shields.io/npm/dw/itty-router?style=for-the-badge&logo=npm&color=ded&label=itty-router)](https://npmjs.com/package/itty-router)

At only 450 bytes, itty-router is arguably the world's smallest, feature-rich router, designed for use in nearly *any* environment or runtime.  It has two goals in mind: 1. have nearly zero impact on your bundle sizes, and 2. keep your API code looking tiny and beautiful.

It gets top billing because it was the first, the OG "itty".

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

## [itty-durable](/itty-durable) - [![itty-durable](https://img.shields.io/npm/dw/itty-durable?style=for-the-badge&logo=npm&color=ded&label=itty-durable)](https://npmjs.com/package/itty-durable)

A bit of an experimental package, designed to allow a [much] more direct usage of [Cloudflare Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects/).  This library removes virtually all boilerplate when working with DOs, leaving your code tiny, readable, and powerful.

Now your Durable Object class can look this simple:
```ts
import { createDurable } from 'itty-durable'

export class Counter extends createDurable({ autoReturn: true, autoPersist: true }) {
  constructor(state, env) {
    super(state, env)
    this.counter = 0
  }

  increment() {
    this.counter++
  }

  setValue(newValue: number) {
    this.counter = newValue
  }
}
```

While being able to access them from a Worker much like a native class:

```ts
import { Router, error, withParams } from 'itty-router'
import { withDurables } from 'itty-durable'

// export the durable class, per spec
export { Counter } from './Counter'

const router = Router()

router
  // add upstream middleware
  .all('*', withDurables(), withParams)

  // get the contents of a DO
  .get('/:id', ({ id, Counter }) => 
    Counter.get(id).toJSON()
  )

  // call a method on the DC
  .get('/:id/increment', ({ id, Counter }) => 
    Counter.get(id).increment()
  )

  // or pass data to a method
  .get('/set/:value', withParams, ({ id, value, Counter }) => 
    Counter.get(id).setValue(Number(value))
  )
```

<style lang="scss">
  img {
    width: auto;
    height: 1.5rem;
    vertical-align: middle;
  }
</style>
