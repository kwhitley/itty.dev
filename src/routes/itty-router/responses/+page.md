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
