# TypeScript <Badge type="warning" text="updated in v5" />

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

## Non-uniform Routers <Badge type="warning" text="v4.x+" />
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

## Exposed Types
There are two useful types exposed by Itty to make your life easier (along with many other internal ones that you'll likely never need):

### `IRequestStrict` <Badge type="warning" text="v4.x+" />
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

### `IRequest` <Badge type="warning" text="v3.x+" />
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


