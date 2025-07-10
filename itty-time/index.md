# itty-time

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-time)
[![Version](https://img.shields.io/npm/v/itty-time.svg?style=flat-square)](https://npmjs.com/package/itty-time)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-time&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-time)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-time/v1.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-time?branch=v1.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-time?style=flat-square)](https://npmjs.com/package/itty-time)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

Ultra-small (~390 bytes) library for TTL date math and converting ms durations to and from strings.

## Features

- Tiny. The entire library is ~390 bytes, or take only what you need.
- Convert string durations to ms/seconds.
- Convert ms to human-readable string durations.
- Add durations to dates.

## Comparison to other top-rated libraries
| library | string to ms | ms to string | date math | size<sup>1</sup>
| --- | :-: | :-: | :-: | :-: |
| [itty-time](https://www.npmjs.com/package/itty-time) | ✅ | ✅ | ✅ | 386b |
| [@lukeed/ms](https://www.npmjs.com/package/@lukeed/ms) | ✅ | ✅ | ❌ | 435b |
| [ms](https://www.npmjs.com/package/ms) | ✅ | ❌ | ❌ | 938b |
| [pretty-ms](https://www.npmjs.com/package/pretty-ms) | ❌ | ✅ | ❌ | 1.04kB |
| [humanize-duration](https://www.npmjs.com/package/humanize-duration) | ❌ | ✅ | ❌ | 6.74kB |

<sup>1: minified and gzipped</sup> &nbsp;

## Performance

The only function most folks care about in terms of raw performance is string to ms conversion.  In this, itty stacks up pretty well, being significantly faster than [ms](https://www.npmjs.com/package/ms), but falling to the insanely-optimized [@lukeed/ms](https://www.npmjs.com/package/@lukeed/ms).

![image](https://github.com/kwhitley/itty-time/assets/865416/71170005-7962-4bc8-9a66-f4ad5713e545)

Moral of the story, probably don't use [ms](https://www.npmjs.com/package/ms).

Use Luke's if you want the absolute fastest parsing, or itty if you want some of the other functions as well.  If you're byte-counting, itty wins again, but if you're byte-counting that hard, you're probably better off with raw ms math if you can stomach it.

---

## seconds/ms
<h4>
  <code>seconds(duration: string) => number</code><br />
  <code>ms(duration: string) => number</code><br />
</h4>

TTL math is a maintenance nightmare. It's a pain to write, a pain to read, and when you update the math later, you'll probably forget to update the comment, causing all sorts of mayhem.

```ts
const TTL = 2 * 7 * 24 * 60 * 60 * 1000 // 2 weeks, right?
```

Here's a better way.

```ts
import { ms, seconds } from 'itty-time'

// to seconds
seconds('2 weeks') // 1209600

// to milliseconds
ms('2 weeks') // 1209600000
```

## duration
<h4>
  <code>duration(ms: number) => string</code>
</h4>

Of course, we sometimes need to go the other direction.  Want to tell a user how long ago something happened?  How much time they have left?

You could build it yourself, or import the fantastic [humanize-duration](https://www.npmjs.com/package/humanize-duration) library that inspired this, but at 6.3kB<sup>1</sup>, it's over 20x the size of this 280 byte function.

<sup>1: of course [humanize-duration](https://www.npmjs.com/package/humanize-duration) can also do much, much more.</sup>

```ts
import { duration } from 'itty-time'

duration(3750000)
// "1 hour, 2 minutes, 30 seconds"

// limit number of segments returned
duration(3750000, { parts: 2 })
// "1 hour, 2 minutes"

// change the delimiter
duration(3750000, { join: ' --> ' })
// "1 hour --> 2 minutes --> 30 seconds"

// or get the raw components
duration(3750000, { join: false })
/*
  [
    ['hour', 1],
    ['minutes', 2],
    ['seconds', 30]
  ]
/*
```

## datePlus
<h4>
  <code>datePlus(duration: string, from = new Date) => Date</code>
</h4>

Sometimes you need a TTL for some point in the future, but sometimes you need the actual date.  You could convert it all yourself... or use this.

```js
import { datePlus } from 'itty-time'

// from right now
datePlus('2 months')

// or from a different date
datePlus('2 months', datePlus('1 week'))
```
