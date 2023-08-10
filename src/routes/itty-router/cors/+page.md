<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Using CORS"
  description="Building CORS-enabled APIs using itty-router."
  />

## CORS

Everyone's favorite topic.

Handling CORS requests in itty is a little different than many traditional routers, since we don't build the Response over a series of middlewares and handlers.  Because of that, our `createCors(options?)` helper returns a pair of handlers, `preflight` and `corsify`.

### preflight <small>(middleware)</small>
We recommend embedding this upstream on the `.all('*')` path of any CORS-enabled router/branch.  Doing so handles all OPTIONS and preflight requests.

```js
import { Router, createCors, error, json } from 'itty-router'

const { preflight, corsify } = createCors()

const router = Router()

router
  // embed preflight upstream to handle all OPTIONS requests
  .all('*', preflight)
```

### corsify

This function simply adds the appropriate CORS headers to any Response.

### `corsify(response: Response): Response`

```js
// creates a JSON Response *without* CORS headers
json({ foo: 'bar' })

// creates a JSON Response *with* CORS headers
corsify(json({ foo: 'bar' }))
```

While you *can* wrap any specific Response with the `corsify` function, we recommend simply adding this downstream onto the outermost `router.handle` chain, transforming all Responses on their way out of the API.

```js
router
  .handle(request, ...args)

  // turn any returned raw data into JSON
  .then(json)

  // catch errors BEFORE corsify
  .catch(error)

  // corsify all Responses (including errors)
  .then(corsify)
```

## Configuring CORS
In order to facilitate different CORS setups, all the usual CORS options are available when using `createCors` to create your CORS pair.  The following table describes the available options:

| Name | Type(s) | Default | Description
| --- | --- | --- | ---
| **origins** | `string[]` | `["*"]` | the list of acceptable origins
| **methods** | `string[]` | `["GET"]` | list of CORS-allowed HTTP methods
| **maxAge** | `number` | `undefined` | max-age, in seconds, for CORS headers
| **headers** | `object` | `undefined` | list of headers to manually inject into all CORS Responses (via both `preflight` and `corsify`)

### Complete Example
```js
import { createCors, error, json, Router } from 'itty-router'
import { otherRouter } from './api/v1'

// create the CORS pair
const { preflight, corsify } = createCors({
  methods: ['GET', 'PATCH', 'POST'],
  origins: ['http://localhost:3000'],
  headers: {
    'my-funky-header': 'is pretty funky indeed',
  },
})

// create a router
const router = Router()

router
  // register the preflight middleware
  .all('*', preflight)

  // add some routes, another router, etc.
  .all('/v1/*', otherRouter.handle)

  // catch missed routes
  .all('*', () => error(404))

export default {
  fetch: (request) => router
                        .handle(request)

                        // transform unformed responses
                        .then(json)

                        // catch any errors
                        .catch(error)

                        // add CORS headers to all requests,
                        // including errors
                        .then(corsify)
}
```
