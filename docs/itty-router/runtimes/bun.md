#### Runtimes 
# Bun

For standalone, stateful servers, we highly recommend Bun as an alternative to Node.  Given that Bun is a web-standards router, it works automatically with itty.  Leverage the pass-through nature of itty-router options to control the port (or anything else).

```js
import { AutoRouter } from 'itty-router'

const router = AutoRouter({ port: 3001 })

router.get('/', () => 'Success!')

export default router
```
