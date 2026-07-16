import { examRepository } from '$lib/repositories/exam';
import { questionRepository } from '$lib/repositories/question';
import { passageRepository } from '$lib/repositories/passage';

export class ExamResolver {
	resolve(examId) {
		const exam = examRepository.findById(examId);

		if (!exam) {
			return null;
		}

		const questions = exam.questionIds.map((id) => questionRepository.findById(id)).filter(Boolean);

		const passages = exam.passageIds.map((id) => passageRepository.findById(id)).filter(Boolean);

		return {
			exam,
			questions,
			passages
		};
	}
}

export const examResolver = new ExamResolver();
