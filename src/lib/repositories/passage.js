import { passages } from '$lib/data/passages';

export class PassageRepository {
	findAll() {
		return passages;
	}

	findById(id) {
		return passages.find((passage) => passage.id === id) ?? null;
	}
}

export const passageRepository = new PassageRepository();
