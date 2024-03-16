<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-fetcher"
  description="The same Fetch API helper you've probably written countless times before, only smaller.  Ultralight Axios alternative."
  />

<div class="byline">
 The same Fetch API helper you've probably written countless times before, only smaller.
</div>

## Why yet another fetching library?

We've all done this countless times in our apps...

We want to make a nice, lightweight app that (of-course) talks to some API. We could import a full-featured fetch library like axios, but we want to keep our bundle size down, right?

So we just write some basic native fetch statements. That's not hard... we've tread this ground before! Of course as the project grows a bit, we start to become bothered by the repeated boilerplate of setting headers, checking for errors, translating response bodies, etc.

So what do we do?

Why, we write a little abstraction layer of course! Just like this one, but probably a bit bigger.

## Example
```js
import { fetcher } from 'itty-fetcher'

// create an api base (optional)
const api = fetcher({ base: 'https://api.kittens.com/v1' })

// then use it... base will be prepended to urls
await api.get('/names/?max=2') // ['Fluffy', 'Mittens']

// automatically handle sending JSON payloads
await api.post('/create-a-cat', { name: 'Halsey', age: 3 })

// use any conceivable HTTP method
// sends using PUT method
api.put('/kitten/13', { name: 'Different Cat' }) 

// sends using FOO method
api.foo('/kitten/13', { name: 'Different Cat' }) 

// send files/blobs directly
await api.post('/upload', 
  new Blob(['some text'], { type: 'plain/text' })
)

// ERROR HANDLING
// 404s, etc will actually throw, allowing an easy catch
api
  .get('/not-a-valid-path')
  .catch(({ status, message }) => {
    console.error('ERROR', { status, message })
  })
```
