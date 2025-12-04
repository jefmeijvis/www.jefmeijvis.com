// src/lib/stores.ts
import { writable } from "svelte/store"
import { browser } from "$app/environment"
import { Themes } from "./constants"

export const theme = writable(browser && localStorage.getItem("theme") || Themes.Light)
theme.subscribe((val) => {
  if (browser) return (localStorage.theme = val)
})