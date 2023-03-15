## Creating Responses

To create Responses without all the boilerplate, itty-router includes several response helper functions, as well as a utility function to make your own custom types.

Response helpers have the following signature (replace `json` with any other helper name):  
### `json(data: any): Response` - <small>creates a Response from data</small>
### `json(response: Response): Response` - <small>ignores Responses</small>


```js
import { 
  html,
  jpeg,
  json,
  png, 
  text,
  webp,
} from 'itty-router'

json({ foo: 'bar' })

/* 
creates the following:

new Response({
  headers: {
    'content-type': 'application/json',
  },
  body: '{"foo":"bar"}'
})


*/
```
