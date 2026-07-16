export class AnswerSheet {
	constructor(questionCount) {
		this.answers = new Array(questionCount).fill(null);

		this.flags = new Array(questionCount).fill(false);
	}

	answer(index, choice) {
		this.answers[index] = choice;
	}

	getAnswer(index) {
		return this.answers[index] ?? null;
	}

	toggleFlag(index) {
		this.flags[index] = !this.flags[index];
	}

	isAnswered(index) {
		return this.answers[index] !== null;
	}

	getUnanswered() {
		return this.answers.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
	}

	getFlagged() {
		return this.flags.map((v, i) => (v ? i : null)).filter((v) => v !== null);
	}
}
