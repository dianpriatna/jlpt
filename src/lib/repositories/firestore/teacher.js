import { BaseRepository } from './base';

export class FirestoreTeacherRepository extends BaseRepository {
	constructor() {
		super('teachers');
	}
}

export const firestoreTeacherRepository = new FirestoreTeacherRepository();
