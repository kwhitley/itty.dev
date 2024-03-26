# Routers <Badge type="warning" text="v5" /> 

The itty ecosystem has grown to include three (3) routers, spanning everything from the absolute minimalist OG [`IttyRouter`](/itty-router/routers/ittyrouter)
to the latest batteries-included [`AutoRouter`](/itty-router/routers/autorouter).

## Comparison

| Feature or Option | [**`IttyRouter`**](/itty-router/routers/ittyrouter) | [**`Router`**](/itty-router/routers/router) | [**`AutoRouter`**](/itty-router/routers/autorouter)
| ---:|:---:|:---:|:---:
| **Latest Size** | **~460 bytes** | **~550 bytes** | **~970 bytes** |
| **[Relative Speed](/itty-router/performance/speed#ultra-tuning)** | 🚀🚀🚀 | 🚀🚀 | 🚀🚀 |
| **`base` & nesting** | ✅ | ✅ | ✅ |
| **object passthrough** | ✅ | ✅ | ✅ |
| **`before` stage** (executes before route-matching) | ❌ | ✅ | ✅ |
| **`catch` stage** (catch any thrown errors) | ❌ | ✅ | ✅ |
| **`finally` stage** (executes after everything) | ❌ | ✅ | ✅ |
| **`missing`** (includes 404 handler) | ❌ | ❌ | ✅ |
| **`format`** (response formatter, defaults to `json`) | ❌ | ❌ | ✅ |
| **includes [`withParams`](/itty-router/middleware/withparams)** | ❌ | ❌ | ✅ |


<!-- | **Latest Size** | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/IttyRouter&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/IttyRouter) | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/Router&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/Router) | [![Bundle Size](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-router@next/AutoRouter) | -->
