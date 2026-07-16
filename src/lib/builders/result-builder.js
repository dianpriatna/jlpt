import { grader } from '$lib/grading';

export class ResultBuilder {
	build(session, studentId) {
		const grading = grader.grade(session);

		return {
			id: crypto.randomUUID(),

			examId: session.exam.id,
			studentId,

			questionIds: session.questions.map((question) => question.id),
			answers: session.answerSheet.answers,

			score: grading.score,

			correctCount: grading.correct,

			wrongCount: grading.wrong,

			status: 'graded',

			startedAt: session.startedAt,

			submittedAt: new Date().toISOString()
		};
	}
}

export const resultBuilder = new ResultBuilder();
