#### Routers
# IttyRouter <Badge type="warning" text="new in version 4.3+" />

### ~450 bytes

This is the original router; the smallest and least-feature rich one.  It will naturally have the highest performance simply from the lack of `before`, `onError`, and `after` stages introduced in [`Router`](/docs/itty-router/routers/router).  That said, to modify the response after a call to `router.fetch` requires tapping into the `.then()` blocks (see example).

## Example
```ts
import { IttyRouter, error, json, withParams } from 'itty-router'

const router = IttyRouter()

router
  .all('*', withParams)
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
  .all('*', () => error(404))

export default {
  fetch: (request, ...args) => 
    router
      .fetch(request, ...args)
      .then(json)
      .catch(error)
}
```

## API
Router ()
