# <span class="accent">itty</span>-router

## Handling Errors
Errors in itty are pretty simple.  Either return an error Response using `error(code: number, message: string | object): Response` from your routes, or simple throw an `Error` or `StatusError`, and catch it using a `.catch()` block after handling a request.

`StatusError` throws are just like any other Error, but embed a required HTTP status code for downstream use.  Do note, that by throwing *any* type of Error, you'll need to `.catch()` it downstream after `router.handle()` calls.

```js
import { StatusError } from 'itty-router'

// example throwing a 400 error
throw new StatusError(400, 'calls to getUser(id: number) require an ID')
```

The `error(code: number, body?: any): Response` Response helper returns a JSON Response with the status code and error.  If passed an `Error` or `StatusError` (for example, when using `error` as a downstream handler), it will generate an error Response based on that error.

For example, the following call to error:
```js
error(400, 'You appear to be missing something')
```

Returns a 400 Response with the following payload:
```json
{
  "status": 400,
  "error": "You appear to missing something",
}
```

## Examples
```js
import { error, Router } from 'itty-router'

const router = Router()

router
  // returning an error directly
  .get('/error-response', () => error(400, 'You seem to be missing something.'))

  // manual throwing
  .get('/manual-throw', () => {
    const ids = [1, 2, 3]

    ids.forEach(id => {
      if (id > 2) {
        throw new StatusError(400, 'This works even when a return (error) may not be appropriate.')
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
