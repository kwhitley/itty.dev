### TypeScript
# Routes & Routers

One of the most basic things you'll likely find yourself typing with itty is simply the `request` itself, while defining routes.

This can be done in one of several ways, and almost always involves extending one of two very important types in itty, [`IRequest`](/itty-router/typescript/api#irequest) or [`IRequestStrict`](/itty-router/typescript/api#irequeststrict) (a stricter version).  

### In general:
- Use [`IRequest`](/itty-router/typescript/api#irequest) (default) when you want to be able to access undefined attributes on a request.
- Use [`IRequestStrict`](/itty-router/typescript/api#irequeststrict) when you want to *only* use defined attributes on a request.

## 1. At the variable
We can of course, simply type each argument in a handler.  The first argument, `request`, defaults to `IRequest` unless overridden.
```ts
import { IRequest, Router } from 'itty-router'

type FooRequest = {
  foo: string
} & IRequestStrict

const router = Router()

router.get('/', (request: FooRequest) => { // [!code ++]
  request.foo // foo is valid
  request.bar // [!code error] // but bar is not
})
```

## 2. At the route (using generics)
Alternatively, we can move this to a generic at the route level.
```ts
import { IRequest, Router } from 'itty-router'

type FooRequest = {
  foo: string
} & IRequestStrict

const router = Router()

router.get<FooRequest>('/', (request) => { // [!code ++]
  request.foo // foo is valid
  request.bar // [!code error] // but bar is not
})
```

## 3. At the router level (using generics)
And finally, we can define the default request type for the *entire router*, again using a generic at the router creation.
```ts
import { IRequestStrict, Router } from 'itty-router'

type FooRequest = {
  foo: string
} & IRequestStrict

type BarRequest = {
  bar: string
} & IRequestStrict

const router = Router<FooRequest>() // [!code ++] // router-level generic

router
  .get('/', (request) => {
    request.foo // foo is valid
    request.bar // [!code error] // but bar is not
  })

  // use a route-level generic to override the router-level one
  .get<BarRequest>('/', (request) => { // [!code ++] // route-level override
    request.foo // [!code error] // now foo is not valid
    request.bar // but bar is
  })
```
