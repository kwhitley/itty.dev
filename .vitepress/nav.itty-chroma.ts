import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-chroma'

export const sidebarIttyChroma: DefaultTheme.SidebarItem[] = [
  {
    text: 'itty-chroma',
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
    ],
  },
]