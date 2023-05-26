<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Tree-Shaking"
  description="Getting down to the smallest bundlesize possible.  Is it necessary?  Not really.  But here's how!"
  />

## Tree-Shaking
Following the v4.x release, itty-router is no longer "just" the Router function.  For convenience and a better DX, we've wrapped the "extras" from **itty-router-extras**, and the CORS handling of **itty-cors** into the core library.  As a result of this, the reported bundle size for the entire library is a bit inflated from previous numbers.  If tree-saking is a concern, or you would like to build upon *just* the Router for instance, tree-shaking is your solution.

With v4.x, all exposed exports can be accessed from the top-level import OR namespaced by target function. Depending on your combination, one or the other may be preferable.  See example below.

```js
// top-level import
import { Router, json } from 'itty-router' // 957B (603B zipped)

// tree-shaking
import { Router } from 'itty-router/Router' // 637B (430B zipped)
import { json } from 'itty-router/json' // 253B (204B zipped)
```

<style type="scss">
  img {
    vertical-align: sub;
  }
</style>
