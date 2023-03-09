import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.md']
    }),
  ],
	kit: {
		adapter: adapter(),
	}
}

export default config
