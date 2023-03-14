# <span class="accent">itty</span>-router

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
<!-- 
## Current Size

| import | size | 
| --- | --- |
| full import | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next) |
| createCors | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/createCors&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/createCors) |
| createResponse | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/createResponse&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/createResponse) |
| error | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/error&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/error) |
| html | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/html&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/html) |
| jpeg | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/jpeg&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/jpeg) |
| png | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/png&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/png) |
| Router | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/Router) |
| StatusError | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/StatusError&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/StatusError) |
| text | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/text&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/text) |
| webp | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/webp&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/webp) |
| withContent | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/withContent&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/withContent) |
| withCookies | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/withCookies&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/withCookies) |
| withParams | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/withParams&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/withParams) | -->


<style type="scss">
  img {
    vertical-align: sub;
  }
</style>
