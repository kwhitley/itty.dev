# welcome to <span class="accent">it<strike>t</strike>y</span>

This all started as a fun code-golfing experiment ([itty-router](https://npmjs.com/package/itty-router)), attempting to make a tiny, elegant micro-router for use in service workers, specifically the incredibly powerful/lightweight [Cloudflare Workers](https://workers.cloudflare.com/).  By 2022, this tiny router has become one of the mainstays of serverless routing within the Cloudflare Workers community.

This path has continued on to handle both API generation (including [response handling](https://npmjs.com/package/itty-router-extras) and [CORS](https://npmjs.com/package/itty-cors)) and API [consumption/interaction](https://npmjs.com/package/itty-fetcher).  Each library typically rests in the ~500 byte range, to keep both your code *and* your bundle sizes down.

👇 **current itty packages on NPM**

[![itty-router](https://img.shields.io/npm/dw/itty-router?style=for-the-badge&logo=npm&color=ded&label=itty-router)](https://npmjs.com/package/itty-router)
- Simplifies API design, routing and request-handling.  Specifically designed for serverless or Serive Worker applications, this is often used within Cloudflare Workers, but can actually be used to execute/return *any* code based on URL routing.  All this power in about 550 bytes, as you'd expect from an itty library.

[![itty-router-extras](https://img.shields.io/npm/dw/itty-router-extras?style=for-the-badge&logo=npm&color=ded&label=itty-router-extras)](https://npmjs.com/package/itty-router-extras)
- The minimalist itty-router was never really intended to be used without a few quality of life additions, namely body parsing, cookie handling, response helpers, etc.  These are on their way into itty-router core as you read this!

[![itty-cors](https://img.shields.io/npm/dw/itty-cors?style=for-the-badge&logo=npm&color=ded&label=itty-cors)](https://npmjs.com/package/itty-cors)
- Because CORS is a pain, and we still have to deal with it.  This little library gives you a simple drop-in solution.

[![itty-time](https://img.shields.io/npm/dw/itty-time?style=for-the-badge&logo=npm&color=ded&label=itty-time)](https://npmjs.com/package/itty-time)
- So you've written an API but need to do things like calculate max-age, expirations, etc.  This library does all that for you, allowing you to write things like "1 week, 2 days, and 4 hours" instead of... 1000 \* 60 \* 60 \* 24 \* 7 + 1000 \* 60 \* 60 \* 24 \* 2 + 1000 \* 60 \* 60... well, you get the point.  All this is done in about 500 bytes.

[![itty-fetcher](https://img.shields.io/npm/dw/itty-fetcher?style=for-the-badge&logo=npm&color=ded&label=itty-fetcher)](https://npmjs.com/package/itty-fetcher)
- At some point, you'll need to talk to these APIs you've written.  This simplifies that process, leaving your code short and beautiful, while only costing you around 600 bytes.

[![itty-durable](https://img.shields.io/npm/dw/itty-durable?style=for-the-badge&logo=npm&color=ded&label=itty-durable)](https://npmjs.com/package/itty-durable)
- A bit of an experiemental package, yet one I use in production all the time.  This takes the incredibly powerful [Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects/) (thanks, Cloudflare!), but gives it a MUCH improved interface for simple tasks.  This library removes nearly every bit of the boilerplate when working with DOs, leaving your code tiny, readable, and powerful.

## and... itty, the company?

Stay tuned! [Follow me on Twitter](https://twitter.com/kevinrwhitley) for updates as I launch off into the world of accelerators and funding!

<style lang="scss">
  img {
    width: auto;
  }
</style>
