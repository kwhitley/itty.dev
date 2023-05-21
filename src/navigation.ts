export const navigation = [
  {
    name: 'itty-router',
    description: 'The ~440 byte microrouter.',
    children: [
      { name: 'Getting Started' },
      { name: 'v4.x Migration', path: 'migration-guide' },
      { name: 'CORS' },
      { name: 'Errors' },
      { name: 'Nesting' },
      { name: 'Middleware' },
      { name: 'Route Patterns' },
      { name: 'Responses' },
      // { name: 'TypeScript' },
      // { name: 'Custom Regex' },
      { name: 'Tree-Shaking' },
      { name: 'Performance' },
      {
        name: 'TypeScript',
        children: [
          { name: 'Uniform Routers' },
          { name: 'Non-uniform Routers' },
          { name: 'IRequest' },
          { name: 'IRequestStrict' },
        ]
      },
      {
        name: 'Runtimes, etc.',
        path: 'runtimes',
        children: [
          { name: 'Bun' },
          { name: 'Cloudflare Workers' },
          { name: 'Node' },
          { name: 'Hono' },
        ]
      },
      {
        name: 'API',
        children: [
          { name: 'createCors' },
          { name: 'createResponse' },
          { name: 'error' },
          { name: 'html' },
          { name: 'jpeg' },
          { name: 'json' },
          { name: 'png' },
          { name: 'Router' },
          { name: 'StatusError' },
          { name: 'text' },
          { name: 'webp' },
          { name: 'withContent' },
          { name: 'withCookies' },
          { name: 'withParams' },
        ]
      },
    ]
  },
  {
    name: 'itty-fetcher',
    description: `The good parts of axios, and then some, at ~1/20th the size.`,
    children: [],
  },
  {
    name: 'itty-time',
    description: `Because we're tired of seeing time math in your code. \n\nAnd ours!`,
    children: [],
  },
  {
    name: 'itty-durable',
    description: `Cloudflare Durable Objects are amazing, but using them requires some... steps.\n\nWe removed most of them for you.\n\n#acceptingdonations #jk #butmaybe?`,
    children: [],
  },
]
