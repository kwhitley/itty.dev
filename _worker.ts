import { AutoRouter } from 'itty-router'

export default AutoRouter({
  base: '/api',
  port: 3001,
})

.get('*', () => `Hello API!`)
