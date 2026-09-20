import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"
import { Themes } from "./constants"

const themeContext = Symbol("theme")

export function createTheme(initialTheme: string) {
  // A separate store for every layout avoids sharing preferences between SSR requests.
  return setContext(themeContext, writable(initialTheme))
}

export function getTheme() {
  return getContext<Writable<string>>(themeContext)
}

export function persistTheme(theme: Writable<string>) {
  try {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === Themes.Dark || savedTheme === Themes.Light) theme.set(savedTheme)
  } catch {
    // Storage is optional; the default remains usable.
  }

  return theme.subscribe((value) => {
    try {
      document.documentElement.dataset.theme = value
    } catch {
      // Theme switching also works when document access is blocked.
    }
    try {
      localStorage.setItem("theme", value)
    } catch {
      // The cookie can persist the preference without localStorage.
    }
  })
}
