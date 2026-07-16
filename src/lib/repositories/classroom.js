import { classrooms } from '$lib/data/classrooms';

export class ClassroomRepository {
	findAll() {
		return classrooms;
	}

	findById(id) {
		return classrooms.find((classroom) => classroom.id === id) ?? null;
	}
}

export const classroomRepository = new ClassroomRepository();
