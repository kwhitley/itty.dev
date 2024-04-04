import { AutoRouter } from 'itty-router'

export default AutoRouter({
  base: '/api',
  port: 3001,
  finally: [
    env.ASSETS.fetch
  ]
})
.all('/api/*', () => `Hello World`)
