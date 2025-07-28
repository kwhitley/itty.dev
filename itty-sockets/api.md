# API Reference

## IttySocket Class

### Constructor

```ts
new IttySocket(channel: string, options?: SocketOptions)
```

**Parameters:**
- `channel` - Channel name to connect to
- `options` - Optional configuration object

**Options:**
```ts
interface SocketOptions {
  apiKey?: string  // Your API key (defaults to "demo")
}
```

**Example:**
```ts
const socket = new IttySocket('my-channel', {
  apiKey: 'your-api-key'
})
```

## Methods

### `send(type, data)`

Send a message to all connected clients in the channel.

**Parameters:**
- `type` (string) - Event type identifier
- `data` (any) - Data to send (will be JSON serialized)

**Example:**
```ts
socket.send('chat', { user: 'Alice', message: 'Hello!' })
socket.send('cursor-move', { x: 100, y: 200, userId: 'user123' })
```

### `subscribe(type, handler)`

Listen for messages of a specific type.

**Parameters:**
- `type` (string) - Event type to listen for
- `handler` (function) - Callback function to handle received data

**Returns:** Unsubscribe function

**Example:**
```ts
const unsubscribe = socket.subscribe('chat', (data) => {
  console.log('Chat message:', data)
})

// Later, to stop listening:
unsubscribe()
```

### `close()`

Close the WebSocket connection and clean up all listeners.

**Example:**
```ts
socket.close()
```

## Properties

### `channel`
The channel name this socket is connected to.

### `ws`
The underlying WebSocket connection (readonly).

## Connection Management

### Auto-Reconnection
IttySocket automatically reconnects when the connection is lost, with a 1-second delay.

### Connection States
The socket will automatically connect when created. You can check the connection state:

```ts
if (socket.ws?.readyState === WebSocket.OPEN) {
  // Connection is ready
  socket.send('ping', { timestamp: Date.now() })
}
```

## Event Patterns

### Standard Events
```ts
// Chat messages
socket.subscribe('chat', ({ user, message, timestamp }) => {
  addMessageToUI(user, message, timestamp)
})

// User presence
socket.subscribe('user-joined', ({ userId, username }) => {
  showUserJoined(username)
})

socket.subscribe('user-left', ({ userId, username }) => {
  showUserLeft(username)
})
```

### Real-time Collaboration
```ts
// Cursor tracking
socket.subscribe('cursor', ({ x, y, userId, color }) => {
  updateCursor(userId, x, y, color)
})

// Document edits
socket.subscribe('text-edit', ({ position, text, userId }) => {
  applyEdit(position, text, userId)
})
```

### Gaming Events
```ts
// Game state updates
socket.subscribe('game-move', ({ playerId, move, gameState }) => {
  updateGameBoard(move, gameState)
})

// Player actions
socket.subscribe('player-action', ({ action, playerId, data }) => {
  handlePlayerAction(action, playerId, data)
})
```

## Error Handling

### Connection Errors
```ts
socket.ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

socket.ws.onclose = (event) => {
  if (event.wasClean) {
    console.log('Connection closed cleanly')
  } else {
    console.log('Connection lost, will reconnect...')
  }
}
```

### Message Parsing
Invalid JSON messages are automatically ignored. The socket will continue to function normally.

## TypeScript Support

```ts
interface ChatMessage {
  user: string
  message: string
  timestamp: number
}

interface CursorPosition {
  x: number
  y: number
  userId: string
  color: string
}

// Type-safe usage
socket.subscribe('chat', (data: ChatMessage) => {
  // data is properly typed
})

socket.send('cursor', {
  x: 100,
  y: 200,
  userId: 'user123',
  color: '#ff0000'
} as CursorPosition)
```