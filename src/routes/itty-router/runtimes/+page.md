## Runtimes
Itty follows the Fetch API, and thus fits natively with any Web Standards server (e.g. Bun, Cloudflare Workers, Service Workers).  That said, with a little effort, itty is compatible with virtually any modern runtime.

- [Bun](#Bun)
- [Node](#Node)
- [Cloudflare Workers](#Cloudflare%20Workers)

## Bun <a name="Bun"></a>
```js
import { error, json, Router } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .all('*', () => error(404))

export default {
  port: 3001,
  fetch: (request, env, ctx) => router
                                  .handle(request, env, ctx)
                                  .then(json)
                                  .catch(error)
}

```

## Cloudflare Workers <a name="Cloudflare Workers"></a>
```js
import { error, json, Router } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .all('*', () => error(404))

export default {
  fetch: (request, env, ctx) => router
                                  .handle(request, env, ctx)
                                  .then(json)
                                  .catch(error)
}
```

## Node <a name="Node"></a>
```js
import 'isomorphic-fetch'
import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'http'
import { error, json, Router } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .all('*', () => error(404))

// create a @whatwg-node/server
const ittyServer = createServerAdapter(
  (request, env, ctx) => router
                          .handle(request, env, ctx)
                          .then(json)
                          .catch(error)
)

// Then use it in any environment
const httpServer = createServer(ittyServer)
httpServer.listen(3001)
```
