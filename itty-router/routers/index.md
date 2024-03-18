# Routers

The itty ecosystem has grown to include three (3) routers, spanning everything from the absolute minimalist OG [`IttyRouter`](/itty-router/routers/ittyrouter)
to the latest batteries-included [`AutoRouter`](/itty-router/routers/autorouter).

## Comparison

| Feature or Option | [**`IttyRouter`**](/itty-router/routers/ittyrouter) | [**`Router`**](/itty-router/routers/router) | [**`AutoRouter`**](/itty-router/routers/autorouter)
| ---:|:---:|:---:|:---:
| **Size** | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/IttyRouter&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/IttyRouter) | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/Router) | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter) |
| **`base` & nesting** | ✅ | ✅ | ✅ |
| **object passthrough** | ✅ | ✅ | ✅ |
| **`before` stage** | ❌ | ✅ | ✅ |
| **`after` stage** | ❌ | ✅ | ✅ |
| **`catch` stage** | ❌ | ✅ | ✅ |
| **`missing`** (default 404 handler) | ❌ | ❌ | ✅ |
| **`format`** (default response formatter) | ❌ | ❌ | ✅ |
| **includes `withParams`** | ❌ | ❌ | ✅ |

