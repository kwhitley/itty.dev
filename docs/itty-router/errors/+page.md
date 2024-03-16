<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Error Handling"
  description="Complete guide to error handling within itty-router."
  />

## Handling Errors
Errors in itty are pretty simple, using either `error` or `StatusError`, depending on your use case.


### Creating an Error Response
### `error(code: number, body?: string | object): Response`
### `error(error: Error | StatusError): Response`

To return a complete error Response, use the `error` helper.  As itty-router Request matching stops at the first return, returning this function from a route (which in turn, returns a Response) will stop the route matching and return the error in the outermost router.

```js
import { error } from 'itty-router'

// simple 404
error(404)

// custom 404
error(404, 'Are you sure about that?')
```

### Throwing Errors
### `throw new StatusError(statusCode?: number, message?: string | object)`
To throw an error (with a status code) anywhere in your application, simply throw a new `StatusError`.  Downstream handlers (e.g. in the outermost `router.handle(request).catch()` block) can then turn this into a valid Response.

```js
import { StatusError } from 'itty-router'

// throwing a simple 400
throw new StatusError(400)

// throwing a a custom 400
throw new StatusError(400, 'You must provide an ID for this request.')
```

The `error(code: number, body?: any): Response` Response helper returns a JSON Response with the status code and error.  If passed an `Error` or `StatusError` (for example, when using `error` as a downstream handler), it will generate an error Response based on that error.

## Custom Error Messages
By default, the standard error message (400, 401, 403, 404, 500) include industry-standard messages within the payload.  For instance, `error(404)` creates the following 404 Response:

```json
{
  "status": 404,
  "error": "Not Found",
}
```

To modify this, simply pass an optional message to `error`. For example:

```js
error(400, 'You appear to be missing something')
```

Returns this 400 Response:
```json
{
  "status": 400,
  "error": "You appear to missing something",
}
```

## Examples
The following examples demonstrate a few of the possible error scenarios you may run into while using itty-router:

```js
import { error, Router } from 'itty-router'

const router = Router()

router
  // returning an error directly
  .get('/error-response', () => error(400))

  // manual throwing
  .get('/manual-throw', () => {
    const ids = [1, 2, 3]

    ids.forEach(id => {
      if (id > 2) {
        // This works even when a return (error) would not.
        throw new StatusError(400, 'Yikes!')
      }
    })
  })

  // automatic throwing (will throw a standard Error)
  .get('/auto-throw',
    (request) => request.a.b.c.d
  )

  // standard 404 pattern for your outermost router
  .all('*', () => error(404))

export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)

                              // both thrown Errors will be caught
                              // and transformed by this handler
                              .catch(error)
}
```
