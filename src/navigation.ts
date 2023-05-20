export const navigation = [
  {
    name: 'itty-router',
    description: 'The 430 byte microrouter.',
    children: [
      { name: 'Getting Started' },
      { name: 'v4.x Migration', path: 'migration-guide' },
      { name: 'CORS' },
      { name: 'Errors' },
      { name: 'Nesting' },
      { name: 'Middleware' },
      { name: 'Route Patterns' },
      { name: 'Responses' },
      // { name: 'Types' },
      // { name: 'Custom Regex' },
      { name: 'Tree-Shaking' },
      { name: 'Performance' },
      {
        name: 'Runtimes',
        children: [
          { name: 'Bun' },
          { name: 'Cloudflare Workers' },
          { name: 'Deno' },
          { name: 'Node' },
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
