import { browser } from '$app/environment';
import { STORAGE_KEY } from './storage-key.js';

export class SessionPersistence {
	save(session) {
		if (!browser) return;

		localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
	}

	load() {
		if (!browser) return null;

		const json = localStorage.getItem(STORAGE_KEY);

		if (!json) {
			return null;
		}

		return JSON.parse(json);
	}

	clear() {
		if (!browser) return;

		localStorage.removeItem(STORAGE_KEY);
	}
}

export const sessionPersistence = new SessionPersistence();
