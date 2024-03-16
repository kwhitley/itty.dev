<script>
  import SEO from '~/components/SEO.svelte'
</script>

<!-- MARKUP -->
<SEO
  title="itty-durable"
  description="A healthy dose of magic for Cloudflare Durable Objects to beautify your Worker and Object code."
  />

<div class="byline">
  A healthy dose of magic for <a href="https://blog.cloudflare.com/introducing-workers-durable-objects/">Cloudflare Durable Objects</a> to beautify your Worker and DO code.
</div>

## What is it?
This library helps reduce the boilerplate around [Durable Objects](https://blog.cloudflare.com/introducing-workers-durable-objects/), allowing you to focus on the business logic of your stateful objects, rather than things like internal routing, building requests, etc.

Now your Durable Object class can look this simple:
```ts
import { createDurable } from 'itty-durable'

export class Counter extends createDurable({ autoReturn: true, autoPersist: true }) {
  constructor(state, env) {
    super(state, env)
    this.counter = 0
  }

  increment() {
    this.counter++
  }

  setValue(newValue: number) {
    this.counter = newValue
  }
}
```

While being able to access them from a Worker much like a native class:

```ts
import { Router, error, withParams } from 'itty-router'
import { withDurables } from 'itty-durable'

// export the durable class, per spec
export { Counter } from './Counter'

const router = Router()

router
  // add upstream middleware
  .all('*', withDurables(), withParams)

  // get the contents of a DO
  .get('/:id', ({ id, Counter }) => 
    Counter.get(id).toJSON()
  )

  // call a method on the DC
  .get('/:id/increment', ({ id, Counter }) => 
    Counter.get(id).increment()
  )

  // or pass data to a method
  .get('/set/:value', withParams, ({ id, value, Counter }) => 
    Counter.get(id).setValue(Number(value))
  )
```
