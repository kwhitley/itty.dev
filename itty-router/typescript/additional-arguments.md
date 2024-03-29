### TypeScript
# <u>TypeScript ></u> Additional Arguments <u>- itty-router</u>

One of the powerful things about itty is our strict requirement of only a single argument, the `request`.  Beyond that, any arguments you pass to a router's `.fetch()` method also *pass along to every single handler downstream*.

For example:

```ts
import { Router } from 'itty-router'

const router = Router()

router.get('/', (request, ctx) => { // [!code ++]
  ctx.foo // bar
})

// fake request
const request = new Request('https://foo.bar')

// fake context
const CONTEXT = { foo: 'bar' }

router.fetch(request, CONTEXT)
```

## But how do we type this?

Since we technically have an infinite number of arguments we can pass:
```ts
router.fetch(request, arg1, arg2, arg3, ...)
```

We need to use an array generic to pass these along to downstream routes.  Since this is typically a router-level setting, we recommend using the router-level generic to do this:

### Typed Example (assumes Cloudflare Workers)

```ts
import { 
  Router,
  IRequest, // [!code ++]
} from 'itty-router'

// we define our environment
type Environment = { KV: KVNamespace } // [!code ++]

// and now both args combined (that Workers send to the .fetch())
type CFArgs = [Environment, ExecutionContext] // [!code ++]

// then just pass it to the router
const router = Router<IRequest, CFArgs>() // [!code ++]

router.get('/', (request, env, ctx) => { // [!code ++]
  env.KV.get('test') // this works!
  ctx.waitUntil() // so does this!
})
```

### Defining a [`RequestHandler`](/itty-router/typescript/api#requesthandler) with additional Arguments
Just like with a route, we can pass the same generics to a [`RequestHandler`](/itty-router/typescript/api#requesthandler) (any handler/middleware) to give it access to the additional arguments.
```ts
import { 
  RequestHandler, // [!code ++]
  IRequest, // [!code ++]
} from 'itty-router'

// we define our environment
type Environment = { KV: KVNamespace } // [!code ++]

// and now both args combined (that Workers send to the .fetch())
type CFArgs = [Environment, ExecutionContext] // [!code ++]

// creating some middleware that needs access to CF variables
export const withUser: RequestHandler<IRequest, CFArgs> = // [!code ++]
  (request, env, context) => {
    request.user = 'Kevin'
    env.KV.get('test') // this works!
    ctx.waitUntil() // so does this!
  }
```
> ^ assumes Cloudflare Worker environment
