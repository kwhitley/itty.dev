## Migrating to v4.x
Migrating to v4.x will be largely transparent for most users, with a few notable exceptions.  The follow changes have been made in this overhaul.

### 1. itty-router-extas and itty-cors are now "in-house"
As of v4.x, you may simply import any of these items directly from **itty-router**.  In the meantime, your code importing from the separate modules will continue to work just fine!

#### Now
```js
import { Router, json, createCors } from 'itty-router'
```

#### Previously
```js
import { Router } from 'itty-router'
import { json } from 'itty-router-extras'
import { createCors } from 'itty-cors'
```

### 2. withParams (middleware) may be used upstream
Previously, [`withParams`](/itty-router/api#withParams) was only useable directly on a route.  This limited its ability to really cut boilerplate, and added verbosity to a bunch of route declarations.  Now we have it working as an upstream middleware, allowing you to apply it globally upstream, while benefiting from it on the route level.

#### Now
```js
router
  .all('*', withParams) // <--- apply upstream
  .get('/foo/:bar', ({ bar }) => bar)
  .get('/:id', ({ id }) => id)
```

#### Previously
```js
router
  .get('/foo/:bar', withParams, ({ bar }) => bar)
  .get('/:id',  withParams, ({ id }) => id)
```

### 3. createResponse - create your own Response types
[`createResponse`](/itty-router/api#createResponse) is the function we use to create all the familiar response helpers, including [`json`](/itty-router/api#json).  We now expose this, allowing you to create your own custom types.  

In v4.x, we've also added a second argument; a body transform function.  If present, anything you pass to the helper will be passed through this function.  For example, in [`json`](/itty-router/api#json), we pass `JSON.stringify` to the second argument.

### 4. slight tweaks to the RegEx
In order to code-golf the regex even further (huge shoutout to [@DrLoopFall](https://twitter.com/DrLoopFall)), we've accepted some slight changes in v4.x that hopefully should affect almost none of you.
