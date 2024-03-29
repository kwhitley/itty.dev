### Routing Basics
# Responses <u>- itty-router</u>

To create Responses easily, itty-router includes several response helpers, as well as exposing the utility function [`createResponse`](#creating-your-own-response-helpers) to make your own custom types:

## Included Response Helpers

The following basic response helpers have been included in the core library to handle the most common API delivery types:

[`json`](/itty-router/api#json) [`text`](/itty-router/api#text) [`html`](/itty-router/api#html) [`jpeg`](/itty-router/api#jpeg) [`png`](/itty-router/api#png) [`webp`](/itty-router/api#webp)


Each of these creates a `new Response`, with the appropriate `content-type` header included for the corresponding MIME-type.

Response helpers have the following signature (replace `json` with any other helper name):  
### `json(data: any, options?: ResponseInit): Response`



For example:

```js
import { json } from 'itty-router'

json({ foo: 'bar' }, { status: 418 })
```

Creates the following Response:

```js
new Response({
  status: 418,
  headers: {
    'content-type': 'application/json',
  },
  body: '{"foo":"bar"}'
})
```

## Creating Your Own Response Helpers
### `createResponse(mimeType: string, formatter?: Function)`

In order to streamline making your own custom response types, we're sharing the [`createResponse`](/itty-router/api#createResponse) helper we use to make all the response helpers in itty.  To use it, simply pass in the `content-type` header for the MIME-type, and optionally, a body formatter (second argument).

For example, here's how we use it to create the [`json`](/itty-router/api#json) helper.

```js
import { createResponse } from 'itty-router'

const json = createResponse('application/json', JSON.stringify)

json({ foo: 'bar' }) // creates JSON-formatted Response
```

## Downstream Response Formatters
Because each response helper transforms raw data into a valid Response, they can also be used downstream, rather than at the route level.  This allows route code to remain simpler, removing the boilerplate of always transforming data into JSON within each route handler.  Additionally, as all route handlers are awaited, async functions (that eventually return data) are a perfectly valid response if caught and transformed downstream.

### Example

```js
import { json, IttyRouter } from 'itty-router'

const router = IttyRouter()
  .get('/json', (request) => ['bar', 'baz'])

// later when fetching
router
  .fetch(request)
  .then(json) // <-- add the JSON transform downstream
```
