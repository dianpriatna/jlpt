/**
 * Role disimpan di Firebase Custom Claims (info yang jarang berubah).
 * Kepemilikan/hak akses data (mis. teacherId) ditegakkan di Firestore
 * Security Rules, bukan di sini.
 *
 * @typedef {'super_admin'|'teacher'|'student'} Role
 */

export const ROLES = Object.freeze({
	SUPER_ADMIN: 'super_admin',
	TEACHER: 'teacher',
	STUDENT: 'student'
});

/**
 * @param {Role|null} role
 * @param {Role[]} allowed
 */
export function hasRole(role, allowed) {
	return role !== null && allowed.includes(role);
}
