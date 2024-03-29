### TypeScript
# <u>TypeScript -</u> Request Types <u>- itty-router</u>

Throughout the type definitions in this library, you'll notice we use one of two types to define requests flowing through the router/handlers:

1. [`IRequestStrict`](/itty-router/typescript/api#irequeststrict) - This extends [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and adds our custom properties.

1. [`IRequest`](/itty-router/typescript/api#irequest) (default) - This takes [`IRequestStrict`](/itty-router/typescript/api#irequeststrict), *then adds generic traps to allow undefined properties*.  This is the default request type in itty, specifically to allow lazy typing unless more strict typing is needed.

## Strict Mode
To enforce strict types, extend [`IRequestStrict`](/itty-router/typescript/api#irequeststrict).
```ts
import { IRequestStrict } from 'itty-router'

type FooRequest = {
  foo: string
} & IRequestStrict
```

## Lazy Mode
For a more generic approach, extend [`IRequest`](/itty-router/typescript/api#irequest).  This is mostly useful if you're modifying/accessing properties on the `request` and don't want to be chasing types all day.  

```ts
import { IRequest } from 'itty-router'

type FooRequest = {
  foo: string
} & IRequest
```
  > TLDR; Great for sandboxing, maybe not so great for production.
