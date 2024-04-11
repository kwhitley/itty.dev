### Middleware
# <u>Middleware ></u> withContent <u>- itty-router</u>

### [![Bundle Size](https://itty.ing/https://deno.bundlejs.com/?q=itty-router/withContent&badge&badge-style=for-the-badge)](https://deno.bundlejs.com/?q=itty-router/withContent)

This middleware attempts to parse out the `request.body` into `request.content` using the following waterfall.

`JSON` --> `FormData` --> `Text`

If `request.body` is `undefined`, `withContent` skips these checks, leaving `request.content` as `undefined`.  Do note that each of these methods will be applied automatically, leaving `request.content` as either a JS object (json), a `FormData` instance, or `string`, depending on which one succeeded.  It'll be up to you to enforce/check types within your handler.

### Example: Posting Data

```ts
router.post('/form', withContent, ({ content }) => {
  // do stuff with the content
})
```

## Creating Your Own

There's nothing tricky about writing [middleware](/itty-router/middleware/) in itty, and writing your own content handler is no exception.  

For instance, here's a simplified JSON-only content handler, that includes a 400 error if parsing a malformed JSON body.

### Example

::: code-group

```ts [TypeScript]
import { IRequest, error } from 'itty-router'

// parses JSON as request.content or returns a 400 error
export const withJsonContent = async (request: IRequest) => {
  try {
    request.content = await request.json()
  } catch (err: any) {
    return error(400, 'Invalid JSON payload.')
  }
}
```

```js [JavaScript]
import { error } from 'itty-router'

// parses JSON as request.content or returns a 400 error
export const withJsonContent = async (request) => {
  try {
    request.content = await request.json()
  } catch (err) {
    return error(400, 'Invalid JSON payload.')
  }
}
```

:::
