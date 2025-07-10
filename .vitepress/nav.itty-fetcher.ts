import type { DefaultTheme } from 'vitepress'

const BASE = '/itty-fetcher'

export const sidebarIttyFetcher: DefaultTheme.SidebarItem[] = [
  {
    text: '<-- back to Home',
    link: `/docs`,
  },
  {
    text: 'itty-fetcher',
    link: `${BASE}/`,
    items: [
      {
        text: `Ultra-tiny native fetch wrapper (~650 bytes) with automatic JSON parsing, error throwing, and composable API calls.`
      },
      {
        text: 'Getting Started',
        link: `${BASE}/getting-started`,
        collapsed: true,
        items: [
          {
            text: '1. Installation',
            link: `${BASE}/getting-started#_1-installation`,
          },
          {
            text: '2. Import',
            link: `${BASE}/getting-started#_2-import`,
          },
          {
            text: '3. Basic Usage',
            link: `${BASE}/getting-started#_3-basic-usage`,
          },
          {
            text: '4. Flexible Signatures',
            link: `${BASE}/getting-started#_4-flexible-method-signatures`,
          },
          {
            text: '5. Automatic Features',
            link: `${BASE}/getting-started#_5-automatic-features`,
          },
          {
            text: 'Complete Example',
            link: `${BASE}/getting-started#_6-complete-example`,
          },
        ]
      },
      {
        text: 'Configuration',
        link: `${BASE}/configuration`,
        collapsed: true,
        items: [
          {
            text: 'Core Options',
            link: `${BASE}/configuration#core-options`,
          },
          {
            text: 'Advanced Options',
            link: `${BASE}/configuration#advanced-options`,
          },
          {
            text: 'Option Merging',
            link: `${BASE}/configuration#option-merging`,
          },
        ],
      },
      {
        text: 'Error Handling',
        link: `${BASE}/error-handling`,
        collapsed: true,
        items: [
          {
            text: 'Automatic Error Throwing',
            link: `${BASE}/error-handling#automatic-error-throwing`,
          },
          {
            text: 'Error Object Properties',
            link: `${BASE}/error-handling#error-object-properties`,
          },
          {
            text: 'Tuple Mode (Go-style)',
            link: `${BASE}/error-handling#_3-tuple-mode-go-style`,
          },
        ],
      },
      {
        text: 'TypeScript',
        link: `${BASE}/typescript`,
        collapsed: true,
        items: [
          {
            text: 'Basic Usage',
            link: `${BASE}/typescript#basic-usage`,
          },
          {
            text: 'Request/Response Types',
            link: `${BASE}/typescript#request-response-types`,
          },
          {
            text: 'Advanced Patterns',
            link: `${BASE}/typescript#advanced-patterns`,
          }
        ]
      },
      // {
      //   text: 'Examples',
      //   link: `${BASE}/examples`,
      //   collapsed: true,
      //   items: [
      //     {
      //       text: 'REST API Client',
      //       link: `${BASE}/examples#rest-api-client`,
      //     },
      //     {
      //       text: 'Authentication',
      //       link: `${BASE}/examples#authentication`,
      //     },
      //     {
      //       text: 'File Uploads',
      //       link: `${BASE}/examples#file-uploads`,
      //     },
      //     {
      //       text: 'Error Recovery',
      //       link: `${BASE}/examples#error-recovery`,
      //     },
      //   ],
      // },
      {
        text: 'API Reference',
        link: `${BASE}/api`,
        collapsed: true,
        items: [
          {
            text: 'fetcher()',
            link: `${BASE}/api#fetcher`
          },
          {
            text: 'HTTP Methods',
            link: `${BASE}/api#http-methods`
          },
          {
            text: 'Configuration Options',
            link: `${BASE}/api#configuration-options`
          },
          {
            text: 'TypeScript Types',
            link: `${BASE}/api#typescript-types`
          },
        ]
      },
    ]
  },
]