import type { DefaultTheme } from 'vitepress'
import { sidebarIttyRouter } from './nav.itty-router'

export const sidebarRoot: DefaultTheme.SidebarItem[] = [
  {
    text: 'itty-router',
    link: '/itty-router/intro.md',
    collapsed: false,
    items: sidebarIttyRouter[1].items,
  },
  {
    text: 'itty-fetcher',
    collapsed: true,
    items: [
      { text: 'Intro', link: '/itty-router/intro' },
      { text: 'API', link: '/itty-router/api' },
    ],
  },
  {
    text: 'itty-durable',
    collapsed: true,
    items: [
      { text: 'Intro', link: '/itty-router/intro' },
      { text: 'API', link: '/itty-router/api' },
    ],
  },
  {
    text: 'itty-time',
    collapsed: true,
    items: [
      { text: 'Intro', link: '/itty-router/intro' },
      { text: 'API', link: '/itty-router/api' },
    ],
  },
]
