<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="TypeScript Guide"
  description="Complete guide to TypeScript implementation in itty-router."
  />

## TypeScript

Let's just get this out there.  Making itty play nicely with user-friendly types was HARD.  We've obviously tried a few times, with very valid complaints springing up each time. In fact, the entire reason v4.x has sat so long on the @next tag is the incomplete (and inadequate) state of the types.

But I think we've got it this time.


### There are 2 main ways to type in itty:

1. **[Uniform Routers](#uniform-routers)**. A single Request-type and args for an entire router.  This saves a lot of per-route typing, but is only appropriate if all the routes on a given router have the same request signature.  Triggered by passing generics to the Router itself.
2. **[Non-uniform Routers](#non-uniform-routers)**.  Each route will default to (IRequest, ...args), and may be overriden with generics, or simply by casting arguments in the handlers.  This style is enabled by default for greatest flexibility.  To disable, simply pass generics to the Router itself (and remove any downstream).

Have consistent request types?  Choose [uniform routers](#uniform-routers) and save some boilerplate.  Have a bunch of custom middleware that modify the request?  Probably go with the default [non-uniform routers](#non-uniform-routers).

<a name="uniform-routers"></a>

### Uniform Routers <small class="new">new in v4.x</small>
When you have a consistent signature and arguments throughout the routes of a given router, pass your types to the Router itself to avoid repeated defintions on routes downstream.

The first argument (RequestType) is the one you'll most commonly need to modify.  The second can be left alone (allowing anything to be passed, untyped, as additional arguments), unless you want to explicitly type the additional arguments as well.

This removes the ability to easily modify indifidual routes, in favor of a single convenient method to type the whole thing.

```ts
import { Router, IRequest } from 'itty-router'

// define a custom RequestType
type FooRequest = {
  foo: string
} & IRequest

const router = Router<FooRequest>()

router
  .get('/', (request) => {
    request.foo         // valid
  })
  .get('/bar', (request) => {
    request.foo         // still valid
  })
```

#### Passing Additional Arguments (example with Cloudlare Workers)

```ts
import { Router, IRequest } from 'itty-router'

// define a custom RequestType
type FooRequest = {
  foo: string
} & IRequest

// declare what's available in our env
type Env = {
  KV: KVNamespace
}

// create a convenient duple
type CF = [env: Env, context: ExecutionContext]

// then pass them to the Router
const router = Router<FooRequest, CF>()

router
  .get('/', ({ foo }, env, context) => {
    env.KV              // works!
    context.waitUntil   // also works!
  })
```

<a name="non-uniform-routers"></a>

### Non-uniform Routers <small class="new">new in v4.x</small>
By default, itty assumes this - the most flexible pattern.

To custom type routes using this method, either pass generics to the route handler, 
or declare the types for the request handlers manually.

```ts
import { Router, IRequest } from 'itty-router'

// define a custom RequestType
type FooRequest = {
  foo: string
} & IRequest

// declare what's available in our env
type Env = {
  KV: KVNamespace
}

// create a convenient duple
type CF = [env: Env, context: ExecutionContext]

const router = Router()

router
  .get('/normal', (request) => 'This will work')

  // RequestType generic
  .get<FooRequest>('/generics-request', (request) => {
    request.foo // valid!
  })

  // RequestType and Args generics
  .get<FooRequest, CF>('/generics-request-and-args', 
    (request, env, ctx) => {
      request.foo     // valid!
      env.KV          // valid!
      ctx.waitUntil   // valid!
    }
  )

  // manual typing
  .get('/manual-typing', (
    request: FooRequest, 
    env: Env, 
    ctx: ExecutionContext,
  ) => {
    request.foo     // valid!
    env.KV          // valid!
    ctx.waitUntil   // valid!
  })
```

---

### Exposed Types
There are two useful types exposed by Itty to make your life easier (along with many other internal ones that you'll likely never need):

<a name="IRequestStrict"></a>

### `IRequestStrict` <small class="new">new in v4.x</small>
This is a Request, with the additional props of `method`, `url`, `route`, `params`, and `query` defined.  This differs from `IRequest` (more common), in that it specifically does not include `GenericTraps` (which allows any undefined attributes as `any`).  We recommend `IRequest` for developing fast, then locking down to `IRequestStrict` for tighter control.

```ts
type IRequestStrict = {
  method: string,
  url: string,
  route: string,
  params: {
    [key: string]: string,
  },
  query: {
    [key: string]: string | string[] | undefined,
  },
  proxy?: any,
} & Request
```

<a name="IRequest"></a>

### `IRequest`
Just like `IRequestStrict`, but with `GenericTraps` added for convenience when dealing with large quantities of unknown params coming in from outside middleware.  This is used by default within itty for greatest flexibility, at the expense of strict typing.

<p class="new">
  v4.x changes - <code>IRequest</code> now extends the Web Standards <code>Request</code> by default, allowing full access to those methods/attributes.
</p>

```ts
type GenericTraps = {
  [key: string]: any
}

type IRequest = IRequestStrict & GenericTraps
```

That's it!  These will hopefully be the only core ones you need (outside of ones you define yourself).


