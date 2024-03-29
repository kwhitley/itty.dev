#### Runtimes 
# <u>Runtimes -</u> Bun <u>- itty-router</u>

For standalone, stateful servers, we highly recommend [Bun](https://bun.sh) as an alternative to Node.  Given that [Bun](https://bun.sh)'s server uses Web Standards, it works automatically with itty.  

Leverage the pass-through nature of itty-router options to control the port (or anything else).

```js
import { AutoRouter } from 'itty-router'

const router = AutoRouter({ port: 3001 })

router.get('/', () => 'Success!')

export default router
```
