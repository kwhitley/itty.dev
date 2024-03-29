### TypeScript
# Response Handlers

These are specific to the `finally` stage in [`AutoRouter`](/itty-router/routers/autorouter) and [`Router`](/itty-router/routersrouter).  Each `ResponseHandler` has access to a response, a request, and any additional arguments provided to the router's `.fetch()` method.  Override defaults using generics (see example).

## Example: Generic
In this example, we create a generic pass-through (we return nothing) response-handler.  In the `finally` stage, each handler that returns something *replaces* the response, and any handler that does not, runs, but does not modify the response.
```ts
import {
  ResponseHandler,
  Router,
} from 'itty-router'

// defining a generic logger
const logger: ResponseHandler = (response, request) => {
  console.log(
    response.status,
    request.url,
    'at',
    new Date().toLocaleString(),
  )
}

const router = Router({
  finally: [logger],
})
```

## Example: Custom
In this example, we leverage the `before` stage to inject a `request.start` (timestamp), which we'll read later in the `finally` stage.  While this would work fine without the custom `StartRequest` type (because the default `IRequest` is not strict), by strict typing and passing in the generic, our code in `logger()` is fully aware of `request.start` and its numeric nature.
```ts
import {
  ResponseHandler,
  Router,
  IRequestStrict,
} from 'itty-router'

type StartRequest = {
  start: number
} & IRequestStrict

// upstream middleware to add a start time
const withStart: RequestHandler = (request) => {
  request.start = Date.now()
}

// downstream handler to log the difference (using generic)
const logger: ResponseHandler<StartRequest> = (response, request) => {
  console.log(request.url, 'served in', Date.now() - request.start, 'ms')
}

const router = Router({
  before: [withStart],
  finally: [logger],
})
```
