### Middleware
# <u>Middleware -</u> withCookies <u>- itty-router</u>

This middleware creates a convenient `request.cookies` object from any cookies found the `request.headers`.

### Example

```ts
import { withCookies } from 'itty-router'

router
  .get('/foo', withCookies, 
    ({ cookies }) => {
      if (!cookies.Authorization) {
        return error(401)
      }

      // do something
    }
  )
```
