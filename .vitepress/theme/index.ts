// https://vitepress.dev/guide/custom-theme
import { chroma } from 'itty-chroma'
import { fetcher } from 'itty-fetcher'
import { connect } from 'itty-sockets'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.scss'

const scriptLoaded = (name: string, docs?: string, icon: string = '✅') => {
  const parts = name.includes('itty')
    ? [chroma.bold.color('#f0b'), name, chroma.clear]
    : [name]

  chroma.log(
    icon,
    ...parts.flat(),
    chroma.bg('#555').bold.color('#aaa').padding('0.2em 0.6em 0.2em').radius('0.4rem').size('9px'),
    'available in console',
    chroma.teal,
    docs ? `docs: ${docs}` : `docs: https://itty.dev/${name}`,
  )
}

const example = (description: string) =>
  chroma.log(
    chroma.font('serif').size('1.3em'),
    'try this:\n',
    chroma.darkGrey.size('1em'),
    description,
    '\n'
  )


export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.chroma = chroma
      // @ts-ignore
      window.fetcher = fetcher
      // @ts-ignore
      window.connect = connect

      scriptLoaded('itty-chroma')
      example(`chroma.bold.color('#f0b').log('Hello!')`)

      scriptLoaded('itty-fetcher')
      example(`fetcher().get('https://ittysockets.io/stats').then(console.log)`)

      scriptLoaded('itty-sockets', 'https://ittysockets.io')
      example(`connect('itty.dev/playground', { echo: true })
  .on('message', e => chroma.magenta.log('received:', chroma.clear, e.message))
  .on('join', e => chroma.dodgerBlue.log('someone joined the channel:', e))
  .on('leave', e => chroma.salmon.log('someone left the channel:', e))
  .send('Hello World!')
  .send([1, 2, 3])
  .send({ foo: 'bar' })
  `
      )
    }
  }
} satisfies Theme
