---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "<em>itty</em>.dev"
  text: "mighty [tiny] libraries"
  tagline: <span>We count our bytes to <span class="accent">keep your code small.</span><span>
  image:
    src: /itty-square.256.png
    alt: itty.dev
  actions:
    - theme: alt
      text: Explore the libraries
      link: /docs
    - theme: brand
      text: or jump straight to Itty Router
      link: /itty-router/getting-started

# features:
#   - icon: 🚀
#     title: Uses Modern Web Standards
#     details: Itty is based on modern web standards, as used in many edge runtimes, service workers, and the browser itself.
  # - icon: 🤑
  #   title: Spend Less.
  #   details: Decrease your spend on infrastructure and maintenance, not to mention the engineering talent to keep them running.
  # - icon: 🌏
  #   title: Works Everywhere.
  #   details:  Our realtime rooms open automatically near the apps calling them.  Anywhere in the world.
  # - icon: 📈
  #   title: No Limits.
  #   details: Need a few million socket servers?  No problem.  We scale infinitely. Now you can too.

---

<!-- # Test -->

We really mean it. For example...

## An edge-ready API in ~1 kB:

```ts [Cloudflare Workers or Bun]
import { AutoRouter } from 'itty-router' // ~970 bytes

export const router = AutoRouter()

router
  .get('/hello/:name', ({ name = 'World' }) => `Hello ${name}!`)
  .get('/json', () => [1,2,3])
  .get('/promises', () => Promise.resolve('foo'))

export default router
```

## Clean API calls in ~650 bytes:

```ts [Browser, Node, Bun, Workers]
import { fetcher } from 'itty-fetcher' // ~650 bytes

// Create a reusable API client
const api = fetcher('https://api.example.com', {
  headers: { 'Authorization': 'Bearer token' }
})

// Clean, readable API calls
const users = await api.get('/users')
const newUser = await api.post('/users', { name: 'Alice' })

// Automatic JSON parsing, error throwing, and more!
```
