---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "<em>itty</em>.dev"
  text: "mighty [tiny] libraries"
  tagline: <span>We count <em>our</em> bytes to <span class="accent">keep</span> <span class="accent"><em>your</em> code small.</span><span>
  image:
    src: /itty-square.256.png
    alt: itty.dev
  actions:
    - theme: alt
      text: Explore the Docs
      link: /docs
    - theme: brand
      text: Get Started
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
