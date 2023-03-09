import { browser } from '$app/env'
import { writable } from 'svelte/store'

export const persistable = (key, defaults) => {
  let value = browser ? window.localStorage.getItem(key) : null

  if (value !== null) {
    value = JSON.parse(value)
  } else {
    value = defaults
  }

  const store = writable(value)

  store.subscribe(v => {
    if (browser) {
      window.localStorage.setItem(key, JSON.stringify(v))
    }
  })

  return store
}
