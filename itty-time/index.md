# itty-time

[![Version](https://img.shields.io/npm/v/itty-time.svg?style=flat-square)](https://npmjs.com/package/itty-time)
[![Bundle Size](http://itty.ing/https://deno.bundlejs.com/?q=itty-time&badge&badge-style=flat-square)](http://itty.ing/https://deno.bundlejs.com/?q=itty-time)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-time/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-time?branch=v5.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-time?style=flat-square)](https://npmjs.com/package/itty-time)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

Ultra-small (~460 bytes) library for simplifying date math and TTLs.

---

## Features

- Tiny. The entire library is ~460 bytes, or take only what you need.
- Works anywhere, period.
- Use plain text strings to describe durations.
- Get future dates and TTLs.
- Get human-readable string durations from numeric (ms) durations.
- Fully Typed/TypeScript support.
- [100% Test Coverage](https://coveralls.io/github/kwhitley/itty-time?branch=v1.x). Bulletproof for production peace-of-mind.

## toSeconds/toMs
<h4>
  <code>toSeconds(duration: string) => number</code><br />
  <code>toMs(duration: string) => number</code><br />
</h4>

TTL math is a maintenance nightmare. It's a pain to write, a pain to read, and when you update the math later, you'll probably forget to update the comment, causing all sorts of mayhem.

```ts
const TTL = 2 * 7 * 24 * 60 * 60 * 1000 // 2 weeks, right?
```

Here's a better way.

```ts
import { toMs, toSeconds } from 'itty-time'

// to seconds
toSeconds('2 weeks')

// to milliseconds
toMs('2 weeks')

// handles elaborate inputs :)
toMs('3 days, 2.5 hours, and 1 minute')
```

## toDuration
<h4>
  <code>toDuration(ms: number) => string</code>
</h4>

Of course, we sometimes need to go the other direction.  Want to tell a user how long ago something happened?  How much time they have left?  

You could build it yourself, or import the fantastic [humanize-duration](https://www.npmjs.com/package/humanize-duration) library that inspired this, but at 6.3kB<sup>1</sup>, it's 20x the size of this function (300 bytes).

<sup>1: of course [humanize-duration](https://www.npmjs.com/package/humanize-duration) can also do much, much more.</sup>

```ts
import { toDuration } from 'itty-time'

// string durations
toDuration(1 * 60 * 60 * 1000 + 2.5 * 60 * 1000)
// "1 hour, 2 minutes, 30 seconds"

// limit number of segments
toDuration(1 * 60 * 60 * 1000 + 2.5 * 60 * 1000, { parts: 2 })
// "1 hour, 2 minutes"

// change the delimiter
toDuration(1 * 60 * 60 * 1000 + 2.5 * 60 * 1000, { join: '|' })
// "1 hour|2 minutes|30 seconds"

// or get the raw components
toDuration(1 * 60 * 60 * 1000 + 2.5 * 60 * 1000, { join: false })
// [['hour', 1],['minutes', 2],['seconds', 30]]
```

## datePlus
<h4>
  <code>datePlus(duration: string, from = new Date) => Date</code>
</h4>

Sometimes you need a TTL for some point in the future, but sometimes you need the actual date.  You could convert it all yourself... or use this.

```js
import { datePlus } from 'itty-time'

// from right now
datePlus('2 months, 1 week') // 2024-12-23T00:11:58.534Z

// or from a different date
datePlus('2 months', datePlus('1 week')) // 2024-12-23T00:11:58.534Z
```
