# TypeScript Guide

itty-fetcher is built with TypeScript first and provides excellent type safety with intelligent type inference.

## Basic Usage

Import and use with automatic type inference:

```ts
import { fetcher } from 'itty-fetcher'

const api = fetcher('https://api.example.com')

// TypeScript infers the response type
const users = await api.get('/users') // users: any
const newUser = await api.post('/users', { name: 'Alice' }) // newUser: any
```

## Request/Response Types

Define your API types for better type safety:

### Basic Type Definitions

```ts
// Define your data models
type User = {
  id: number
  name: string
  email: string
  createdAt: string
}

type CreateUser = {
  name: string
  email: string
}

type UpdateUser = {
  name?: string
  email?: string
}
```

### Method-Level Generics

Add types to individual method calls:

```ts
const api = fetcher('https://api.example.com')

// GET with response type
const user = await api.get<User>('/users/1')
// user is typed as User

// POST with request and response types  
const newUser = await api.post<CreateUser, User>('/users', {
  name: 'Alice',
  email: 'alice@example.com'
})
// Payload must match CreateUser, result is typed as User

// PATCH with request type
await api.patch<UpdateUser>('/users/1', {
  name: 'Bob' // TypeScript validates this matches UpdateUser
})
```

### Fetcher-Level Default Types

Set default types when creating the fetcher:

```ts
// Set default request and response types
const api = fetcher<CreateUser, User>('https://api.example.com')

// Methods inherit the default types
const user = await api.post('/users', {
  name: 'Alice',     // Must match CreateUser
  email: 'alice@example.com'
})
// Returns User type

// Override defaults when needed
const userList = await api.get<User[]>('/users')
// Returns User[] instead of default User
```

## Advanced Patterns

### API Client with Multiple Resources

```ts
// Define types for different resources
type User = { id: number; name: string; email: string }
type Post = { id: number; title: string; body: string; userId: number }
type Comment = { id: number; postId: number; body: string; author: string }

type CreateUser = Omit<User, 'id'>
type CreatePost = Omit<Post, 'id'>
type CreateComment = Omit<Comment, 'id'>

class APIClient {
  private fetcher: Fetcher

  constructor(baseURL: string, token?: string) {
    this.fetcher = fetcher(baseURL, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
  }

  // User methods
  async getUser(id: number): Promise<User> {
    return this.fetcher.get<User>(`/users/${id}`)
  }

  async createUser(userData: CreateUser): Promise<User> {
    return this.fetcher.post<CreateUser, User>('/users', userData)
  }

  async updateUser(id: number, updates: Partial<CreateUser>): Promise<User> {
    return this.fetcher.patch<Partial<CreateUser>, User>(`/users/${id}`, updates)
  }

  // Post methods
  async getUserPosts(userId: number): Promise<Post[]> {
    return this.fetcher.get<Post[]>(`/users/${userId}/posts`)
  }

  async createPost(postData: CreatePost): Promise<Post> {
    return this.fetcher.post<CreatePost, Post>('/posts', postData)
  }
}

// Usage
const api = new APIClient('https://api.example.com', 'your-token')
const user = await api.getUser(1) // Typed as User
```

### Generic Error Handling

```ts
// Define error response types
type APIError = {
  message: string
  code: string
  details?: any
}

// Create typed error handling
async function handleAPICall<T>(
  apiCall: () => Promise<T>
): Promise<[APIError | null, T | null]> {
  try {
    const result = await apiCall()
    return [null, result]
  } catch (error: any) {
    const apiError: APIError = {
      message: error.message || 'Unknown error',
      code: error.status?.toString() || 'UNKNOWN',
      details: error.response ? await error.response.json() : null
    }
    return [apiError, null]
  }
}

// Usage
const [error, user] = await handleAPICall(() => 
  api.get<User>('/users/1')
)

if (error) {
  console.error('API Error:', error.code, error.message)
} else {
  console.log('User:', user.name) // TypeScript knows user is User
}
```

### Tuple Mode Types

When using tuple mode, TypeScript correctly types the return values:

```ts
const api = fetcher<CreateUser, User>({ 
  array: true,
  base: 'https://api.example.com' 
})

// TypeScript knows this returns [error, response]
const [error, users] = await api.get<User[]>('/users')

if (error) {
  console.log(error.status) // number
  console.log(error.message) // string
} else {
  console.log(users.length) // TypeScript knows users is User[]
}
```

### Response Interceptor Types

Type your response interceptors properly:

```ts
type APIResponse<T> = {
  data: T
  meta: {
    page: number
    total: number
  }
}

const api = fetcher({
  base: 'https://api.example.com',
  after: [
    // Extract data from wrapper
    async <T>(response: APIResponse<T>) => response.data,
    
    // Add timestamp
    async <T>(response: T) => ({
      ...response,
      timestamp: Date.now()
    } as T & { timestamp: number })
  ]
})
```

### Configuration with Types

```ts
import type { FetcherOptions } from 'itty-fetcher'

// Create reusable configurations
const createAuthenticatedAPI = (token: string): FetcherOptions => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  after: [
    // Type the response interceptor
    async <T>(response: T) => {
      console.log('API call completed')
      return response
    }
  ]
})

const api = fetcher<CreateUser, User>(
  'https://api.example.com',
  createAuthenticatedAPI('your-token')
)
```

### Utility Types

Create utility types for common patterns:

```ts
// Utility type for paginated responses
type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

// Utility type for API responses
type APIResponse<T> = {
  success: boolean
  data: T
  message?: string
}

// Usage
const users = await api.get<PaginatedResponse<User>>('/users')
const response = await api.get<APIResponse<User>>('/users/1')
```

## Best Practices

1. **Define Types Early**: Create your request/response types before building API calls
2. **Use Method Generics**: Prefer method-level generics for flexibility
3. **Default Types**: Set sensible default types at the fetcher level
4. **Error Types**: Define error response shapes for better error handling
5. **Utility Types**: Create reusable types for common API patterns
6. **Type Guards**: Use type guards for runtime type checking when needed

```ts
// Type guard example
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string'
}

const response = await api.get('/users/1')
if (isUser(response)) {
  console.log(response.name) // TypeScript knows this is safe
}
```