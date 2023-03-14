import { DEV } from '~/constants'

export const pageTitle = (...args) => [`itty.dev${ DEV ? ' (dev)' : '' }`, ...args].join(' : ')
