# TypeScript <Badge type="warning" text="updated in v5" />

Typing with routers, where middleware can naturally affect not only the same handler, but downstream handlers... is hard.

That said, we've tried to make it all easy for you to extend request types, add support for your own properties, environment variables, etc.

We've broken things down into the simple categories of:

1. [Request Types](./request-types)  
  This just describes the core request types that everything extends throughout the router.  Start here.

1. [Routes & Routers](./routes)  
  Typing routes (and entire routers) using generics.

1. [Request handlers & Middleware](./request-handlers)  
  Typing... you guessed it, request handlers and middleware arguments.

1. [Response Handlers](./response-handlers)  
  For all your downstream response-handler needs, as used in the `finally` stage of [`AutoRouter`](/itty-router/routers/autorouter) and [`Router`](/itty-router/routersrouter).

1. [Additional Arguments](./additional-arguments)  
  For when you need to type anything beyond the `request` in handlers.  For example, handling the environment and `ExecutionContext` in [Cloudflare Workers](https://developers.cloudflare.com/workers/).

1. [API](./api)  
  The complete TypeScript API. \***bows**\*




