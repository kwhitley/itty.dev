# Runtimes

## Cloudflare Workers

Itty-router was originally designed for Cloudflare Workers, and remains its optimization target to this day. 
Our recommended path is the [`AutoRouter`](/docs/itty-router/api#autorouter).

```js
import { AutoRouter } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .get('/json', () => [1,2,3])

export default router
```
