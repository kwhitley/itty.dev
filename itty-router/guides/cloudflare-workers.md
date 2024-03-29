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
  <p>Currently, there's an issue with <code>wrangler dev</code> that doesn't play nice with our default export. While this doesn't affect production code, it's a pain to develop locally.  We're working with the Cloudflare folks to get this fixed ASAP.</p>

  <p>In the meantime, destructure your root router like this in local dev (also works in production):</p>

  ```ts
  export default { ...router } // this looks pointless, but trust us
  ```
</Badge>
