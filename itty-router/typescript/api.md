### TypeScript
# TypeScript API

## AutoRouterOptions
Options for [`AutoRouter`](/itty-router/routers/autorouter)

```ts
type AutoRouterOptions = {
  missing?: RequestHandler
  format?: ResponseHandler
} & RouterOptions
```
> [`RequestHandler`](#requesthandler), [`ResponseHandler`](#responsehandler), [`RouterOptions`](#routeroptions)

<!-- ## CustomRoutes -->
<!-- ## ErrorFormatter -->

## ErrorHandler
An advanced error handler, used as the `catch` stage in [`AutoRouter`](/itty-router/routers/autorouter) and [`Router`](/itty-router/routersrouter).  Unlike a normal error handler attached to the `.catch(err)` block of a Promise chain, this one has access to the original `Error` as well as the `Request` (and other args) passed to the `.fetch()` of the router.  This allows for controlled logging of thrown errors.

```ts
type ErrorHandler<
  ErrorType extends Error = StatusError,
  RequestType = IRequest, Args extends any[] = any[]
> = (error: ErrorType, request: RequestType, ...args: Args) => any
```
> [`StatusError`](#statuserror), [`IRequest`](#irequest)

## GenericTraps <Badge type="info" text="internal" />
Utility type to allow for unspecified attributes on any object.  Used in [IRequest](#irequest).
```ts
type GenericTraps = Record<string, any>
```

## HasContent
Utility type for extending `Request` types when expecting POST/PATCH/etc. content after using [`withContent`](/itty-router/middleware/withcontent).
```ts
type HasContent<ContentType> = {
  content: ContentType
} & IRequestStrict
```
> [`IRequestStrict`](#irequeststrict)

## IRequest
`IRequest` is the default request type in itty, and is the union of [`IRequestStrict`](#irequeststrict) and [`GenericTraps`](#generictraps).  As a result, typical requests have access to both native [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) attributes, as well as anything else you may store there.
```ts
type IRequest = IRequestStrict & GenericTraps
```
> [`IRequestStrict`](#irequeststrict)

## IRequestStrict
`IRequestStrict` *strictly* extends [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) with the known attributes that itty embeds, such as `route`, `params`, and `query`.  Use this instead of `IRequest` for stricter typings in your API.
```ts
type IRequestStrict = {
  route: string
  params: {
    [key: string]: string
  }
  query: {
    [key: string]: string | string[] | undefined
  }
  proxy?: any
} & Request
```

## IttyRouterOptions
Options for [`IttyRouter`](/itty-router/routers/ittyrouter).  The generic traps are used to allow any instantiated router to accept unknown properties (which will remain on the route itself).  With this, you can export the router itself, while adding expected properites from your runtime (e.g. `{ port: 3000 }` and such).
```ts
type IttyRouterOptions = {
  base?: string
  routes?: RouteEntry[]
} & GenericTraps
```
> [`RouteEntry`](#routeentry), [`GenericTraps`](#generictraps)

## IttyRouterType <Badge type="info" text="internal" />
Hopefully you'll never need to use this.
```ts
type IttyRouterType<R = IRequest, A extends any[] = any[], ResponseType = any> = {
  __proto__: IttyRouterType<R>
  routes: RouteEntry[]
  fetch: <Args extends any[] = A>(request: RequestLike, ...extra: Args) => Promise<ResponseType>
  all: Route<R, A>
  delete: Route<R, A>
  get: Route<R, A>
  head: Route<R, A>
  options: Route<R, A>
  patch: Route<R, A>
  post: Route<R, A>
  put: Route<R, A>
} & CustomRoutes<Route<R, A>> & GenericTraps
```
> [`IRequest`](#irequest), [`RequestLike`](#requestlike), [`Route`](#route), [`CustomRoutes`](#customroutes), [`GenericTraps`](#generictraps)

## RequestHandler
A generic request handler, as used in route definitions, middleware, and the `before` stage of [`AutoRouter`](/itty-router/routers/autorouter) and [`Router`](/itty-router/routersrouter).
```ts
type RequestHandler<R = IRequest, Args extends Array<any> = any[]> =
  (request: R, ...args: Args) => any
```
> [`IRequest`](#irequest)

## RequestLike <Badge type="info" text="internal" />
The bare minimum object type for use in the router's `.fetch()` method.
```ts
export type RequestLike = {
  method: string
  url: string
} & GenericTraps
```
> [`GenericTraps`](#generictraps)

## ResponseFormatter <Badge type="info" text="internal" />
Used to format content into a valid [`Response`]() object within [`createResponse()`](/itty-router/api#createresponse).
```ts
export type ResponseFormatter =
  (body?: any, options?: ResponseInit) => Response
```

## ResponseHandler
This is for downstream handlers in the `finally` stage of [`AutoRouter`](/itty-router/routers/autorouter) and [`Router`](/itty-router/routersrouter).  Each `ResponseHandler` has access to a response, a request, and any additional arguments provided to the router's `.fetch()` method.
```ts
type ResponseHandler<
  ResponseType = Response, 
  RequestType = IRequest, 
  Args extends any[] = any[]
> = (
  response: ResponseType & any, 
  request: RequestType & any, 
  ...args: Args
) => any
```
> [`IRequest`](#irequest)

## Route <Badge type="info" text="internal" />
This allows you to overwrite request/args using generics at the route-level.  Bonus points if you can follow this.
```ts
type Route<
  R = IRequest,
  A extends Array<any> = any[],
> = <
  RequestType = R,
  Args extends Array<any> = A,
>(
  path: string,
  ...handlers: RequestHandler<RequestType, Args>[]
) => IttyRouterType<RequestType, Args>
```

## RouteEntry <Badge type="danger" text="advanced" />
If you plan to manually modify the `.routes` collection on a router manually, this is the format you'll need for each entry.
```ts
type RouteEntry = [
  httpMethod: string,
  match: RegExp,
  handlers: RequestHandler[],
  path?: string,
]
```
> [`RequestHandler`](#requesthandler)

## RouterOptions
Options for [`Router`](/itty-router/routers/router).  This adds a `before`, `catch`, and `finally` stage to [`IttyRouterOptions`](#ittyrouteroptions). 
```ts
type RouterOptions = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterOptions
```
> [`RequestHandler`](#requesthandler), [`ErrorHandler`](#errorhandler), [`ResponseHandler`](#responsehandler), [`IttyRouterOptions`](#ittyrouteroptions)

## RouterType
Type for [`Router`](/itty-router/routers/router).  This adds a `before`, `catch`, and `finally` stage to [`IttyRouterType`](#ittyroutertype). 
```ts
type RouterType<R = IRequest, Args extends any[] = any[], ResponseType = any> = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterType<R, Args, ResponseType>
```
> [`RequestHandler`](#requesthandler), [`ErrorHandler`](#errorhandler), [`ResponseHandler`](#responsehandler), [`IttyRouterType`](#ittyroutertype)
