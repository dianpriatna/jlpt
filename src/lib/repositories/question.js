import { questions } from '$lib/data/questions';
import { QUESTION_STATUS } from '$lib/types/question-status';

export class QuestionRepository {
	/**
	 * @param {{ includeAll?: boolean }} options - includeAll=true untuk CMS/teacher view,
	 * default false supaya siswa/exam session hanya pernah melihat soal Published.
	 */
	findAll({ includeAll = false } = {}) {
		if (includeAll) return questions;

		return questions.filter((question) => question.status === QUESTION_STATUS.PUBLISHED);
	}

	findById(id, { includeAll = false } = {}) {
		const question = questions.find((question) => question.id === id) ?? null;

		if (!question) return null;
		if (!includeAll && question.status !== QUESTION_STATUS.PUBLISHED) return null;

		return question;
	}
}

export const questionRepository = new QuestionRepository();
