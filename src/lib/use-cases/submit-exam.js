import { resultBuilder } from '$lib/builders';
import { resultRepository } from '$lib/repositories/result';
import { submitExamOnServer } from '$lib/firebase/functions';

/**
 * Practice mode: grading lokal, sinkron.
 * Exam mode: grading di Cloud Function (kunci jawaban & validasi waktu
 * dilakukan server-side, client tidak dipercaya penuh).
 */
export async function submitExam(session, studentId) {
	if (session.exam.mode === 'exam') {
		if (!session.attemptId) {
			throw new Error('Attempt belum dimulai. Coba muat ulang halaman ujian.');
		}

		/** @type {Record<number, number>} */
		const answers = {};

		session.questions.forEach((question, index) => {
			answers[question.id] = session.answerSheet.answers[index];
		});

		const data = await submitExamOnServer({
			examId: session.exam.id,
			attemptId: session.attemptId,
			answers,
			flags: session.answerSheet.getFlagged()
		});

		return { id: data.resultId, ...data };
	}

	const result = resultBuilder.build(session, studentId);

	return resultRepository.save(result);
}
