# itty-durable

[![Version](https://img.shields.io/npm/v/itty-durable.svg?style=flat-square)](https://npmjs.com/package/itty-durable)
[![Bundle Size](https://itty.ing/https://deno.bundlejs.com/?q=itty-durable@next/IttyDurable&badge&badge-style=flat-square)](https://itty.ing/https://deno.bundlejs.com/?q=itty-durable@next/IttyDurable)
[![Coverage Status](https://img.shields.io/coveralls/github/kwhitley/itty-durable/v5.x?style=flat-square)](https://coveralls.io/github/kwhitley/itty-durable?branch=v5.x)
[![NPM Weekly Downloads](https://img.shields.io/npm/dw/itty-durable?style=flat-square)](https://npmjs.com/package/itty-durable)
[![Discord](https://img.shields.io/discord/832353585802903572?label=Discord&logo=Discord&style=flat-square&logoColor=fff)](https://discord.gg/53vyrZAu9u)

A tiny (~400 bytes) extension of Cloudflare Durable Objects to add automated persistence.

---

## Features

- Tiny, with zero dependencies. The `IttyDurable` class is less than 400 bytes gzipped.
- Adds automatic background syncing to/from storage in your DO.
- Simple swappable store allows you to persist *anywhere*.
- Framework/router agnostic.

## Example

```js
import { IttyDurable } from 'itty-durable' // ~400 bytes

export class Counter extends IttyDurable {
  // anything in this.persisted gets synced to storage
  this.persisted = {
    value = 0
  }

  increment() {
    this.persisted.value++

    return this.$props()
  }
}
```
