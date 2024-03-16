import type { DefaultTheme } from 'vitepress'

const BASE = '/docs/itty-router'

export const sidebarIttyRouter: DefaultTheme.SidebarItem[] = [
  {
    text: '<-- back',
    link: `${BASE}/docs`,
  },
  {
    text: 'itty-router',
    items: [
      {
        text: 'Intro',
        link: `${BASE}/intro`,
      },
      {
        text: 'Getting Started',
        link: `${BASE}/getting-started`,
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
    ]
  },
]
