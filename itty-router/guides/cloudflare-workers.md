#### Runtimes
# <u>Runtimes ></u> Cloudflare Workers <u>- itty-router</u>

Itty-router was originally designed for Cloudflare Workers, and remains its optimization target to this day.

```js
import { AutoRouter } from 'itty-router'

const router = AutoRouter()

router.get('/', () => 'Success!')

export default router // see note below
```

<Badge type="danger">
  <p>Currently, there's a <a href="https://github.com/cloudflare/workers-sdk/issues/5420">bug in Wrangler</a> that affects local development using `wrangler dev` when trying to export the router directly.  We're working with the Cloudflare folks to get this fixed ASAP.</p>

  <p>In the meantime, destructure your root router like this to avoid the issue:</p>

  ```ts
  export default { ...router } // this looks pointless, but trust us
  ```
</Badge>
