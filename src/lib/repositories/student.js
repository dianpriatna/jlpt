import { students } from '$lib/data/students';

export class StudentRepository {
	findAll() {
		return students;
	}

	findById(id) {
		return students.find((student) => student.id === id) ?? null;
	}
}

export const studentRepository = new StudentRepository();
