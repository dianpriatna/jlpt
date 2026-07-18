import { collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '$lib/firebase';
import { QUESTION_STATUS } from '$lib/types/question-status';
import { BaseRepository } from './base';

export class FirestoreQuestionRepository extends BaseRepository {
	constructor() {
		super('questions');
	}

	/**
	 * @param {{ includeAll?: boolean }} options - includeAll=true untuk CMS/teacher view.
	 */
	async findAll({ includeAll = false } = {}) {
		if (includeAll) return super.findAll();

		const publishedQuery = query(
			collection(db, 'questions'),
			where('status', '==', QUESTION_STATUS.PUBLISHED)
		);

		const snapshot = await getDocs(publishedQuery);

		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	}
}

export const firestoreQuestionRepository = new FirestoreQuestionRepository();
