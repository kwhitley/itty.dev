# Getting Started

## Quick Start

**Option 1: Import**
```ts
import { IttySocket } from 'itty-sockets'
```

**Option 2: Just copy this snippet:**
```js
class IttySocket{constructor(e,t={}){this.channel=e,this.options={apiKey:"demo",...t},this.ws=null,this.listeners=new Map,this.connect()}connect(){this.ws?.close();const e=this.options.apiKey?"demo"===this.options.apiKey?"wss://api.ittysockets.io/demo":"wss://api.ittysockets.io/"+this.options.apiKey:"ws://localhost:8787";this.ws=new WebSocket(`${e}/${this.channel}`),this.ws.onmessage=e=>{try{const t=JSON.parse(e.data);this.listeners.get(t.type)?.forEach(e=>e(t.data))}catch{}},this.ws.onclose=()=>setTimeout(()=>this.connect(),1e3)}send(e,t){this.ws?.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify({type:e,data:t}))}subscribe(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t);return()=>{const s=this.listeners.get(e);s&&(s.splice(s.indexOf(t),1),0===s.length&&this.listeners.delete(e))}}close(){this.ws?.close(),this.listeners.clear()}}
```
Note: This will lose TypeScript support, but is great for adding to your browser console (via script extensions, etc).

## Basic Usage

### Creating a Connection
```ts
// Join a channel (demo API key - limited usage)
const socket = new IttySocket('my-channel')

// With your own API key (production usage)
const socket = new IttySocket('my-channel', {
  apiKey: 'your-api-key-here'
})
```

### Sending and Receiving Messages
```ts
// Listen for messages
socket.subscribe('chat', (message) => {
  console.log('Received:', message)
})

// Send a message
socket.send('chat', {
  user: 'Alice',
  text: 'Hello everyone!'
})
```

### Multiple Event Types
```ts
// Chat messages
socket.subscribe('chat', handleChatMessage)

// User presence
socket.subscribe('user-joined', handleUserJoined)
socket.subscribe('user-left', handleUserLeft)

// Custom events
socket.subscribe('game-move', handleGameMove)
```

### Cleanup
```ts
// Unsubscribe from specific events
const unsubscribe = socket.subscribe('chat', handler)
unsubscribe() // Remove this specific listener

// Close connection and clean up
socket.close()
```

## Next Steps

- [API Reference](./api) - Complete method documentation
- [Examples](./examples) - Chat, collaboration, gaming examples
- [Channels](./channels) - Channel privacy and management