<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Runtimes & Environment Support"
  description="Examples of using itty in various runtimes, including Cloudflare Workers, Bun, and Node."
  />

## Runtimes & Framework Support
Itty follows the Fetch API, and thus fits natively with any Web Standards server (e.g. Bun, Cloudflare Workers, Service Workers).  That said, with a little effort, itty is compatible with virtually any modern runtime.

- [Cloudflare Workers](#Cloudflare%20Workers)
- [Bun](#Bun)
- [Node](#Node)


## Cloudflare Workers <a name="Cloudflare Workers"></a>

This is where it all began!
```js
import { error, json, Router } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .all('*', () => error(404))

export default {
  fetch: (req, ...args) => router
                            .handle(req, ...args)
                            .then(json)
                            .catch(error)
}
```

## Bun <a name="Bun"></a>

Needless to say, the [Bun](https://bun.sh) runtime, with its Web Standards support, is a fantastic pairing for itty!
```js
import { error, json, Router } from 'itty-router'

const router = Router()

router
  .get('/', () => 'Success!')
  .all('*', () => error(404))

export default {
  port: 3001,
  fetch: (request) => router
                        .handle(request)
                        .then(json)
                        .catch(error)
}

```

## Node <a name="Node"></a>

The aging Node.js runtime takes a bit more work compared to more modern enviornments, but thanks to the nice [@whatwg-node/server](https://www.npmjs.com/package/@whatwg-node/server) adapter, this is still easily hooked up.
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
