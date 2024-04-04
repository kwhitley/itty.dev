import { AutoRouter } from 'itty-router'

const apiRouter = AutoRouter({ base: '/api' })
  .get('/', () => 'Hello World.')
  .get('/params/:a/:b?', ({ a, b }) => ({ a, b }))

export default AutoRouter()
.all('/api/*', () => [1,2,3])
.all('*', (req, env) => env.ASSETS.fetch(req))
