### TypeScript
# Request Handlers & Middleware

To type handlers/middleware use the [`RequestHandler<RequestType, Args>`](/itty-router/typescript/api#requesthandler) type.  By default, `RequestType` is set to the generic [`IRequest`](/itty-router/typescript/api#irequest).

## Example: Generic Handler
```ts
import {
  RequestHandler,
  Router,
} from 'itty-router'

const router = Router()

// define middleware with the RequestHandler type (no generic)
const withUser: RequestHandler = (request) => {
  request.user = 'Kevin'
}

router.get('/', withUser, (request) => {
  request.user = 'Kevin' // this works (IRequest)
})
```

## Example: Custom Type
```ts
import {
  IRequestStrict, 
  RequestHandler,
  Router,
} from 'itty-router'

// define a custom request type
type UserRequest = {
  user: string
} & IRequestStrict

const router = Router()

// and pass it as the generic to RequestHandler
const withUser: RequestHandler<UserRequest> = (request) => {
  request.user = 'Kevin'
}

router.get('/', withUser, (request) => {
  request.user = 'Kevin' // this works (UserRequest)
})
```
