import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import * as pkg from './package.json'

console.log('process.env', process.env.LOGGING)

export default {
  plugins: [sveltekit()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  define: {
    __VERSION__: `"${pkg.version}"`,
  }
}
