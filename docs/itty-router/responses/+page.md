<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Building Responses"
  description="Building Responses with itty-router."
  />

## Creating Responses

To create Responses without all the boilerplate, itty-router includes several response helper functions, as well as a utility function to make your own custom types.

Each of the following helpers creates a `new Response`, with the appropriate `content-type` header included for the corresponding MIME-type.

Response helpers have the following signature (replace `json` with any other helper name):  
### `json(data: any, options?: ResponseInit): Response`

### Included Response Helpers

The following basic response helpers have been included in the core library to handle the most common API delivery types:

### [`json`](/itty-router/api#json) [`text`](/itty-router/api#text) [`html`](/itty-router/api#html) [`jpeg`](/itty-router/api#jpeg) [`png`](/itty-router/api#png) [`webp`](/itty-router/api#webp)

For example:

```js
import { json } from 'itty-router'

json({ foo: 'bar' })
```

Creates the following Response:

```js
new Response({
  headers: {
    'content-type': 'application/json',
  },
  body: '{"foo":"bar"}'
})
```

### Creating Your Own Response Helpers
### `createResponse(mimeType: string, formatter?: Function)`

In order to streamline making your own custom response types, we're sharing the [`createResponse`](/itty-router/api#createResponse) helper we use to make all the response helpers in itty.  To use it, simply pass in the `content-type` header for the MIME-type, and optionally, a body formatter (second argument).

For example, here's how we use it to create the [`json`](/itty-router/api#json) helper.

```js
import { createResponse } from 'itty-router'

const json = createResponse('application/json', JSON.stringify)

json({ foo: 'bar' }) // creates JSON-formatted Response
```

### Downstream Response Helpers
Because each response helper transforms raw data into a valid Response, they can also be used downstream, rather than at the route level.  This allows route code to remain simpler, removing the boilerplate of always transforming data into JSON within each route handler.  Additionally, as all route handlers are awaited, async functions (that eventually return data) are a perfectly valid response if caught and transformed downstream.

#### Using Response Helpers Downstream
```js
import { error, json, Router } from 'itty-router'
import { db } from './database-service'

const router = Router()

router
  // a simple JSON call
  .get('/foo', (request) => ['bar', 'baz'])


  // an async JSON call
  .get('/database-call', () => db.getData())

export default {
  fetch: (...args) => router
                        .handle(...args)
                        .then(json) // <-- add the JSON transform downstream
                        .catch(error)
}
```
