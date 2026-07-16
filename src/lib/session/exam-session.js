import { shuffle } from './shuffle.js';
import { AnswerSheet } from './answer-sheet.js';
import { sessionPersistence } from './persistence.js';

export class ExamSession {
	constructor(resolvedExam) {
		this.exam = resolvedExam.exam;

		this.questions = this.exam.randomQuestions
			? shuffle(resolvedExam.questions)
			: [...resolvedExam.questions];

		this.passages = [...resolvedExam.passages];

		this.current = 0;

		this.answerSheet = new AnswerSheet(this.questions.length);

		this.startedAt = new Date().toISOString();
	}

	currentQuestion() {
		return this.questions[this.current];
	}

	next() {
		if (this.current < this.questions.length - 1) {
			this.current++;

			sessionPersistence.save(this);
		}
	}

	previous() {
		if (this.current > 0) {
			this.current--;

			sessionPersistence.save(this);
		}
	}

	goto(index) {
		if (index >= 0 && index < this.questions.length) {
			this.current = index;

			sessionPersistence.save(this);
		}
	}

	answer(choice) {
		this.answerSheet.answer(this.current, choice);

		sessionPersistence.save(this);
	}

	flag() {
		this.answerSheet.toggleFlag(this.current);

		sessionPersistence.save(this);
	}

	submit() {
		return {
			examId: this.exam.id,

			answers: this.answerSheet.answers,

			flags: this.answerSheet.flags
		};
	}
}
