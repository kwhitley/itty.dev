#### Runtimes
# <u>Runtimes ></u> Cloudflare Workers <u>- itty-router</u>

Itty-router was originally designed for Cloudflare Workers, and remains its optimization target to this day.

```js
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router.get('/', () => 'Success!')

export default router // see note below
```

It's also possible to [setup proper types for the Worker environment and execution context](/itty-router/typescript/additional-arguments#typed-example-assumes-cloudflare-workers).
