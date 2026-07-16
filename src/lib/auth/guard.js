import { get } from 'svelte/store';
import { goto } from '$app/navigation';

import { currentUser, authReady } from './current-user';

export function requireAuth() {
	if (!get(authReady)) {
		return false;
	}

	if (!get(currentUser)) {
		goto('/login');

		return false;
	}

	return true;
}
