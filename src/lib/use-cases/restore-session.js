import { sessionPersistence } from '$lib/session';

export function restoreSession() {
	return sessionPersistence.load();
}
