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
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kwhitley/itty.dev' },
      { icon: 'discord', link: 'https://discord.gg/MQcpj9SA4G' },
      { icon: 'x', link: 'https://twitter.com/kevinrwhitley' },
    ],
    editLink: {
      pattern: 'https://github.com/itty.dev/edit/main/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024+ Itty Industries, LLC.'
    },
    nav: [
      { text: 'Docs', link: '/docs/' },
    ],
    sidebar: {
      '/': sidebarRoot,
      '/itty-router/': sidebarIttyRouter,
    },
  },
  titleTemplate: ':title - itty.dev',
})
