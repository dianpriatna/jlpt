import { BaseRepository } from './base';

export class FirestoreQuestionRepository extends BaseRepository {
	constructor() {
		super('questions');
	}
}

export const firestoreQuestionRepository = new FirestoreQuestionRepository();
