import { questions } from '$lib/data/questions';

export class QuestionRepository {
	findAll() {
		return questions;
	}

	findById(id) {
		return questions.find((question) => question.id === id) ?? null;
	}
}

export const questionRepository = new QuestionRepository();
