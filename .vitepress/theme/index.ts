// https://vitepress.dev/guide/custom-theme
import { chroma } from 'itty-chroma'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.scss'

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
    }
  }
} satisfies Theme
