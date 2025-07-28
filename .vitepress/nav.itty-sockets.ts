import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-sockets'

export const sidebarIttySockets: DefaultTheme.SidebarItem[] = [
  {
    text: 'itty-sockets',
    items: [
      {
        text: 'Overview',
        link: `${BASE}/`,
      },
      {
        text: 'Getting Started',
        link: `${BASE}/getting-started`,
      },
      {
        text: 'API Reference',
        link: `${BASE}/api`,
      },
      {
        text: 'Examples',
        link: `${BASE}/examples`,
      },
      {
        text: 'Channels',
        link: `${BASE}/channels`,
      },
    ],
  },
]