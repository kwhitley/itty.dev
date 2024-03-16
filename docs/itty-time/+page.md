<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-time"
  description="A tiny time library for counting the seconds... but using human-readable strings."
  />

<div class="byline">
  A tiny time library for counting the seconds... but using human-readable strings.
</div>

## Seriously?
Yeah, we're totally serious.  Ever get tired of seeing millisecond math your code for expiration TTLs?  You know the blocks, they look like this:

```js
60 * 24 * 30 * 6 // expire in 6 months
```

Yeah?  We do too.

Now you don't have to.  This library has only two primary tasks:

### 1. Getting the number of seconds from a human-readable string duration:
This is useful when creating max-age headers, TTL for cache-expirations, etc.  We literally use this all the time.
```js
getSeconds('1 day, 4 hours, and 36 minutes') // 102960
```

### 2. Adding durations to dates:
Sometimes you need the actual expiration date, not just the TTL (seconds).  This function does that thing.
```js
datePlus('2 months') // 2022-12-23T00:11:58.534Z
```

#### ...or other dates
```js
datePlus('2 months', datePlus('5 months'))
```

#### Ok, we lied... it has one more use: 
### 3. Dividing durations!
This has limited use, we admit - but sometimes you need to create time batches, or figure out how many X in a Y.  The cool thing is, each duration is parsed to the second, allowing complicated durations to be divided by complicated durations. Well, *we* think it's cool anyway!

```js
divide('1 day').by('3 hours') // 8
```

## Example
```js
import { getSeconds, divide, datePlus } from 'itty-time'

// Easily get TTL in seconds
getSeconds('3 hours') // 10800

// Complicated bits?  No problem.  (Oxford comma optional)
getSeconds('1 day, 4 hours, and 36 minutes') // 102960

// Need an expiration date?
datePlus('5 seconds') // 2022-10-22T23:10:11.824Z
datePlus('1 minutes') // 2022-10-22T23:11:06.824Z
datePlus('2 months') // 2022-12-23T00:11:58.534Z
datePlus('4 years') // 2026-10-22T23:11:58.534Z

// Add time to other dates
datePlus('4 years', datePlus('2 years')) // 2028-10-22T23:11:58.534Z

// Want to find out how many X are in Y?
divide('1 week').by('days') // 7
divide('2 minutes').by('seconds') // 120
divide('3 days').by('hours') // 72
divide('1 day').by('3 hours') // 8
divide('1 week').by('seconds') // 604800
divide('24 hours').by('minutes') // 1440
divide('3 days').by('hours') // 72
divide('1 day, 30 minutes').by('hours') // 24.5
```
