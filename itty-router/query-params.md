### Routing Basics
# Query Params

To access query params, simply use `request.query` from the request passed to any handler/middleware.

```ts
router.get('/', ({ query }) => {
  const name = query.name
})
```

## Notes

- All query params are *untyped*, meaning they are all naturally strings until you do something with them.
- Itty supports multiple params of the same name.  For example:
  ```ts
  // ?name=Kevin&pets=Vlad&pets=Katiya&pets=Halsey
  ```

  would translate to a `request.query` of:
  ```ts
  {
    name: "Kevin",
    pets: ["Vlad", "Katiya", "Halsey"],
  }
  ```
