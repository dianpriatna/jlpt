import { BaseRepository } from './base';

export class FirestoreResultRepository extends BaseRepository {
	constructor() {
		super('results');
	}
}

export const firestoreResultRepository = new FirestoreResultRepository();
