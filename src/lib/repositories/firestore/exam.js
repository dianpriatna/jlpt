import { BaseRepository } from './base';

export class FirestoreExamRepository extends BaseRepository {
	constructor() {
		super('exams');
	}
}

export const firestoreExamRepository = new FirestoreExamRepository();
