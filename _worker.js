import { AutoRouter } from 'itty-router'

export default AutoRouter()
.all('/api/*', () => `Hello World`)
.all('*', (req, env) => env.ASSETS.fetch(req))
