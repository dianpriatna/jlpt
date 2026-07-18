import { startExamAttempt } from '$lib/firebase/functions';

/**
 * Practice mode tidak butuh attempt server-side, langsung return null.
 * Exam mode wajib mulai lewat Cloud Function supaya startedAt tercatat
 * pakai server timestamp (dasar validasi anti-cheat saat submit).
 */
export async function startExam(session) {
	if (session.exam.mode !== 'exam') return null;

	const { attemptId } = await startExamAttempt(session.exam.id);

	session.attemptId = attemptId;

	return attemptId;
}
