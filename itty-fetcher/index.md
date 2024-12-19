# itty-fetcher

[![Version](https://img.shields.io/npm/v/itty-fetcher.svg?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Bundle Size](https://deno.bundlejs.com/?q=itty-fetcher&badge&badge-style=flat-square)](https://deno.bundlejs.com/?q=itty-fetcher)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-fetcher/v0.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-fetcher?branch=v0.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-fetcher?style=flat-square)](https://npmjs.com/package/itty-fetcher)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

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
