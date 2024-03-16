import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { sidebarRoot } from './nav.root'
import { sidebarIttyRouter } from './nav.itty-router'

export default defineConfig({
  lang: 'en-US',
  title: 'itty.dev',
  description:
    'Ultra-small, powerful helpers for modern serverless APIs.',
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  themeConfig: {
    logo: '/images/logo-small.png',
    siteTitle: 'itty.dev',
    // algolia: {
    //   appId: '1GIFSU1REV',
    //   apiKey: '6a9bb2036e456356e224ece74546ca14',
    //   indexName: 'hono',
    // },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kwhitley/itty.dev' },
      // { icon: 'discord', link: 'https://discord.gg/KMh2eNSdxV' },
      { icon: 'x', link: 'https://twitter.com/kevinrwhitley' },
    ],
    editLink: {
      pattern: 'https://github.com/itty.dev/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024+ Itty Industries, llc.'
    },
    nav: [
      { text: 'Docs', link: '/docs/' },
    ],
    sidebar: {
      '/': sidebarRoot,
      '/itty-router/': sidebarIttyRouter,
    },
  },
  // head: [
  //   ['meta', { property: 'og:image', content: 'https://hono.dev/images/hono-title.png' }],
  //   ['meta', { property: 'og:type', content: 'website' }],
  //   ['meta', { property: 'twitter:domain', content: 'hono.dev' }],
  //   ['meta', { property: 'twitter:image', content: 'https://hono.dev/images/hono-title.png' }],
  //   ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
  //   ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
  // ],
  titleTemplate: ':title - itty.dev',
})
