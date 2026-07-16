import { BaseRepository } from './base';

export class FirestoreClassroomRepository extends BaseRepository {
	constructor() {
		super('classrooms');
	}
}

export const firestoreClassroomRepository = new FirestoreClassroomRepository();
