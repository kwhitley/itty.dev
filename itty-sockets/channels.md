# Channels

## Channel Basics

Channels are isolated message streams that allow you to group related real-time communication. Each channel operates independently, so messages sent to one channel won't be received by clients connected to other channels.

```ts
// Different channels are completely isolated
const chatSocket = new IttySocket('chat-room-1')
const gameSocket = new IttySocket('game-room-5')
const docSocket = new IttySocket('document-abc123')
```

## Channel Naming

### Naming Conventions
- Use descriptive, unique names
- Include relevant identifiers (room IDs, user IDs, etc.)
- Keep names URL-safe (no spaces or special characters)

```ts
// Good channel names
new IttySocket('chat-general')
new IttySocket('game-room-123')
new IttySocket('document-editing-456')
new IttySocket('user-notifications-789')

// Avoid these patterns
new IttySocket('chat room') // spaces
new IttySocket('room#123') // special characters
```

### Dynamic Channel Names
```ts
// Based on room/session IDs
const roomId = 'abc123'
const socket = new IttySocket(`chat-${roomId}`)

// Based on user interactions
const documentId = getCurrentDocumentId()
const collabSocket = new IttySocket(`document-${documentId}`)

// Hierarchical naming
const socket = new IttySocket(`team-${teamId}-project-${projectId}`)
```

## Channel Privacy

### Public Channels (Demo Mode)
Using the demo API key allows anyone to join any channel. This is perfect for:
- Prototyping and development
- Public chat rooms
- Open collaboration spaces
- Non-sensitive real-time features

```ts
// Anyone can join this channel
const publicSocket = new IttySocket('public-chat')
// or explicitly with demo key
const publicSocket = new IttySocket('public-chat', { apiKey: 'demo' })
```

### Private Channels (API Key Required)
With your own API key, channels become private to your application:
- Only your application can create/join channels
- Secure for sensitive data
- Production-ready

```ts
const privateSocket = new IttySocket('private-room-123', {
  apiKey: 'your-secret-api-key'
})
```

## Channel Management

### Multiple Channels per Client
A single client can connect to multiple channels simultaneously:

```ts
class MultiChannelClient {
  constructor(userId) {
    this.userId = userId
    this.channels = new Map()
  }
  
  joinChannel(channelName) {
    if (this.channels.has(channelName)) return
    
    const socket = new IttySocket(channelName, {
      apiKey: 'your-api-key'
    })
    
    // Add common message handling
    socket.subscribe('user-message', this.handleMessage.bind(this))
    socket.subscribe('system-notification', this.handleNotification.bind(this))
    
    this.channels.set(channelName, socket)
    return socket
  }
  
  leaveChannel(channelName) {
    const socket = this.channels.get(channelName)
    if (socket) {
      socket.close()
      this.channels.delete(channelName)
    }
  }
  
  sendToChannel(channelName, type, data) {
    const socket = this.channels.get(channelName)
    if (socket) {
      socket.send(type, { ...data, userId: this.userId })
    }
  }
}
```

### Channel Discovery
For applications that need dynamic channel discovery:

```ts
// Use a main lobby channel to coordinate
const lobbySocket = new IttySocket('lobby')

// Announce available rooms
lobbySocket.send('room-created', {
  roomId: 'game-123',
  roomName: 'Epic Battle Arena',
  playerCount: 2,
  maxPlayers: 4
})

// Listen for room announcements
lobbySocket.subscribe('room-created', ({ roomId, roomName, playerCount, maxPlayers }) => {
  addRoomToList(roomId, roomName, playerCount, maxPlayers)
})

// Join a specific room
function joinRoom(roomId) {
  const gameSocket = new IttySocket(`game-${roomId}`)
  
  // Announce join in lobby
  lobbySocket.send('player-joined-room', {
    roomId,
    playerId: getCurrentUserId()
  })
  
  return gameSocket
}
```

## Channel Lifecycle

### Connection Management
```ts
class ChannelManager {
  constructor() {
    this.activeChannels = new Map()
  }
  
  async connect(channelName, options = {}) {
    // Prevent duplicate connections
    if (this.activeChannels.has(channelName)) {
      return this.activeChannels.get(channelName)
    }
    
    const socket = new IttySocket(channelName, options)
    
    // Add connection monitoring
    socket.ws.addEventListener('open', () => {
      console.log(`Connected to channel: ${channelName}`)
      this.onChannelConnected(channelName)
    })
    
    socket.ws.addEventListener('close', () => {
      console.log(`Disconnected from channel: ${channelName}`)
      this.activeChannels.delete(channelName)
      this.onChannelDisconnected(channelName)
    })
    
    this.activeChannels.set(channelName, socket)
    return socket
  }
  
  disconnect(channelName) {
    const socket = this.activeChannels.get(channelName)
    if (socket) {
      socket.close()
      this.activeChannels.delete(channelName)
    }
  }
  
  disconnectAll() {
    for (const [channelName, socket] of this.activeChannels) {
      socket.close()
    }
    this.activeChannels.clear()
  }
  
  onChannelConnected(channelName) {
    // Handle successful connection
  }
  
  onChannelDisconnected(channelName) {
    // Handle disconnection, maybe attempt reconnect
  }
}
```

### Cleanup and Resource Management
```ts
// Automatic cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Notify other users you're leaving
  activeChannels.forEach((socket, channelName) => {
    socket.send('user-leaving', {
      userId: getCurrentUserId(),
      timestamp: Date.now()
    })
    socket.close()
  })
})

// Memory leak prevention
class SmartSocket {
  constructor(channelName, options) {
    this.socket = new IttySocket(channelName, options)
    this.listeners = new Set()
  }
  
  subscribe(type, handler) {
    const unsubscribe = this.socket.subscribe(type, handler)
    this.listeners.add(unsubscribe)
    
    // Return enhanced unsubscribe
    return () => {
      unsubscribe()
      this.listeners.delete(unsubscribe)
    }
  }
  
  close() {
    // Clean up all listeners
    this.listeners.forEach(unsubscribe => unsubscribe())
    this.listeners.clear()
    this.socket.close()
  }
}
```

## Best Practices

### Channel Naming Strategy
```ts
// Use consistent naming patterns
const CHANNEL_PATTERNS = {
  chat: (roomId) => `chat-${roomId}`,
  game: (gameId) => `game-${gameId}`,
  document: (docId) => `doc-${docId}`,
  notification: (userId) => `notify-${userId}`,
  presence: (teamId) => `presence-${teamId}`
}

// Usage
const chatSocket = new IttySocket(CHANNEL_PATTERNS.chat('room123'))
const gameSocket = new IttySocket(CHANNEL_PATTERNS.game('battle456'))
```

### Performance Considerations
- Limit the number of simultaneous channels per client
- Use channel hierarchy to reduce message volume
- Implement message throttling for high-frequency events
- Clean up unused channels promptly

### Security Notes
- Never put sensitive data in channel names (they may be logged)
- Use your own API key for production applications
- Implement proper authentication before allowing channel access
- Consider message encryption for sensitive real-time data