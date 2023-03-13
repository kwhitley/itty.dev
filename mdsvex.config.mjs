import highlighter from'./src/lib/highlighter.mjs'

const config = {
  extensions: ['.md'],
  highlight: {
    highlighter,
  },
}

export default config
