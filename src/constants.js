import { env } from '$env/dynamic/public'

export const LOGGING = import.meta.env.VITE_LOGGING === 'true'
export const VERSION = __VERSION__
