import { BaseRepository } from './base';

export class FirestorePassageRepository extends BaseRepository {
	constructor() {
		super('passages');
	}
}

export const firestorePassageRepository = new FirestorePassageRepository();
