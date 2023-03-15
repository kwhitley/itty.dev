## Performance

By their nature, virtually *all* modern routers are extremely performant, and itty-router is no different.  Some (arguably less-flexible) routers avoid internal matching loops in favor of lookup tables and trees, and are thus able to achieve higher ops/sec than a linear loop-based router such as itty, but depending on your environment... that may not matter at all.

For instance, in a traditional instanced microservice, where *all* web-traffic flows through a single router - ops/sec *does* matter.  In this particular situation, the router may eventually become the bottleneck, however unlikely (typically the slowdowns occur elsewhere).

However, in a serverless environment - especially one that employs edge functions, the natural horizontal scaling of this setup means each edge function executes either in isolation, or with load-balanced traffic.  Basically, your traffic is flowing through many straws as opposed to one single straw. 

So what does this mean?  This means that as long as your route-matching adds ~0ms of overhead (**spoiler**: they all do), it doesn't *really* matter exactly how close to zero that number is.  Your API Responses simply won't feel or experience any measurable difference.

> Pick the router that fits your vibe, syntax preference, or anything - but don't stress the performance side of it. You won't feel the difference. <cite>Probably Someone, Somewhere</cite>

## Tuning

With that caveat in mind, here are a few ways to optimize your API for performance:

- **Register performance-critical paths first** - Simply registering performance-critical paths ahead of others gives them a chance to match and exit the router faster than other downstream routers.

- **Nest your API** - The very nature of nesting an API prevents entire branches from being compared.  By dividing your router into chunks (as many levels as you like), *you* control the ballance between readability/maintainability and performance. Personally, we think a well-nested API is great for loads of reasons.

That's it!
