import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-router'

export const sidebarIttyRouter: DefaultTheme.SidebarItem[] = [
  {
    text: '<-- back to Home',
    link: `/docs`,
  },
  {
    text: 'itty-router',
    link: `${BASE}/`,
    items: [
      {
        text: `Our smallest, full-featured serverless API microrouter, with router options ranging from ~450 bytes to 1kB.`
      },
      {
        text: `--> What's New in v5 <--`,
        link: `${BASE}/migrations/v4-v5`,
      },
      {
        text: 'Itty Concepts',
        link: `${BASE}/concepts`,
        collapsed: true,
        items: [
          {
            text: '1. We are tiny',
            link: `${BASE}/concepts#we-are-tiny`,
          },
          {
            text: '2. Simpler handlers',
            link: `${BASE}/concepts#we-have-simpler-handlers`,
          },
          {
            text: '3. Request as a context',
            link: `${BASE}/concepts#the-request-is-a-context`,
          },
          {
            text: '4. Handlers == middleware',
            link: `${BASE}/concepts#handlers-and-middleware-are-the-same-thing`,
          },
          {
            text: '5. Return to respond',
            link: `${BASE}/concepts#the-first-thing-returned-is-your-response`,
          },
          {
            text: '6. It\'s all awaited',
            link: `${BASE}/concepts#we-await-every-handler`,
          },
          {
            text: '7. Additional Args',
            link: `${BASE}/concepts#whatever-you-pass-to-router-fetch-goes-to-the-handlers`,
          },
          {
            text: '8. Format at the end',
            link: `${BASE}/concepts#you-don-t-have-to-build-a-response-in-every-handler`,
          },
          {
            text: '9. You have 100% control',
            link: `${BASE}/concepts#there-s-no-magic1`,
          },
        ]
      },
      {
        text: 'Getting Started',
        link: `${BASE}/getting-started`,
        collapsed: true,
        items: [
          {
            text: '1. Choose a Router',
            link: `${BASE}/getting-started#choose-a-router`,
          },
          {
            text: 'Design Principles',
            link: `${BASE}/getting-started`,
          },
          {
            text: 'How does it work?',
            link: `${BASE}/how-it-works`,
          },
        ]
      },
      {
        text: 'The 3 Routers',
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
        text: 'Routing Basics',
        link: `${BASE}/route-patterns`,
        collapsed: true,
        items: [
          {
            text: 'Route Patterns',
            link: `${BASE}/route-patterns`,
          },
          {
            text: 'Creating Responses',
            link: `${BASE}/responses`,
          },
          {
            text: 'CORS',
            link: `${BASE}/cors`,
          },
          {
            text: 'Handling Errors',
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
            text: 'Nesting',
            link: `${BASE}/nesting`,
          },
          {
            text: 'Query Params',
            link: `${BASE}/query-params`,
          },
          {
            text: 'TypeScript',
            link: `${BASE}/typescript/`,
          },
        ],
      },
      {
        text: 'Runtime Guides',
        link: `${BASE}/guides/`,
        collapsed: true,
        items: [
          {
            text: 'Cloudflare Workers',
            link: `${BASE}/guides/cloudflare-workers`,
          },
          {
            text: 'Bun',
            link: `${BASE}/guides/bun`,
          },
          {
            text: 'Node.js',
            link: `${BASE}/guides/node`,
          },
          {
            text: 'Next.js',
            link: `${BASE}/guides/next`,
          },
        ],
      },

      {
        text: 'API',
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
      {
        text: 'Extra',
        link: `${BASE}/community-projects`,
        collapsed: true,
        items: [

          {
            text: 'Community Projects',
            link: `${BASE}/community-projects`,
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
            text: 'Migration Guides',
            link: `${BASE}/migrations/v4-v5`,
            collapsed: true,
            items: [
              {
                text: 'v4 to v5',
                link: `${BASE}/migrations/v4-v5`,
              },
              {
                text: 'v3 to v4',
                link: `${BASE}/migrations/v3-v4`,
              },
            ],
          },
        ]
      },


      // {
      //   text: 'CORS',
      //   link: `${BASE}/cors`,
      // },
      // {
      //   text: 'Nesting',
      //   link: `${BASE}/nesting`,
      // },
      // {
      //   text: 'Errors',
      //   link: `${BASE}/errors`,
      // },

      // {
      //   text: 'Responses',
      //   link: `${BASE}/responses`,
      // },
      // {
      //   text: 'Route Patterns',
      //   link: `${BASE}/route-patterns`,
      // },

      // {
      //   text: 'Performance-Tuning',
      //   link: `${BASE}/performance/speed`,
      //   collapsed: true,
      //   items: [
      //     {
      //       text: 'for Speed',
      //       link: `${BASE}/performance/speed`,
      //     },
      //     {
      //       text: 'for Size',
      //       link: `${BASE}/performance/size`,
      //     },
      //   ]
      // },




    ]
  },
]
