import { sessionPersistence } from '$lib/session';

export function clearSession() {
	sessionPersistence.clear();
}
