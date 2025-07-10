# Configuration

itty-fetcher provides flexible configuration options that can be applied at both the fetcher level and per-request.

## Configuration Locations

Options can be set in two places:

```ts
// At the fetcher/base level
const api = fetcher(url?, options?)

// Or per method call
api.post(url?, payload?, options?)

// Or both (method options override base options)
const api = fetcher('https://api.com', { headers: { 'Auth': 'token' } })
await api.get('/users', { headers: { 'Accept': 'text/xml' } })
```

## Core Options

### `base` - Base URL
Set a base URL that gets prepended to all requests:

```ts
const api = fetcher('https://api.example.com/v1')

await api.get('/users') // GET https://api.example.com/v1/users
await api.post('/posts') // POST https://api.example.com/v1/posts
```

**Type:** `string | URL`  
**Default:** `''`

### `headers` - Default Headers
Headers to include with all requests:

```ts
const api = fetcher({
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
    'User-Agent': 'MyApp/1.0'
  }
})
```

Headers are merged between base and request levels, with request headers taking priority.

**Type:** `HeadersInit` (object, Headers instance, or array)  
**Default:** `{}`

### `parse` - Response Parsing
Control how responses are parsed:

```ts
// Default: Parse as JSON
const data = await fetcher().get('/api/data')

// Get raw Response object
const response = await fetcher({ parse: false }).get('/api/data')
console.log(response.status, response.headers)

// Parse as different types
const text = await api.get('/file.txt', { parse: 'text' })
const blob = await api.get('/image.jpg', { parse: 'blob' })
const buffer = await api.get('/binary', { parse: 'arrayBuffer' })
const form = await api.get('/form-data', { parse: 'formData' })
```

**Type:** `false | 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'`  
**Default:** `'json'`

### `encode` - Request Encoding
Control whether request payloads are automatically encoded:

```ts
// Default: Automatically encode objects as JSON
await api.post('/users', { name: 'Alice' }) // Becomes JSON string

// Disable encoding to send raw strings/data
await api.post('/raw', 'raw string data', { encode: false })
```

**Type:** `false`  
**Default:** `true` (encoding enabled)

## Advanced Options

### `fetch` - Custom Fetch Implementation
Provide a custom fetch function:

```ts
import fetch from 'node-fetch' // or any fetch polyfill

const api = fetcher({
  fetch, // Use custom fetch implementation
  base: 'https://api.example.com'
})
```

Perfect for server-side rendering, testing, or environments without native fetch.

**Type:** `typeof fetch`  
**Default:** `globalThis.fetch`

### `query` - Query Parameters
Add query parameters to requests:

```ts
const api = fetcher({
  query: { 
    version: '2',
    format: 'json' 
  }
})

await api.get('/users') // GET /users?version=2&format=json

// Merge with request-level query params
await api.get('/posts', {
  query: { limit: 10 }
}) // GET /posts?version=2&format=json&limit=10
```

**Type:** `Record<string, any>`  
**Default:** `{}`

### `after` - Response Interceptors
Transform responses after parsing but before returning:

```ts
const api = fetcher({
  after: [
    // Add timestamp to all responses
    async (response) => ({ 
      ...response, 
      timestamp: Date.now() 
    }),
    
    // Log all responses (returning undefined leaves response unchanged)
    async (response) => {
      console.log('API Response:', response)
      // return undefined = no transformation
    },
    
    // Extract data from wrapper
    async (response) => response.data || response
  ]
})
```

**Type:** `ResponseHandler[]`  
**Default:** `[]`

### `array` - Tuple Mode
Return `[error, response]` tuples instead of throwing:

```ts
const api = fetcher({ array: true })

const [error, users] = await api.get('/users')
if (error) {
  console.log('Request failed:', error.status)
} else {
  console.log('Users:', users)
}
```

Perfect for Go-style error handling without try/catch blocks.

**Type:** `true`  
**Default:** `false` (throws on errors)

## Native RequestInit Options

All native [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#parameters) options are supported:

```ts
const api = fetcher({
  // Standard fetch options
  cache: 'no-cache',
  credentials: 'include',
  mode: 'cors',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  
  // AbortController support
  signal: abortController.signal
})
```

## Option Merging

When options are provided at both levels, they're merged intelligently:

```ts
const api = fetcher('https://api.com', {
  headers: { 'Auth': 'token', 'Accept': 'application/json' },
  query: { version: '1' }
})

await api.get('/users', {
  headers: { 'Accept': 'text/xml' }, // Overrides base Accept header
  query: { limit: 10 }              // Merges with base query
})

// Final request:
// GET https://api.com/users?version=1&limit=10
// Headers: { 'Auth': 'token', 'Accept': 'text/xml' }
```

## Examples

### API Client with Error Logging
```ts
const api = fetcher('https://api.example.com', {
  headers: { 'Authorization': 'Bearer token' },
  after: [
    // Log all responses for debugging
    async (response) => {
      console.log('API call completed:', response)
    }
  ],
  array: true // Use tuple mode for graceful error handling
})

const [error, users] = await api.get('/users')
```

### Custom Parser with Transformation
```ts
const api = fetcher({
  parse: 'text',
  after: [
    // Parse custom format
    async (textResponse) => {
      return textResponse.split('\n').map(line => line.trim())
    }
  ]
})
```

### Multi-Environment Setup
```ts
const createAPI = (environment: 'dev' | 'prod') => {
  const baseUrls = {
    dev: 'https://api-dev.example.com',
    prod: 'https://api.example.com'
  }
  
  return fetcher(baseUrls[environment], {
    headers: {
      'User-Agent': `MyApp-${environment}/1.0`
    }
  })
}
```