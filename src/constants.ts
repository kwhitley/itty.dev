import { env } from '$env/dynamic/public'

export const LOGGING = import.meta.env.VITE_LOGGING === 'true'
export const VERSION = __VERSION__
export const DEV = import.meta.env.DEV

// APP SETTINGS
export const MAX_UPLOADS = 20
export const MAX_FILESIZE = 1024 * 1024 * 50 // 25 MB
