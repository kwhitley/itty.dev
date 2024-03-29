#### Runtimes
# <u>Runtimes ></u> Next.js <u>- itty-router</u>

To integrate itty router openapi with Next.js, you can create a custom API route that captures all requests. For instance, you might have a route like app/api/gpt/[slug].ts.

In Next.js 14, to intercept GET and POST requests and pass them to itty router, you need to set up your API routes to forward these requests to therouter. This can be done by returning router.fetch(req) within your API route handlers.

```ts
import { AutoRouter, withContent } from 'itty-router'

const router = AutoRouter()

router
  .get('/', () => 'Success!')
  .post('/', withContent, ({ content }) => ({
    success: true,
    postedContent: content,
  }))

export const GET = router.fetch
export const POST = router.fetch
```
