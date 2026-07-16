import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	setDoc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';

import { db } from '$lib/firebase';

export class BaseRepository {
	constructor(collectionName) {
		this.collection = collection(db, collectionName);
	}

	async findAll() {
		const snapshot = await getDocs(this.collection);

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
	}

	async findById(id) {
		const snapshot = await getDoc(doc(db, this.collection.path, id));

		if (!snapshot.exists()) {
			return null;
		}

		return {
			id: snapshot.id,
			...snapshot.data()
		};
	}

	async create(data) {
		const ref = await addDoc(this.collection, data);

		return ref.id;
	}

	async update(id, data) {
		await updateDoc(doc(db, this.collection.path, id), data);
	}

	async replace(id, data) {
		await setDoc(doc(db, this.collection.path, id), data);
	}

	async delete(id) {
		await deleteDoc(doc(db, this.collection.path, id));
	}
}
