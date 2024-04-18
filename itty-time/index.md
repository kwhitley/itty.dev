# itty-time

[![Version](https://img.shields.io/npm/v/itty-time.svg?style=flat-square)](https://npmjs.com/package/itty-time)
[![Bundle Size](http://itty.ing/https://deno.bundlejs.com/?q=itty-time&badge&badge-style=flat-square)](http://itty.ing/https://deno.bundlejs.com/?q=itty-time)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-time/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-time?branch=v5.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-time?style=flat-square)](https://npmjs.com/package/itty-time)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

Ultra-small (~450 bytes) library for simplifying date math and TTLs.

---

## Features

- Tiny. The entire library is ~450 bytes, or take only what you need.
- Works anywhere, period.
- Use plain text strings to describe durations.
- Get future dates and TTLs.
- Get human-readable string durations from numeric (ms) durations.

## Comparison to other top-rated libraries
| library | string to ms | ms to string | multi-part | date math | size<sup>1</sup> | relative size<sup>2</sup> | 
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| [itty-time](https://www.npmjs.com/package/itty-time) | ✅ | ✅ | ✅ | ✅ | 450b | 1.05x |
| [@lukeed/ms](https://www.npmjs.com/package/@lukeed/ms)<sup>3</sup> | ✅ | ✅ | ❌ | ❌ | 428b | **1x** |
| [ms](https://www.npmjs.com/package/ms) | ✅ | ❌ | ❌ | ❌ | 938b | 2.04x |
| [pretty-ms](https://www.npmjs.com/package/pretty-ms) | ❌ | ✅ | ✅ | ❌ | 1.04kB | 2.31x |
| [humanize-duration](https://www.npmjs.com/package/humanize-duration) | ❌ | ✅ | ✅ | ❌ | 6.74kB | 15x |

<sup>1: minified and gzipped</sup> &nbsp;
<sup>2: smaller is better</sup> &nbsp;
<sup>3: Luke is superhuman</sup>

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

// handles multi-part inputs :)
ms('3 days, 2.5 hours, and 1 minute') // 268260000
```

## duration
<h4>
  <code>duration(ms: number) => string</code>
</h4>

Of course, we sometimes need to go the other direction.  Want to tell a user how long ago something happened?  How much time they have left?  

You could build it yourself, or import the fantastic [humanize-duration](https://www.npmjs.com/package/humanize-duration) library that inspired this, but at 6.3kB<sup>1</sup>, it's 20x the size of this function (300 bytes).

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
datePlus('2 months, 1 week')

// or from a different date
datePlus('2 months', datePlus('1 week'))
```
