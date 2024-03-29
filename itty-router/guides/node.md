#### Runtimes
# <u>Runtimes -</u> Node.js <u>- itty-router</u>

The aging Node.js runtime takes a bit more work compared to more modern enviornments, but thanks to the nice [@whatwg-node/server](https://www.npmjs.com/package/@whatwg-node/server) adapter, this is still easily hooked up.

```js
import { createServerAdapter } from '@whatwg-node/server'
import { createServer } from 'http'
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router.get('/', () => 'Success!')

// create a @whatwg-node/server
const ittyServer = createServerAdapter(router.fetch)

// Then use it in any environment
const httpServer = createServer(ittyServer)
httpServer.listen(3001)
```
