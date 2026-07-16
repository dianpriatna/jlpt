import { BaseRepository } from './base';

export class FirestoreStudentRepository extends BaseRepository {
	constructor() {
		super('students');
	}
}

export const firestoreStudentRepository = new FirestoreStudentRepository();
