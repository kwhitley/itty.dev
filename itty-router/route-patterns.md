### Routing Basics
# Route Patterns <u>- itty-router</u>

Below we'll list some of the common route-matching patterns supported by itty-router.  By default, all matched route params are accessible in the handlers as `request.params`, unless using the [`withParams`](/itty-router/api#withParams) middleware.

## 1. Fixed routes
Any fixed string will require a direct match.

```js
router.get('/foo/bar/baz', handler)

// GET /foo/bar/baz
```

## 2. Simple route params <a name="params"></a>

Prefix any named route param with a `:` to capture it.  These are separated by slashes.
```js
router.get('/todos/:id/:action', handler)

// GET /todos/13/edit
```

## 3. Optional route params <a name="optional"></a>

Make a route parameter optional by adding a `?` after the name.  In this example, `actions` becomes an optional parameter, allowing requests to match with or without it.
```js
router.get('/todos/:id/:action?', handler)

// GET /todos/13
// GET /todos/13/edit
```


## 4. File formats/extensions <a name="file-formats"></a>

To capture a filename + extension, simply include the period before a final named group.

```js
router.get('/files/:file.:extension', handler)
// GET /files/kitten.jpeg ==> { file: 'kitten', extension: 'jpg' }

router.get('/files/manifest.:extension?', handler)
// GET /files/manifest ==> {}
// GET /files/manifest.json ==> { extension: 'json' }
```

## 5. Wildcards <a name="wildcards"></a>

Especially useful for global middleware, nesting routers, etc., the wildcard `*` allows a route to match anything preceeding the `*`.  It should be noted that this is a *non-capturing* group, and merely to allow matching.
```js
router.all('*', handler)
// GET /todos/13/edit
// PUT /foo/bar
// GET /

router.get('/test/*', handler)
// GET /test/todos/13/edit
// GET /test/foo/bar
```

## 6. "Greedy" params <a name="greedy"></a>

A final named route param may be set as "greedy" by adding a `+` to the end.  This will capture anything following, including slashes and otherwise challenging characters.

For example:
```js
router.get('/goto/:url+', handler)
// GET /goto/https://google.com
```

Returns the following params:
```json
{ 
  "url": "https://google.com"
}
```
