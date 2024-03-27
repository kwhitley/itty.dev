# Itty Concepts
Itty does a few things very differently from other routers... let's get started.

## We are tiny.

We believe less is more (our code + yours).

While other libraries may suffer from feature creep/bloat in order to please a wider audience, we painfully consider **every single byte** added to itty. Our router options range from ~450 bytes to ~970 bytes for a batteries-included version with built-in defaults, error handling, formatting, etc.

On top of that, the following concepts aim to keep *YOUR* code tiny (and readable) as well:

## We have simpler handlers.

There's no `(request, response, next)` here.  The *only* thing universal to every handler/middleware is a single `request` argument.  

The rest is whatever you pass in to `router.fetch(request, ...args)`.  We'll get to that later.

## The request is a context.

Want to send information to your next handler/route?  Just add stuff to the `request`.  That's perfectly OK.

```ts
const withUser = (request) => {
  request.user = new User('Halsey')
}
```

## Handlers and middleware are the same thing.

In itty, a handler is any function passed to a route (you can have many).  These handlers receive a `request`, and may or may not return anything.  If it doesn't return anything, we call it "[middleware](/itty-router/middleware/)", because the next handler automatically is called, and so on, until one of them returns.

Which leads us to...

## The first thing returned is your response.

The first time *any handler* returns *anything at all* (other than undefined), that is the response value to your `router.fetch()` call, and all matching and handler-execution ends.

This can be anything at all (we intentionally don't enforce types on this).

## We `await` every handler.

This means any handler can be sync or async - it's all the same to us.

## Whatever you pass to `router.fetch()` goes to the handlers.

`router.fetch(request, ...args)` is an asynchronous function that takes a `request` and any additional arguments, then sends them to every matching route/handler.

Want to use your own context? Pass additional information? Just add it to the `.fetch()`.

```ts
const router = Router()

// here we receive the 2nd argument
router.get('*', (request, context) => {
  context.foo // 'bar'
})

// send a 2nd argument to the fetch
await router.fetch(request, { foo: 'bar' })
```

## You don't have to build a `Response` in every handler.

A `router.fetch()` can return anything at all, so why not format at the very end?  We've made that easy with our response helpers, which will safely ignore existing `Responses`.

::: code-group

```ts[Using the Promise Chain]
import { Router, json } from 'itty-router'

const router = Router()

router
  .get('/text', () => text('Hello!')) // <-- manual Response type
  .get('/json', () => [1,2,3])
  .get('/numbers', () => 15)
  .get('/promises-to-data', () => Promise.resolve({ foo: 'bar' }))

const response = await router
                        .fetch(request)
                        .then(json) // <-- format any non-Responses here
```

```ts[Using Router stages]
import { Router, json } from 'itty-router'

const router = Router({
  finally: [json] // <-- runs after matching
})

router
  .get('/text', () => text('Hello!')) // <-- manual Response type
  .get('/json', () => [1,2,3])
  .get('/numbers', () => 15)
  .get('/promises-to-data', () => Promise.resolve({ foo: 'bar' }))

const response = await router.fetch(request)
```

:::

## There's no magic<sup>1</sup>.

Itty is, at its core, a linear flow that **you** control 100%. There's no magic here.

- Want routes to connect before other routes?  List them first.  
- Want to speed things up?  [Nest your routing](/itty-router/nesting).  
- Want more things available to your handlers? Send them to `.fetch()`.
- Want to return something other than a `Response`?  Go for it.
- Want to break out of deep code?  Throw a [`StatusError`](/itty-router/api#statuserror).

If there's something you don't understand, [ask us on Discord](https://discord.gg/53vyrZAu9u)!  We'll do our best to help you, and then make sure we document it properly here for others!

<sub>1: Except for the Proxy dark-magic that makes itty so small. That doesn't count.</sub>
