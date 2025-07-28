---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "<em>itty</em>.dev"
  text: "mighty [tiny] libraries"
  tagline: <span>Ultra-small, powerful tools for modern web development. <span class="accent">Every byte counts.</span><span>
  image:
    src: /itty-square.256.png
    alt: itty.dev
  actions:
    - theme: brand
      text: Explore The Libraries
      link: /docs

features:
  - icon: 🌿
    title: itty-router
    details: Full-featured serverless API microrouter. From 450 bytes to 1kB depending on features needed.
    link: /itty-router/
    linkText: Deliver Tiny APIs
  - icon: 🎾
    title: itty-fetcher
    details: Native fetch wrapper with automatic JSON parsing and error handling. Ultra-clean API calls in 650 bytes.
    link: /itty-fetcher/
    linkText: Fetch Data
  - icon: 📦
    title: itty-packager
    details: Zero-config CLI for building, linting, and releasing TypeScript packages with modern tooling.
    link: /itty-packager/
    linkText: Ship Packages
  - icon: 🎨
    title: itty-chroma
    details: Powerful browser console styling in under 500 bytes. Make your logs beautiful and organized.
    link: /itty-chroma/
    linkText: Style Your Logs
  - icon: ⚡
    title: itty-sockets
    details: Dead-simple realtime messaging with no backend required. Currently in early access.
    link: https://ittysockets.io
    linkText: Add Realtime
  - icon: ⏰
    title: itty-time
    details: Faster and smaller than the official <b><code>ms</code></b> library.  In fact, we added ms to durations and date math and are <em>still</em> 3x smaller.
    link: /itty-time/
    linkText: Do Time Math

---

## The Itty Philosophy

**Every byte matters.** Whether you're building for serverless functions, browser clients, or edge workers, bundle size directly impacts performance, costs, and user experience.

Each itty library is designed to:

### 1. Simplify your code and effort
While many developers are fine with memorizing established patterns, we like to ask ourselves "what are we really trying to accomplish here?" And then we do that thing, cutting out the extra steps.

### 2. **Be intuitive, obvious, and readable**
Smaller code is more readable code.  Extra symbols and syntax get in the way of your intent.  Plus we just want to make using our libs *feel* good.

### 3. **Be as close to zero-cost (bytes) as possible**
We all feel the shared pain of ignoring bundlesize.  Web sites load more slowly, API requests take longer, and your build pipelines take longer.  From every useless file in your node_modules, to every byte served to a client, it all adds up.

We take this one seriously.

## [Get Started →](/docs)