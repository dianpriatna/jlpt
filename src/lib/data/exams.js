/** @type {import('$lib/types/exam').Exam[]} */
export const exams = [
	{
		id: 1,
		title: 'N5 Kanji Quiz',
		level: 'N5',
		mode: 'practice',
		sections: ['vocabulary'],
		questionIds: [1, 2, 6],
		passageIds: [],
		randomQuestions: true,
		randomChoices: true,
		showTimer: false,
		durationSeconds: null
	},
	{
		id: 2,
		title: 'N5 Grammar Quiz',
		level: 'N5',
		mode: 'practice',
		sections: ['grammar-reading'],
		questionIds: [3, 4, 8],
		passageIds: [],
		randomQuestions: true,
		randomChoices: true,
		showTimer: false,
		durationSeconds: null
	},
	{
		id: 3,
		title: 'N5 Reading Practice',
		level: 'N5',
		mode: 'practice',
		sections: ['grammar-reading'],
		questionIds: [5, 9],
		passageIds: [1, 2],
		randomQuestions: false,
		randomChoices: false,
		showTimer: false,
		durationSeconds: null
	},
	{
		id: 4,
		title: 'N5 Listening Practice',
		level: 'N5',
		mode: 'practice',
		sections: ['listening'],
		questionIds: [10],
		passageIds: [],
		randomQuestions: false,
		randomChoices: false,
		showTimer: false,
		durationSeconds: null
	},
	{
		id: 5,
		title: 'JLPT N5 Mini Test',
		level: 'N5',
		mode: 'exam',
		sections: ['vocabulary', 'grammar-reading', 'listening'],
		questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		passageIds: [1, 2],
		randomQuestions: true,
		randomChoices: true,
		showTimer: true,
		durationSeconds: 1800
	}
];
