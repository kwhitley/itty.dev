import type { DefaultTheme } from 'vitepress'
import { sidebarIttyRouter } from './nav.itty-router'

const BASE = ''

export const sidebarRoot: DefaultTheme.SidebarItem[] = [
  {
    text: 'Welcome to itty.dev.  Below are the currently-support itty libraries.'
  },
  {
    text: 'itty-router',
    link: `${BASE}/itty-router/`,
    // collapsed: false,
    items: [
      sidebarIttyRouter[1].items[0]
    ],
  },
  {
    text: 'itty-chroma',
    link: `${BASE}/itty-chroma/`,
    items: [
      {
        text: `Powerful styling for the browser console in under 500 bytes.`
      },
    ],
  },
  {
    text: 'itty-fetcher <span class="VPBadge new">new v1.x</span>',
    link: `${BASE}/itty-fetcher/`,
    // collapsed: true,
    items: [
      {
        text: `Ultra-tiny native fetch wrapper (~650 bytes) with automatic JSON parsing, error throwing, and composable API calls.`
      },
    ],
  },
  {
    text: 'itty-durable',
    link: `${BASE}/itty-durable/`,
    // collapsed: true,
    items: [
      {
        text: `Allows you to create (and use) the incredibly-powerful Cloudflare Durable Objects in only a few lines of code.`
      },
    ],
  },
  {
    text: 'itty-time',
    link: `${BASE}/itty-time/`,
    // collapsed: true,
    items: [
      {
        text: `Ultra-small (~390 bytes) library for TTL date math and converting ms durations to and from strings.`
      },
    ],
  },
]
