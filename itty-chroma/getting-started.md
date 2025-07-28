# Getting Started

## Quick Start

**Option 1: Import**
```ts
import { chroma } from 'itty-chroma'
```

**Option 2: Just copy this snippet:**
```js
let t=(e="",o)=>new Proxy((...t)=>{if(!t.length&&!e)return;let r,i=[e],n="%c",l=e.match(/pad|dec/);for(let e of t)e?.zq&&(e=e()),e?.[0]?.startsWith?.("%c")?(r=e[1].match(/pad|dec/),l&&(n=n.slice(0,-1)),l&&!r&&(n+="%c ",i.push("")),n+=e[0],i.push(...e.slice(1)),l=r):(n+="object"==typeof e?"%o ":"%s ",i.push(e));return o?console[o](n.trim(),...i):[n,...i]},{get(r,i){let n=r=>i=>t(e+(r?r+":"+i:i)+";",o);return"color"==i?n(i):"bold"==i?n("font-weight")(i):"italic"==i?n("font-style")(i):"underline"==i?n("text-decoration")(i):"strike"==i?n("text-decoration")("line-through"):"font"==i?n("font-family"):"size"==i?n("font-size"):"bg"==i?n("background"):"radius"==i?n("border-radius"):"padding"==i||"border"==i?n(i):"style"==i?n(""):"log"==i||"warn"==i||"error"==i?t(e,i):n("color")(i)}}),chroma=t();
```
Note: This will lose TypeScript support, but is great for adding to your browser console (via script extensions, etc).

## Basic Usage

```ts
// Simple styling
chroma.red.log('This will be red.')

// Compose complex styles
chroma.log(
  chroma.green.bold,
  'Green and bold',
  chroma.blue.underline,
  'Now blue with underline'
)

// Create reusable loggers
const warn = chroma.orange.bold.log
warn('Warning message!')
```

## Next Steps

- [API Reference](./api) - Complete method documentation
- [Examples](./examples) - Real-world usage examples