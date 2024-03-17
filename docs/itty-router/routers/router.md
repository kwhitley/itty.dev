# Router

### ~550 bytes

This is the original router; the smallest and least-feature rich one.  It will naturally have the highest performance simply from the lack of `before`, `onError`, and `after` stages introduced in [`Router`](/docs/routers/router).  That said, to modify the response after a call to `router.fetch` requires tapping into the `.then()` blocks (see example).

## Example
```ts
import { Router, error, json, withParams } from 'itty-router'

const router = Router({
  before: [withParams],
  onError: [error],
  after: [json],
})

router
  .get('/text', () => text('Hey there!'))
  .get('/json', () => ({ foo: 'bar', array: [1,2,3] }))
  .get('/params/:id', ({ id }) => id)
  .all('*', () => error(404))

export default router
```
