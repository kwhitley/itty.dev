# Error Handling

itty-fetcher provides robust error handling that's far superior to native fetch, with multiple approaches to suit different coding styles.

## Automatic Error Throwing

Unlike native fetch (which only rejects on network errors), itty-fetcher **throws on HTTP error status codes** by default:

```ts
try {
  const data = await api.get('/nonexistent')
} catch (error) {
  console.log(error.status)    // 404
  console.log(error.message)   // "Not Found"
  console.log(error.response)  // Original Response object
}
```

## Error Object Properties

Errors thrown by itty-fetcher include:

```ts
interface FetcherError extends Error {
  status: number          // HTTP status code (404, 500, etc.)
  message: string         // Status text ("Not Found", "Internal Server Error")
  response: Response      // Original Response object
  // ... plus any JSON error body properties
}
```

### JSON Error Bodies

When the server returns JSON error responses, those properties are merged into the error:

```ts
// Server returns: { error: "Validation failed", field: "email" }
try {
  await api.post('/users', { name: 'Alice' })
} catch (error) {
  console.log(error.status)  // 400
  console.log(error.error)   // "Validation failed"
  console.log(error.field)   // "email"
}
```

## Error Handling Approaches

### 1. Traditional Try/Catch

The standard approach for handling errors:

```ts
async function fetchUser(id: string) {
  try {
    const user = await api.get(`/users/${id}`)
    return user
  } catch (error) {
    if (error.status === 404) {
      console.log('User not found')
      return null
    }

    if (error.status >= 500) {
      console.error('Server error:', error.message)
      throw error // Re-throw server errors
    }

    console.error('Request failed:', error.status, error.message)
    throw error
  }
}
```

### 2. Promise Catch

Chain error handling directly on promises:

```ts
const user = await api.get('/users/123')
  .catch(error => {
    if (error.status === 404) return null
    throw error
  })

const result = await api.get('/maybe-missing')
  .catch(error => ({ error: error.status }))

if (result.error) {
  console.log('Request failed with status:', result.error)
}
```

### 3. Tuple Mode (Go-style)

For error handling without try/catch, use tuple mode:

```ts
const api = fetcher({ array: true })

const [error, users] = await api.get('/users')
if (error) {
  console.log('Failed to fetch users:', error.status)
  return
}

console.log('Users fetched successfully:', users)
```

#### Tuple Mode Examples

```ts
const api = fetcher({ array: true })

// Handle different error types
const [error, user] = await api.get('/users/123')
if (error) {
  switch (error.status) {
    case 404:
      console.log('User not found')
      break
    case 403:
      console.log('Access denied')
      break
    default:
      console.error('Unexpected error:', error.message)
  }
  return
}

// Successful response
console.log('User:', user)
```

## Error Response Patterns

### Handling Different Response Types

```ts
// JSON error responses (most common)
try {
  await api.post('/users', invalidData)
} catch (error) {
  // error includes both status info AND JSON response data
  console.log(error.status)        // 400
  console.log(error.message)       // "Bad Request"
  console.log(error.errors)        // ["Email is required", "Name too short"]
}

// Text error responses
try {
  await api.get('/text-endpoint')
} catch (error) {
  console.log(error.status)        // 500
  console.log(error.message)       // "Internal Server Error"
  console.log(error.response)      // Response object with .text() method
}

// Empty error responses
try {
  await api.delete('/users/999')
} catch (error) {
  console.log(error.status)        // 404
  console.log(error.message)       // ""
  console.log(error.response)      // Response object
}
```

### Graceful Degradation

```ts
async function fetchUserWithFallback(id: string) {
  return await api.get(`/users/${id}`)
    .catch(error => {
      if (error.status === 404) {
        // Return default user for 404s
        return { id, name: 'Unknown User', email: null }
      }

      if (error.status >= 500) {
        // For server errors, return cached data if available
        return getCachedUser(id) || null
      }

      // For other errors, re-throw
      throw error
    })
}
```

## Global Error Handling

### Using Response Interceptors

Handle errors globally using the `after` option:

```ts
const api = fetcher({
  after: [
    async (response) => {
      // Log all successful responses
      console.log('API Response:', response)
      return response
    }
  ]
})

// Note: `after` handlers only run on successful responses
// Errors are thrown before `after` handlers run
```

### Wrapper Function Approach

Create a wrapper for consistent error handling:

```ts
function createAPIWrapper(baseApi: Fetcher) {
  const wrapper = {
    async get(url: string, options?: any) {
      try {
        return await baseApi.get(url, options)
      } catch (error) {
        return handleError(error)
      }
    },

    async post(url: string, data?: any, options?: any) {
      try {
        return await baseApi.post(url, data, options)
      } catch (error) {
        return handleError(error)
      }
    }

    // ... other methods
  }

  function handleError(error: any) {
    // Global error logging
    console.error('API Error:', {
      status: error.status,
      message: error.message,
      url: error.response?.url
    })

    // Transform or re-throw as needed
    if (error.status === 401) {
      redirectToLogin()
      return null
    }

    throw error
  }

  return wrapper
}

const api = createAPIWrapper(fetcher('https://api.example.com'))
```

## Testing Error Scenarios

```ts
// Mock error responses for testing
const mockFetch = (status: number, body?: any) => {
  return Promise.resolve(new Response(
    body ? JSON.stringify(body) : null,
    { status, statusText: status === 404 ? 'Not Found' : 'Error' }
  ))
}

const api = fetcher({ fetch: mockFetch(404) })

try {
  await api.get('/test')
} catch (error) {
  expect(error.status).toBe(404)
  expect(error.message).toBe('Not Found')
}
```

## Best Practices

1. **Be Specific**: Handle different error status codes differently
2. **Fail Fast**: Don't catch errors you can't handle meaningfully
3. **Log Appropriately**: Include relevant context in error logs
4. **User Experience**: Provide helpful error messages to users
5. **Retries**: For transient errors, consider implementing retry logic outside of itty-fetcher
6. **Monitoring**: Track error rates and patterns in production

```ts
// Good error handling example
async function saveUser(userData: UserData) {
  try {
    return await api.post('/users', userData)
  } catch (error) {
    // Specific handling for validation errors
    if (error.status === 400) {
      throw new ValidationError(error.errors || ['Invalid user data'])
    }

    // Authentication/authorization
    if (error.status === 401) {
      throw new AuthError('Authentication required')
    }

    if (error.status === 403) {
      throw new AuthError('Permission denied')
    }

    // Server errors - log and provide generic message
    if (error.status >= 500) {
      console.error('Server error saving user:', error)
      throw new Error('Unable to save user. Please try again.')
    }

    // Unexpected errors
    console.error('Unexpected error:', error)
    throw error
  }
}
```