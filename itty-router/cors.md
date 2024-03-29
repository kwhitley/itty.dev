### Routing Basics
# CORS <u>- itty-router</u> <Badge type="danger" text="breaking changes in v5" />
### ~470 bytes [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/cors&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router@next/cors)

v5.x includes an all-new CORS solution replacing the previous `createCors`.  v5 `cors` is very similar (it still creates a [`preflight`](#preflight) and [`corsify`](#corsify) pair), but the options have all been replaced with industry standard ones, such as those used in express.js.

<h2>
  <code>cors(<a href="#corsoptions">CorsOptions?</a>) => { 
    <a href="#preflight">preflight</a>, <a href="#corsify">corsify</a> 
  }</code>
</h2>

### Example
```ts
import { AutoRouter, cors } from 'itty-router'

// get preflight and corsify pair
const { preflight, corsify } = cors()

const router = AutoRouter({
  before: [preflight],  // add preflight upstream
  finally: [corsify],   // and corsify downstream
})

router.get('/', () => 'Hello World!')

export default router
```

## How It Works
The `cors` function returns an upstream middleware (`preflight`) and downstream response handler (`corsify`).

```ts
const { preflight, corsify } = cors()
```

## preflight <Badge type="tip" text="middleware" />
#### `(request: IRequest): Response | void` 
Responds to `OPTIONS` requests.  Include this as upstream middleware.

::: code-group

```ts [Using Stages]
import { Router, cors } from 'itty-router'

const { preflight, corsify } = cors()

const router = Router({
  before: [preflight], // <-- add to "before" stage
})
```

```ts [Manually]
import { Router, cors } from 'itty-router'

const { preflight, corsify } = cors()

const router = Router()

router
  .options('*', preflight) // <-- add to "options" or "all" channel
```

:::

## corsify <Badge type="tip" text="response handler" /> <Badge type="warning" text="changed in v5" />
#### `(response: Response, request?: IRequest): Response`
Adds the CORS headers to existing `Responses` (e.g. as created by `json` or `text`).  Include this at the very end of your response chain, as it should occur *after* any errors are caught.

<Badge type="warning">
  <p>
    The new <code>corsify</code> function now optionally accepts a `Request` as a second argument, allowing origin-reflection when required. In order to use <code>{ credentials: true, origin: '*' }</code>, the `Request` argument will be required.
  </p>
</Badge>

::: code-group

```ts [Using Stages (AutoRouter)]
import { AutoRouter, cors } from 'itty-router'

const { preflight, corsify } = cors()

const router = AutoRouter({
  before: [preflight],
  finally: [corsify],
})

export default router
```

```ts [Using Stages (Router)]
import { Router, cors, error, json } from 'itty-router'

const { preflight, corsify } = cors()

const router = Router({
  before: [preflight],
  catch: error,
  finally: [json, corsify],
})

export default router
```

```ts [Manually]
import { Router, cors, json, error } from 'itty-router'

const { preflight, corsify } = cors()

const router = Router()

router
  .options('*', preflight) // .all() channel also works

export default {
  fetch: (request, ...args) =>
    router
      .fetch(request, ...args)
      .then(json)
      .catch(error)
      .finally((r) => corsify(r, request)) // <-- add corsify at the end
}
```

:::

## CorsOptions <Badge type="danger" text="new in v5" />
| Name (Default Value) | Description | Supported Format | Example
| --- | --- | --- | ---
| **origin** (`"*"`) | Controls `Access-Control-Allow-Origin` header.  Defaults to wildcard. | `string` | `"https://foo.bar"`
| | If a match is found, request origin is reflected. | `string[]` | `["https://foo.bar", "http://cat.dog"]`
| | If set to `true`, request origin is reflected. | `true` | `true`
| | If `RegExp` matches origin, request origin is reflected. | `RegExp` | `/\.example.com$/`
| | Sets allowed origin to whatever the function returns. | `(origin: string) => string \| void` | `(o) => o.endsWith('.com') ? o : undefined`
| **credentials** (`undefined`)  | Set to `true` to allow credentials to be sent (`Access-Control-Allow-Credentials`) | `true` | `true`
| **allowMethods** (`"*"`) | Controls `Access-Control-Allow-Methods` header.  Defaults to wildcard (all methods supported). | `string` | `"GET, POST"`
| | Array format will be joined automatically. | `string[]` | `["GET, "POST"]`
| **allowHeaders** (`undefined`) | Controls `Access-Control-Allow-Headers` header, allowing custom headers to be sent by the request. | `string` | `"x-foo,x-bar"`
| | Array format will be joined automatically. | `string[]` | `["x-foo, "x-bar"]`
| **exposeHeaders** (`undefined`) | Controls `Access-Control-Expose-Headers` header, allowing custom headers to be read. | `string` | `"x-foo,x-bar"`
| | Array format will be joined automatically. | `string[]` | `["x-foo, "x-bar"]`
| **maxAge** (`undefined`) | Controls `Access-Control-Max-Age` header, controlling how long (in seconds) preflight responses are cached in the browser. | `number` | `84600`

### Example (Options)
```ts
import { Router, cors } from 'itty-router'

const { preflight, corsify } = cors({
  origin: '*',
  origin: true,
  origin: 'https://foo.bar',
  origin: ['https://foo.bar', 'https://dog.cat'],
  origin: /oo.bar$/,
  origin: (origin) => origin.endsWith('foo.bar') ? origin : undefined,
  credentials: true,
  allowMethods: '*',
  allowMethods: 'GET, POST',
  allowMethods: ['GET', 'POST'],
  allowHeaders: 'x-foo, x-bar',
  allowHeaders: ['x-foo', 'x-bar'],
  exposeHeaders: 'x-foo, x-bar',
  exposeHeaders: ['x-foo', 'x-bar'],
  maxAge: 84600,
})

const router = Router({
  before: [preflight],
  finally: [corsify],
})
```
