import { resultBuilder } from '$lib/builders';
import { resultRepository } from '$lib/repositories/result';

export function submitExam(session, studentId) {
	const result = resultBuilder.build(session, studentId);

	return resultRepository.save(result);
}
