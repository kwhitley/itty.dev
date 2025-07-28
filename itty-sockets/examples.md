# Examples

## Simple Chat Application

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('chat-room')

// Listen for chat messages
socket.subscribe('chat', ({ user, message, timestamp }) => {
  const chatDiv = document.getElementById('chat-messages')
  const messageEl = document.createElement('div')
  messageEl.innerHTML = `
    <strong>${user}:</strong> ${message}
    <small>${new Date(timestamp).toLocaleTimeString()}</small>
  `
  chatDiv.appendChild(messageEl)
  chatDiv.scrollTop = chatDiv.scrollHeight
})

// Send message function
function sendMessage() {
  const input = document.getElementById('message-input')
  const username = document.getElementById('username').value
  
  if (input.value.trim()) {
    socket.send('chat', {
      user: username || 'Anonymous',
      message: input.value,
      timestamp: Date.now()
    })
    input.value = ''
  }
}
```

## Real-time Cursor Tracking

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('collaboration-room')
const cursors = new Map()

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  socket.send('cursor', {
    x: e.clientX,
    y: e.clientY,
    userId: getCurrentUserId(),
    color: getUserColor()
  })
})

// Display other users' cursors
socket.subscribe('cursor', ({ x, y, userId, color }) => {
  if (userId === getCurrentUserId()) return // Don't show own cursor
  
  let cursor = cursors.get(userId)
  if (!cursor) {
    cursor = document.createElement('div')
    cursor.className = 'remote-cursor'
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
    `
    document.body.appendChild(cursor)
    cursors.set(userId, cursor)
  }
  
  cursor.style.left = x + 'px'
  cursor.style.top = y + 'px'
})
```

## Live Document Collaboration

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('document-' + documentId)
let isTyping = false

// Listen for text changes from other users
socket.subscribe('text-change', ({ operation, position, text, userId }) => {
  if (userId === getCurrentUserId()) return
  
  const editor = document.getElementById('editor')
  const currentText = editor.value
  
  if (operation === 'insert') {
    editor.value = currentText.slice(0, position) + text + currentText.slice(position)
  } else if (operation === 'delete') {
    editor.value = currentText.slice(0, position) + currentText.slice(position + text.length)
  }
})

// Send text changes to other users
document.getElementById('editor').addEventListener('input', (e) => {
  if (isTyping) return
  
  const target = e.target
  const operation = e.inputType.includes('delete') ? 'delete' : 'insert'
  
  socket.send('text-change', {
    operation,
    position: target.selectionStart,
    text: e.data || '',
    userId: getCurrentUserId(),
    timestamp: Date.now()
  })
})

// Typing indicators
let typingTimeout
document.getElementById('editor').addEventListener('keypress', () => {
  socket.send('typing-start', { userId: getCurrentUserId() })
  
  clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {
    socket.send('typing-stop', { userId: getCurrentUserId() })
  }, 2000)
})
```

## Multiplayer Game

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('game-' + gameId)
let gameState = { players: {}, board: [] }

// Join game
socket.send('player-join', {
  playerId: getPlayerId(),
  username: getUsername(),
  avatar: getPlayerAvatar()
})

// Listen for game updates
socket.subscribe('game-state', (newState) => {
  gameState = newState
  renderGame(gameState)
})

socket.subscribe('player-join', ({ playerId, username, avatar }) => {
  gameState.players[playerId] = { username, avatar, score: 0 }
  showPlayerJoined(username)
  renderPlayers(gameState.players)
})

socket.subscribe('player-leave', ({ playerId, username }) => {
  delete gameState.players[playerId]
  showPlayerLeft(username)
  renderPlayers(gameState.players)
})

// Make a game move
function makeMove(moveData) {
  socket.send('game-move', {
    playerId: getPlayerId(),
    move: moveData,
    timestamp: Date.now()
  })
}

// Listen for moves from other players
socket.subscribe('game-move', ({ playerId, move, gameState: newState }) => {
  gameState = newState
  animateMove(playerId, move)
  renderGame(gameState)
  
  // Check for game over conditions
  if (gameState.winner) {
    showGameOver(gameState.winner)
  }
})
```

## User Presence System

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('presence-' + roomId)
const onlineUsers = new Set()

// Announce presence when joining
socket.send('user-online', {
  userId: getCurrentUserId(),
  username: getUsername(),
  avatar: getUserAvatar(),
  status: 'online'
})

// Listen for user presence updates
socket.subscribe('user-online', ({ userId, username, avatar, status }) => {
  onlineUsers.add(userId)
  updateUserList(onlineUsers)
  showNotification(`${username} joined`)
})

socket.subscribe('user-offline', ({ userId, username }) => {
  onlineUsers.delete(userId)
  updateUserList(onlineUsers)
  showNotification(`${username} left`)
})

socket.subscribe('user-status', ({ userId, status }) => {
  updateUserStatus(userId, status) // away, busy, etc.
})

// Send periodic heartbeat
setInterval(() => {
  socket.send('heartbeat', {
    userId: getCurrentUserId(),
    timestamp: Date.now()
  })
}, 30000)

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  const status = document.hidden ? 'away' : 'online'
  socket.send('user-status', {
    userId: getCurrentUserId(),
    status
  })
})

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  socket.send('user-offline', {
    userId: getCurrentUserId(),
    username: getUsername()
  })
})
```

## Live Polling/Voting

```ts
import { IttySocket } from 'itty-sockets'

const socket = new IttySocket('poll-' + pollId)
let pollData = { question: '', options: [], votes: {} }

// Load initial poll data
socket.subscribe('poll-data', (data) => {
  pollData = data
  renderPoll(pollData)
})

// Listen for new votes
socket.subscribe('vote-cast', ({ userId, optionId, username }) => {
  pollData.votes[userId] = optionId
  updateVoteCount(pollData)
  showVoteNotification(`${username} voted`)
})

// Cast a vote
function castVote(optionId) {
  socket.send('vote-cast', {
    userId: getCurrentUserId(),
    username: getUsername(),
    optionId,
    timestamp: Date.now()
  })
}

// Real-time results
function updateVoteCount(pollData) {
  const counts = {}
  pollData.options.forEach(option => counts[option.id] = 0)
  
  Object.values(pollData.votes).forEach(optionId => {
    counts[optionId] = (counts[optionId] || 0) + 1
  })
  
  // Update UI with live results
  renderResults(counts)
}

// Admin functions (if user is poll creator)
function updatePoll(question, options) {
  socket.send('poll-update', {
    question,
    options,
    adminId: getCurrentUserId()
  })
}

function closePoll() {
  socket.send('poll-close', {
    adminId: getCurrentUserId(),
    timestamp: Date.now()
  })
}
```