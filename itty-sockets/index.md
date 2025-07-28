# itty-sockets

[![GitHub](https://img.shields.io/badge/GitHub-%23555.svg?style=flat-square&logo=github&logoColor=#fff)](https://github.com/kwhitley/itty-sockets)
[![Version](https://img.shields.io/npm/v/itty-sockets.svg?style=flat-square)](https://npmjs.com/package/itty-sockets)

Dead-simple realtime messaging. No backend required.

```ts
import { IttySocket } from 'itty-sockets'

// Create a socket connection
const socket = new IttySocket('my-channel')

// Listen for messages
socket.subscribe('chat', (message) => {
  console.log('New message:', message)
})

// Send messages
socket.send('chat', { 
  user: 'Alice', 
  text: 'Hello world!' 
})

// Real-time collaboration
socket.subscribe('cursor', ({ x, y, user }) => {
  updateCursor(user, x, y)
})

socket.send('cursor', { x: 100, y: 200, user: 'Alice' })
```

## Quick Start

**Option 1: Import**
```ts
import { IttySocket } from 'itty-sockets'
```

**Option 2: Just copy this snippet:**
```js
// Minified version for browser console use
class IttySocket{constructor(e,t={}){this.channel=e,this.options={apiKey:"demo",...t},this.ws=null,this.listeners=new Map,this.connect()}connect(){this.ws?.close();const e=this.options.apiKey?"demo"===this.options.apiKey?"wss://api.ittysockets.io/demo":"wss://api.ittysockets.io/"+this.options.apiKey:"ws://localhost:8787";this.ws=new WebSocket(`${e}/${this.channel}`),this.ws.onmessage=e=>{try{const t=JSON.parse(e.data);this.listeners.get(t.type)?.forEach(e=>e(t.data))}catch{}},this.ws.onclose=()=>setTimeout(()=>this.connect(),1e3)}send(e,t){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:e,data:t}))}subscribe(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t);return()=>{const s=this.listeners.get(e);s&&(s.splice(s.indexOf(t),1),0===s.length&&this.listeners.delete(e))}}close(){this.ws?.close(),this.listeners.clear()}}
```
Note: This will lose TypeScript support, but is great for adding to your browser console (via script extensions, etc).

## Next Steps

- [Getting Started](./getting-started) - Basic setup and first connections
- [API Reference](./api) - Complete method documentation  
- [Examples](./examples) - Real-world usage patterns
- [Channels](./channels) - Channel management and privacy