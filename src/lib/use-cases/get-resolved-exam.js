import { examResolver } from '$lib/resolvers/exam';

export function getResolvedExam(examId) {
	return examResolver.resolve(examId);
}
