# welcome to <span class="accent">itty</span>

Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. 

Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. Here is some paragraph content. And some more. 

`code` here

```js
const router = Router()

// register v1 API plus all routes
router
  .all('*', preflight)
  .all('/v1/*', routerV1.handle)                          // register v1 API
  .all('/v2/*', routerV2.handle)                          // register v2 API
  .all('*', () => notFound('Are you sure about that?'))   // 404 for all else

// CF ES6 module syntax
export default {
  fetch: (request, env, context) => router
                                      .handle(request, env, context)

                                      // if sent raw data, wrap it in a Response
                                      .then(json)

                                      // properly catch errors
                                      .catch(error)

                                      // add CORS headers
                                      .then(corsify)

                                      // handle any "after" tasks after response is sent
                                      .then(response => {
                                        if (request.after) {
                                          context.waitUntil(
                                            Promise.allSettled(
                                              request.after.map(fn => fn(response.clone()))
                                            )
                                          )
                                        }

                                        return response
                                      })
}
```
