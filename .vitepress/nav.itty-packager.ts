import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-packager'

export const sidebarIttyPackager: DefaultTheme.SidebarItem[] = [
  {
    text: '<-- back to Home',
    link: `/docs`,
  },
  {
    text: 'itty-packager',
    link: `${BASE}/`,
    items: [
      {
        text: `Zero-config CLI for building, linting, and releasing TypeScript packages with modern tooling.`
      },
      {
        text: 'Commands',
        link: `${BASE}/build`,
        items: [
          {
            text: 'build',
            link: `${BASE}/build`,
          },
          {
            text: 'lint',
            link: `${BASE}/lint`,
          },
          {
            text: 'prepare',
            link: `${BASE}/prepare`,
          },
          {
            text: 'release',
            link: `${BASE}/release`,
          },
        ]
      },
    ]
  },
]