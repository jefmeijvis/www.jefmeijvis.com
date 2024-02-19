// src/lib/stores.ts
import { writable } from 'svelte/store';

const theme = writable<Theme>('light');

export { theme }