import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './app';

const functions = getFunctions(app);

/**
 * @param {number} examId
 * @returns {Promise<{ attemptId: string }>}
 */
export async function startExamAttempt(examId) {
	const call = httpsCallable(functions, 'startExam');
	const { data } = await call({ examId });

	return data;
}

/**
 * @param {{ examId: number, attemptId: string, answers: Record<number, number>, flags: number[] }} payload
 * @returns {Promise<{ resultId: string, score: number, correct: number, total: number, timeExceeded: boolean }>}
 */
export async function submitExamOnServer(payload) {
	const call = httpsCallable(functions, 'submitExam');
	const { data } = await call(payload);

	return data;
}
