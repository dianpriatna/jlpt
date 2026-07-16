import { exams } from '$lib/data/exams';

export class ExamRepository {
	findAll() {
		return exams;
	}

	findById(id) {
		return exams.find((exam) => exam.id === id) ?? null;
	}
}

export const examRepository = new ExamRepository();
