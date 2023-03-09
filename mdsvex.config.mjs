// import { join, resolve } from 'node:path'
import highlighter from'./src/lib/highlighter.mjs'

// const __dirname = resolve()

const config = {
  extensions: ['.md'],
  highlight: {
    highlighter,
  },
  // layout: join(__dirname, './src/lib/components/MarkdownLayout.svelte'),
}

export default config
