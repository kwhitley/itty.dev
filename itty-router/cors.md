# CORS

Everyone's favorite topic.

Handling CORS requests in itty is a little different than many traditional routers, since we don't build the Response over a series of middlewares and handlers.  Because of that, our `createCors(options?)` helper returns a pair of handlers, `preflight` and `corsify`.

## preflight <Badge type="info" text="middleware" />
### `preflight(request: IRequest): Response | void`

We recommend embedding this upstream on the `.all('*')` path of any CORS-enabled router/branch, or in the `before` stage if using [`AutoRouter`](/itty-router/routers/autorouter) or [`Router`](/itty-router/routers/router).  Doing so handles all OPTIONS and preflight requests.

## corsify <Badge type="info" text="response transformer" />

This function simply adds the appropriate CORS headers to any Response.

### `corsify(response: Response): Response`

```js
// creates a JSON Response *without* CORS headers
json({ foo: 'bar' })

// creates a JSON Response *with* CORS headers
corsify(json({ foo: 'bar' }))
```

While you *can* wrap any specific Response with the `corsify` function, we recommend simply adding this downstream onto the outermost `router.fetch` chain, transforming all Responses on their way out of the API.

### Example

::: code-group

```ts [AutoRouter]
import { AutoRouter, createCors } from 'itty-router'

const { preflight, corsify } = createCors()

const router = AutoRouter({
  before: [preflight],
  finally: [corsify],
})

const response = await router.fetch(request) // JSON and CORS-enabled
```

```ts [Router]
import { Router, createCors, error, json } from 'itty-router'

const { preflight, corsify } = createCors()

const router = Router({
  before: [preflight],
  catch: error,
  finally: [json, corsify],
})

const response = await router.fetch(request) // JSON and CORS-enabled
```

```ts [IttyRouter (manual)]
import { IttyRouter, createCors, error, json } from 'itty-router'

const { preflight, corsify } = createCors()

const router = IttyRouter()

router
  .all('*', preflight) // upstream preflight middleware
  // other routes

// manually control the creation of the response 
// using the native Promise chain
const response = await router
                          .fetch(request)
                          .then(json)
                          .catch(error)
                          .finally(corsify)
```

:::

## Configuring CORS
In order to facilitate different CORS setups, all the usual CORS options are available when using `createCors` to create your CORS pair.  The following table describes the available options:

| Name | Type(s) | Default | Description
| --- | --- | --- | ---
| **origins** | `string[]` | `["*"]` | the list of acceptable origins
| **methods** | `string[]` | `["GET"]` | list of CORS-allowed HTTP methods
| **maxAge** | `number` | `undefined` | max-age, in seconds, for CORS headers
| **headers** | `object` | `undefined` | list of headers to manually inject into all CORS Responses (via both `preflight` and `corsify`)

### Configuration Example
```js
import { createCors } from 'itty-router'

// create the CORS pair
const { preflight, corsify } = createCors({
  methods: ['GET', 'PATCH', 'POST'],
  origins: ['http://localhost:3000'],
  headers: {
    'my-funky-header': 'is pretty funky indeed',
  },
})
```
