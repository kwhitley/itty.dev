import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.mjs'
import preprocess from 'svelte-preprocess'
import { svelteShiki } from 'svelte-shiki'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess(),
    mdsvex(mdsvexConfig),
    svelteShiki(),
  ],
	kit: {
		adapter: adapter(),
	}
}

export default config
