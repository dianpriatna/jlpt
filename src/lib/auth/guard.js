import { get } from 'svelte/store';
import { goto } from '$app/navigation';

import { currentUser, currentRole, authReady } from './current-user';
import { hasRole } from './roles';

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

/**
 * @param {import('./roles').Role[]} allowedRoles
 */
export function requireRole(allowedRoles) {
	if (!requireAuth()) return false;

	if (!hasRole(get(currentRole), allowedRoles)) {
		goto('/dashboard');

		return false;
	}

	return true;
}
