export class Grader {
	grade(session) {
		let correct = 0;

		session.questions.forEach((question, index) => {
			const answer = session.answerSheet.answers[index];

			if (answer === question.answer) {
				correct++;
			}
		});

		const total = session.questions.length;

		return {
			total,

			correct,

			wrong: total - correct,

			score: Math.round((correct / total) * 100)
		};
	}
}

export const grader = new Grader();
