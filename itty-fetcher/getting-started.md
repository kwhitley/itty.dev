# Getting Started

Welcome to itty-fetcher! This guide will get you up and running with clean, minimal API calls in just a few minutes.

## 1. Installation

```bash
npm install itty-fetcher
# or
yarn add itty-fetcher  
# or
bun add itty-fetcher
```

## 2. Import

```ts
import { fetcher } from 'itty-fetcher'
```

## 3. Basic Usage

### Simple Requests

The most basic usage - just call the method you need:

```ts
// GET request
const users = await fetcher().get('/api/users')

// POST request with data
const newUser = await fetcher().post('/api/users', {
  name: 'Alice',
  email: 'alice@example.com'
})

// PUT, PATCH, DELETE work the same way
await fetcher().put('/api/users/1', { name: 'Bob' })
await fetcher().patch('/api/users/1', { email: 'newemail@example.com' })
await fetcher().delete('/api/users/1')
```

### Creating a Base API Client

For most real applications, you'll want to create a reusable API client:

```ts
// Create once with your base URL and common settings
const api = fetcher('https://api.example.com', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  }
})

// Use everywhere
const users = await api.get('/users')
const posts = await api.get('/posts')
const newPost = await api.post('/posts', { title: 'Hello World' })
```

## 4. Flexible Method Signatures

itty-fetcher supports multiple calling patterns for maximum convenience:

```ts
const api = fetcher('https://api.example.com')

// Full signature: URL + payload + options
await api.post('/users', { name: 'John' }, { 
  headers: { 'X-Custom': 'value' } 
})

// Just payload (uses base URL)
await api.post({ name: 'John' })

// Just URL (no payload)
await api.get('/users')

// URL + options (no payload)
await api.get('/users', { 
  headers: { 'Accept': 'application/xml' } 
})

// No arguments (uses base URL, no payload)
await api.get()
```

## 5. Automatic Features

### JSON Parsing
Responses are automatically parsed as JSON:

```ts
const user = await api.get('/users/1')
console.log(user.name) // Already parsed!
```

### Error Throwing
Unlike native fetch, HTTP errors actually throw:

```ts
try {
  await api.get('/nonexistent')
} catch (error) {
  console.log(error.status) // 404
  console.log(error.message) // "Not Found"
  console.log(error.response) // Original Response object
}
```

### Request Serialization
Objects are automatically serialized to JSON:

```ts
// This object gets stringified and proper headers are set
await api.post('/users', { 
  name: 'Alice',
  preferences: { theme: 'dark' }
})
```

## 6. Complete Example

Here's a real-world example of setting up an API client:

```ts
import { fetcher } from 'itty-fetcher'

// Set up your API client
const api = fetcher('https://jsonplaceholder.typicode.com', {
  headers: {
    'User-Agent': 'MyApp/1.0'
  }
})

// Use it throughout your app
async function getUserPosts(userId: number) {
  try {
    // Fetch user and their posts in parallel
    const [user, posts] = await Promise.all([
      api.get(`/users/${userId}`),
      api.get(`/users/${userId}/posts`)
    ])
    
    return { user, posts }
  } catch (error) {
    console.error('Failed to fetch user data:', error.status)
    throw error
  }
}

async function createPost(title: string, body: string, userId: number) {
  return api.post('/posts', {
    title,
    body, 
    userId
  })
}
```

## Next Steps

- [Configuration](./configuration) - Learn about all available options
- [Error Handling](./error-handling) - Advanced error handling patterns
- [TypeScript](./typescript/) - Type-safe usage with full TypeScript support
- [Examples](./examples/) - More real-world examples