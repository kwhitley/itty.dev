import { AutoRouter } from 'itty-router'

const apiRouter = AutoRouter()
  .get('/', () => 'Hello World!')
  .get('/json', () => [1,2,3])
  .get('/params/:a/:b?', ({ a, b }) => ({ a, b }))

export default AutoRouter()
.all('/api/*', () => `Hello World`)
.all('*', (req, env) => env.ASSETS.fetch(req))
