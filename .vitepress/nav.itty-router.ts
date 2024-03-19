import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-router'

export const sidebarIttyRouter: DefaultTheme.SidebarItem[] = [
  {
    text: '<-- back',
    link: `/docs`,
  },
  {
    text: 'itty-router',
    link: `${BASE}/`,
    items: [
      {
        text: `World's smallest, full-featured serverless microrouter, with router options ranging from ~450 bytes to 1kB.`
      },
      {
        text: 'Getting Started',
        link: `${BASE}/getting-started`,
      },
      {
        text: 'How does it work?',
        link: `${BASE}/how-it-works`,
      },
      {
        text: 'The Routers',
        link: `${BASE}/routers/`,
        collapsed: true,
        items: [
          {
            text: 'Comparison',
            link: `${BASE}/routers/`,
          },
          {
            text: 'IttyRouter (~450 bytes)',
            link: `${BASE}/routers/ittyrouter`,
          },
          {
            text: 'Router (~550 bytes)',
            link: `${BASE}/routers/router`,
          },
          {
            text: 'AutoRouter (~1kB)',
            link: `${BASE}/routers/autorouter`,
          },
        ],
      },
      {
        text: 'CORS',
        link: `${BASE}/cors`,
      },
      {
        text: 'Nesting',
        link: `${BASE}/nesting`,
      },
      {
        text: 'Errors',
        link: `${BASE}/errors`,
      },
      {
        text: 'Middleware',
        link: `${BASE}/middleware/`,
        collapsed: true,
        items: [
          {
            text: 'Creating Your Own',
            link: `${BASE}/middleware/`,
          },
          {
            text: 'withContent',
            link: `${BASE}/middleware/withcontent`,
          },
          {
            text: 'withCookies',
            link: `${BASE}/middleware/withcookies`,
          },
          {
            text: 'withParams',
            link: `${BASE}/middleware/withparams`,
          },
        ],
      },
      {
        text: 'Responses',
        link: `${BASE}/responses`,
      },
      {
        text: 'Route Patterns',
        link: `${BASE}/route-patterns`,
      },

      {
        text: 'Performance-Tuning',
        link: `${BASE}/performance/speed`,
        collapsed: true,
        items: [
          {
            text: 'for Speed',
            link: `${BASE}/performance/speed`,
          },
          {
            text: 'for Size',
            link: `${BASE}/performance/size`,
          },
        ]
      },
      {
        text: 'Runtime Support',
        link: `${BASE}/runtimes/`,
        collapsed: true,
        items: [
          {
            text: 'Cloudflare Workers',
            link: `${BASE}/runtimes/cloudflare-workers`,
          },
          {
            text: 'Bun',
            link: `${BASE}/runtimes/bun`,
          },
          {
            text: 'Node.js',
            link: `${BASE}/runtimes/node`,
          },
          {
            text: 'Next.js',
            link: `${BASE}/runtimes/next`,
          },
        ],
      },
      {
        text: 'TypeScript',
        link: `${BASE}/typescript`,
      },
      {
        text: 'Community Resources',
        link: `${BASE}/community-resources`,
      },
      {
        text: 'Migration Guides',
        link: `${BASE}/migrations/4.0x-4.3x`,
        collapsed: true,
        items: [
          {
            text: '4.0x to 4.3x',
            link: `${BASE}/migrations/4.0x-4.3x`,
          },
          {
            text: '3.0x to 4.0x',
            link: `${BASE}/migrations/3.0x-4.0x`,
          },
        ],
      },
      {
        text: 'API Reference',
        link: `${BASE}/api`,
        collapsed: true,
        items: [
          {
            text: 'createCors',
            link: `${BASE}/api#createcors`
          },
          {
            text: 'createResponse',
            link: `${BASE}/api#createresponse`
          },
          {
            text: 'error',
            link: `${BASE}/api#error`
          },
          {
            text: 'html',
            link: `${BASE}/api#html`
          },
          {
            text: 'jpeg',
            link: `${BASE}/api#jpeg`
          },
          {
            text: 'json',
            link: `${BASE}/api#json`
          },
          {
            text: 'png',
            link: `${BASE}/api#png`
          },
          {
            text: 'Router',
            link: `${BASE}/api#router`
          },
          {
            text: 'status',
            link: `${BASE}/api#status`
          },
          {
            text: 'StatusError',
            link: `${BASE}/api#statuserror`
          },
          {
            text: 'text',
            link: `${BASE}/api#text`
          },
          {
            text: 'webp',
            link: `${BASE}/api#webp`
          },
          {
            text: 'withContent',
            link: `${BASE}/api#withcontent`
          },
          {
            text: 'withCookies',
            link: `${BASE}/api#withcookies`
          },
          {
            text: 'withParams',
            link: `${BASE}/api#withparams`
          },
        ]
      },
    ]
  },
]
