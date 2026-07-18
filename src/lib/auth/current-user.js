import { writable } from 'svelte/store';

export const currentUser = writable(null);
export const authReady = writable(false);

/** @type {import('svelte/store').Writable<import('./roles').Role|null>} */
export const currentRole = writable(null);
