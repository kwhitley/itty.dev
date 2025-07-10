# API Reference

Complete reference for all itty-fetcher methods, options, and types.

## fetcher()

The main factory function that creates a fetcher instance.

### Syntax

```ts
fetcher(baseUrl?: string, options?: FetcherOptions): Fetcher
fetcher(options?: FetcherOptions): Fetcher
```

### Parameters

- **`baseUrl`** (optional): Base URL to prepend to all requests
- **`options`** (optional): Configuration options

### Returns

A `Fetcher` instance with HTTP method functions.

### Examples

```ts
// Basic usage
const api = fetcher()

// With base URL
const api = fetcher('https://api.example.com')

// With options
const api = fetcher({
  headers: { 'Authorization': 'Bearer token' }
})

// With base URL and options
const api = fetcher('https://api.example.com', {
  headers: { 'Authorization': 'Bearer token' }
})
```

## HTTP Methods

All HTTP methods support flexible argument patterns for maximum convenience.

### .get()

Make GET requests.

```ts
.get(url?: string, options?: FetcherOptions): Promise<Response>
.get(options?: FetcherOptions): Promise<Response>
```

**Examples:**
```ts
await api.get('/users')
await api.get('/users', { headers: { 'Accept': 'text/xml' } })
await api.get({ headers: { 'Accept': 'text/xml' } }) // uses base URL
```

### .post()

Make POST requests with optional payload.

```ts
.post(url?: string, payload?: any, options?: FetcherOptions): Promise<Response>
.post(payload?: any, options?: FetcherOptions): Promise<Response>
.post(options?: FetcherOptions): Promise<Response>
```

**Examples:**
```ts
await api.post('/users', { name: 'Alice' })
await api.post('/users', { name: 'Alice' }, { headers: { 'X-Custom': 'value' } })
await api.post({ name: 'Alice' }) // uses base URL
await api.post() // no payload, uses base URL
```

### .put()

Make PUT requests with optional payload.

```ts
.put(url?: string, payload?: any, options?: FetcherOptions): Promise<Response>
.put(payload?: any, options?: FetcherOptions): Promise<Response>
```

**Examples:**
```ts
await api.put('/users/1', { name: 'Bob' })
await api.put({ name: 'Bob' }) // uses base URL
```

### .patch()

Make PATCH requests with optional payload.

```ts
.patch(url?: string, payload?: any, options?: FetcherOptions): Promise<Response>
.patch(payload?: any, options?: FetcherOptions): Promise<Response>
```

**Examples:**
```ts
await api.patch('/users/1', { email: 'new@example.com' })
await api.patch({ email: 'new@example.com' }) // uses base URL
```

### .delete()

Make DELETE requests with optional payload.

```ts
.delete(url?: string, payload?: any, options?: FetcherOptions): Promise<Response>
.delete(payload?: any, options?: FetcherOptions): Promise<Response>
```

**Examples:**
```ts
await api.delete('/users/1')
await api.delete('/users/1', { reason: 'Account closed' })
await api.delete({ reason: 'Account closed' }) // uses base URL
```

## Configuration Options

Options can be provided at the fetcher level or per-request.

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `base` | `string \| URL` | `''` | Base URL to prepend to requests |
| `headers` | `HeadersInit` | `{}` | Default headers for requests |
| `parse` | `false \| 'json' \| 'text' \| 'blob' \| 'arrayBuffer' \| 'formData'` | `'json'` | How to parse responses |
| `encode` | `false` | `true` | Automatically encode request payloads |

### Advanced Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fetch` | `typeof fetch` | `globalThis.fetch` | Custom fetch implementation |
| `query` | `Record<string, any>` | `{}` | Query parameters for requests |
| `after` | `ResponseHandler[]` | `[]` | Response interceptors/transformers |
| `array` | `true` | `false` | Return `[error, response]` tuples |

### Native RequestInit Options

All standard [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#parameters) options are supported:

- `method` (set automatically by HTTP method)
- `body` (set automatically from payload)
- `cache`
- `credentials`
- `integrity`
- `keepalive`
- `mode`
- `redirect`
- `referrer`
- `referrerPolicy`
- `signal`

## TypeScript Types

### Fetcher

The main fetcher instance type:

```ts
interface Fetcher<DefaultRequestShape = any, DefaultResponseShape = any> {
  get: GetFetchCall<DefaultResponseShape>
  post: FetchCall<DefaultRequestShape, DefaultResponseShape>
  put: FetchCall<DefaultRequestShape, DefaultResponseShape>
  patch: FetchCall<DefaultRequestShape, DefaultResponseShape>
  delete: FetchCall<DefaultRequestShape, DefaultResponseShape>
}
```

### FetcherOptions

Configuration options interface:

```ts
interface FetcherOptions extends RequestInit {
  after?: ResponseHandler[]
  array?: true
  base?: string | URL
  encode?: false
  fetch?: typeof fetch
  parse?: false | 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
  query?: Record<string, any>
}
```

### ResponseHandler

Function type for response interceptors:

```ts
type ResponseHandler = <ResponseShape>(
  response?: ResponseShape,
) => Promise<ResponseShape | void> | ResponseShape | void
```

### Error Types

When requests fail, errors include these properties:

```ts
interface FetcherError extends Error {
  status: number           // HTTP status code
  message: string         // Status text
  response: Response      // Original Response object
  // ... plus any JSON error body properties
}
```

## Usage Examples

### Basic Configuration

```ts
const api = fetcher('https://api.example.com', {
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  parse: 'json'
})
```

### With Response Interceptors

```ts
const api = fetcher({
  after: [
    // Transform all responses
    async (response) => ({
      ...response,
      timestamp: Date.now()
    }),
    
    // Log responses (returning undefined leaves unchanged)
    async (response) => {
      console.log('API Response:', response)
    }
  ]
})
```

### Tuple Mode (Go-style Error Handling)

```ts
const api = fetcher({ array: true })

const [error, users] = await api.get('/users')
if (error) {
  console.log('Request failed:', error.status)
} else {
  console.log('Users:', users)
}
```

### Custom Fetch Implementation

```ts
import fetch from 'node-fetch'

const api = fetcher({
  fetch,  // Use custom fetch
  base: 'https://api.example.com'
})
```

### TypeScript with Generics

```ts
type User = { id: number; name: string; email: string }
type CreateUser = { name: string; email: string }

const api = fetcher<CreateUser, User>('https://api.example.com')

// TypeScript knows the types
const user = await api.get<User>('/users/1')
const newUser = await api.post('/users', { name: 'Alice', email: 'alice@example.com' })
```