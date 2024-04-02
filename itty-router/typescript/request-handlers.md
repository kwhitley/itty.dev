### TypeScript
# <u>TypeScript ></u> Request Handlers & Middleware <u>- itty-router</u>

To type handlers/middleware use the [`RequestHandler<RequestType, Args>`](/itty-router/typescript/api#requesthandler) type.  By default, `RequestType` is set to the generic [`IRequest`](/itty-router/typescript/api#irequest).

## Example: Generic Handler
```ts
import {
  RequestHandler, // [!code ++]
  Router,
} from 'itty-router'

const router = Router()

// define middleware with the RequestHandler type (no generic)
const withUser: RequestHandler = (request) => { // [!code ++]
  request.user = 'Kevin'
}

router.get('/', withUser, (request) => {
  request.user = 'Kevin' // this works (IRequest)
})
```

## Example: Custom Type
```ts
import {
  IRequestStrict, // [!code ++]
  RequestHandler, // [!code ++]
  Router,
} from 'itty-router'

// define a custom request type
type UserRequest = {  // [!code ++]
  user: string // [!code ++]
} & IRequestStrict // [!code ++]

const router = Router()

// and pass it as the generic to RequestHandler
const withUser: RequestHandler<UserRequest> = (request) => { // [!code ++]
  request.user = 'Kevin'
}

router.get('/', withUser, (request) => {
  request.user = 'Kevin' // this works (UserRequest)
})
```

## Example: Additional Arguments
Just like with a route, we can pass generics to a [`RequestHandler`](/itty-router/typescript/api#requesthandler) to give it access to the additional arguments.  In this example, we assume additional arguments are being provided to the handlers (assumes that they have been passed to the router `.fetch()` by Cloudflare.)
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

## Example: Multiple Middleware/Handlers
TypeScript doesn't play nice with an array of handlers that can each be typed differently (and modify the input of subsequent handlers).

In order to get around this barrier, pass a union of the request types as a generic to the route/router.  With this, the request-type for the entire chain will have been modified.

```ts
type A = { a: string } & IRequestStrict
type B = { b: number } & IRequestStrict

// middleware 1 expects A
const withA = (request: A) => { a = 'foo' }

// middleware 2 expects B (but not A)
const withB = (request: B) => { b = 12345 }

// withB will complain that the incoming request types don't match
router.get('/', withA, withB, (request) => { // [!code --]
  request.a // OK
  request.b // won't find it // [!code --]
})

// but passing the union allows both withA & withB to pass, plus the request
router.get<A & B>('/', withA, withB, (request) => { // [!code ++]
  request.a // OK
  request.b // OK // [!code ++]
})
```
