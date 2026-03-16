# itty-sockets

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-sockets)
[![Version](https://img.shields.io/npm/v/itty-sockets.svg?style=flat-square)](https://npmjs.com/package/itty-sockets)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-sockets&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-sockets)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-sockets/v0.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-sockets?branch=v0.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-sockets?style=flat-square)](https://npmjs.com/package/itty-sockets)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

## Type-safe WebSocket routing in 540 bytes

## Features ✨
1. **Quality of Life Improvements (over native WebSocket)**
   - auto JSON handling
   - top-level payload access (`text` instead of `e.data.text`)
   - easy reconnections
   - message queuing eliminates race conditions
   - chainable API
1. **Powerful Routing**
   - all messages - `.on('message', data => console.log(data))`
   - custom types - `.on('chat', ({ text }) => console.log(text))`
   - custom filters - `.on(isOver20, ({ value }) => console.log(value))`
1. **Type-safety**
   - `.on<Chat>('chat', ({ text }) => console.log(text))`
   - `.send<Chat>({ type: 'chat', text: 'hello' })`
1. **Works with any JSON-based WebSocket server**
1. **Tiny footprint** - 540 bytes is smaller than most WebSocket boilerplate

## Basic Example
```ts
import { connect } from 'itty-sockets'

const ws = connect('wss://example.com')

ws
  .on('message', e => console.log(e.message))
  .send('hey!')
  .send({ foo: 'bar' })
```

## Quick Start

**Option 1: Import**
```ts
import { connect } from 'itty-sockets'
```

**Option 2: Just copy this snippet:**
```js
let connect=(e,s={})=>{let t,a=0,n=[],p=[],o={},l=()=>(t||(t=new WebSocket((/^wss?:/.test(e)?e:"wss://ittysockets.io/c/"+e)+"?"+new URLSearchParams(s)),t.onmessage=(e,s=JSON.parse(e.data),t=s?.message,a={...null==t?.[0]&&t,...s,...s.date&&{date:new Date(s.date)}})=>{o[s?.type??t?.type]?.map(e=>e(a)),s?.type||o.message?.map(e=>e(a)),p.map(([e,s])=>e(a)&&s(a))},t.onopen=()=>(n.splice(0).map(e=>t?.send(e)),o.open?.map(e=>e()),a&&t?.close()),t.onclose=()=>(a=0,t=null,o.close?.map(e=>e()))),c),c=new Proxy(l,{get:(e,s)=>({open:l,close:()=>(1==t?.readyState?t.close():a=1,c),push:(e,s)=>(a=1,c.send(e,s)),send:(e,s)=>(e=JSON.stringify(e),e=s?"@@"+s+"@@"+e:e,1==t?.readyState?(t.send(e),c):(n.push(e),l())),on:(e,s)=>(s&&(e?.[0]?(o[e]??=[]).push(s):p.push([e,s])),l()),remove:(e,s,t=o[e],a=t?.indexOf(s)??-1)=>(~a&&t?.splice(a,1),l())}[s])});return c};
```
_Note: This will lose TypeScript support._

## Next Steps

- [Getting Started](./getting-started) - Basic setup and first connections
- [API Reference](./api) - Complete method documentation
- [Examples](./examples) - Real-world usage patterns
- [Channels](./channels) - Channel management and privacy
