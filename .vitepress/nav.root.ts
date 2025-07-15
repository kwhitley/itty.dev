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
    text: 'itty-chroma',
    link: `${BASE}/itty-chroma/`,
    items: [
      {
        text: `Powerful styling for the browser console in under 500 bytes.`
      },
    ],
  },
  {
    text: 'itty-sockets <span class="VPBadge new">early access</span>',
    link: `https://ittysockets.io`,
    // collapsed: true,
    items: [
      {
        text: `Dead-simple realtime messaging. No backend required.`
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
  {
    text: 'itty-durable <span class="VPBadge info">deprecated</span>',
    link: `${BASE}/itty-durable/`,
    // collapsed: true,
    items: [
      {
        text: `Allows you to create (and use) the incredibly-powerful Cloudflare Durable Objects in only a few lines of code.`
      },
    ],
  },
]
