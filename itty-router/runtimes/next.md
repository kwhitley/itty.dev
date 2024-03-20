#### Runtimes
# Next.js

To integrate itty router openapi with Next.js, you can create a custom API route that captures all requests. For instance, you might have a route like app/api/gpt/[slug].ts.

In Next.js 14, to intercept GET and POST requests and pass them to itty router, you need to set up your API routes to forward these requests to therouter. This can be done by returning router.handle(req) within your API route handlers.

```ts
import { Router } from 'itty-router'

const router = Router()

router.get('/', () => 'Success!')
router.all('*', () => new Response('404 Not Found...', { status: 200 }))

export async function POST(req) {
  return router.handle(req)
}

export async function GET(req) {
  return router.handle(req)
}
```
