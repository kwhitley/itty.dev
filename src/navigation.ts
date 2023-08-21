type NavigationItem = {
  name: string,
  path?: string,
  parent?: NavigationItem,
  fullPath?: string,
  description?: string,
  children?: NavigationItem[]
}

const slugify = (name) => name.toLowerCase().replace(/\s+/g, '-')

const getFullPath = (item) => {
  const parentPath = item.parent?.path

  return item.parent
          ? item.parent.fullPath + item.path
          : item.path
}

const connect = (item: NavigationItem, parent?: NavigationItem, depth = 0) => {
  item.parent = parent
  const shortPath = depth > 1
                  ? item.path || encodeURIComponent(item.name)
                  : item.path || slugify(item.name)
  item.path = `${depth > 1 ? '#' : '/'}${shortPath}`
  item.fullPath = getFullPath(item)

  if (item.children) {
    item.children = item.children.map(child => connect(child, item, depth+1))
  }

  return item
}

export const navigation = [
  {
    name: 'itty-router',
    description: 'The ~450 byte microrouter.',
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
          { name: 'Uniform Routers', path: 'uniform-routers' },
          { name: 'Non-uniform Routers', path: 'non-uniform-routers' },
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
          { name: 'status' },
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
].map((item) => connect(item))
