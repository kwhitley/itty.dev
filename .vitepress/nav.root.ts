import type { DefaultTheme } from 'vitepress'
import { sidebarIttyRouter } from './nav.itty-router'
import { sidebarIttySockets } from './nav.itty-sockets'

const BASE = ''

export const sidebarRoot: DefaultTheme.SidebarItem[] = [
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
    text: 'itty-sockets <span class="VPBadge new">new</span>',
    link: `${BASE}/itty-sockets/`,
    // collapsed: true,
    items: [
      {
        text: `Type-safe WebSocket routing in 540 bytes`
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
    text: 'itty-packager <span class="VPBadge new">new</span>',
    link: `${BASE}/itty-packager/`,
    // collapsed: true,
    items: [
      {
        text: `Zero-config CLI for building, linting, and releasing TypeScript packages with modern tooling.`
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
