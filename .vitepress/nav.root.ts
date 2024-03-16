import type { DefaultTheme } from 'vitepress'
import { sidebarIttyRouter } from './nav.itty-router'

const BASE = '/docs'

export const sidebarRoot: DefaultTheme.SidebarItem[] = [
  {
    text: 'itty-router',
    link: `${BASE}/itty-router/`,
    collapsed: false,
    items: sidebarIttyRouter[1].items,
  },
  {
    text: 'itty-fetcher',
    collapsed: true,
    items: [
      { text: 'Intro', link: `${BASE}/itty-fetcher/` },
      { text: 'API', link: `${BASE}/itty-fetcher/api` },
    ],
  },
  {
    text: 'itty-durable',
    collapsed: true,
    items: [
      { text: 'Intro', link: `${BASE}/itty-durable/` },
      { text: 'API', link: `${BASE}/itty-durable/api` },
    ],
  },
  {
    text: 'itty-time',
    collapsed: true,
    items: [
      { text: 'Intro', link: `${BASE}/itty-time/` },
      { text: 'API', link: `${BASE}/itty-time/api` },
    ],
  },
]
