<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-router"
  subtitle="Performance Tuning"
  description="A few notes on performance/tuning within itty-router."
  />

## Performance

By their nature, virtually *all* modern routers are extremely performant, and itty-router is no different.  Some routers avoid internal matching loops in favor of lookup tables and trees, and are thus able to achieve higher ops/sec than a linear loop-based router such as itty, but depending on your environment... that may not matter at all.  

## Why did itty choose an internal loop?

We've opted for a loop for the sheer flexibility/predictability of it - allowing *you* to maintain 100% control of what matches first, simply by the ordering of the routes.  

This means that your request may be tested several times before a match.  This sounds slow on paper, but isn't really in practice - because a typical (serverless) router isn't processing many thousands of requests/sec - it's processing between one and a handful.  Other edges/workers are handling others in parallel.

This makes each route match effectively a ~0ms operation (e.g. 100,000 ops/sec = 0.01ms, or 10 microseconds per operation), and one that's not really blocking other simultaneous operations.  Benchmarks provided by other router libraries will confirm as such.  They *all* perform at ~0ms, meaning no one will ever feel the difference, unless you're running massive traffic through a single node, all at once (e.g. not serverless at all).

> Pick the router that fits your vibe, syntax preference, or anything - but don't stress the performance side of it. You won't feel the difference. <cite>Probably Someone, Somewhere</cite>

## How can I optimize itty for speed?

This is where that linear loop pays itself back! Instead of having to understand how we prioritize route matching (we don't), you control that yourself!  Have a few public routes that need to be as fast as possible and account for the bulk of your traffic?  Put them first!  Have some edge cases?  Put them last!

Here are the basic rules to performance tuning in itty:

- **Register performance-critical paths first** - Simply registering performance-critical paths ahead of others gives them a chance to match and exit the router faster than other downstream routers.

- **Nest your API** - The very nature of nesting an API prevents entire branches from being compared.  By dividing your router into chunks (as many levels as you like), *you* control the ballance between readability/maintainability and performance. Personally, we think a well-nested API is great for loads of reasons.

That's it!
