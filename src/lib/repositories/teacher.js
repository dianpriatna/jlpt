import { teachers } from '$lib/data/teachers';

export class TeacherRepository {
	findAll() {
		return teachers;
	}

	findById(id) {
		return teachers.find((teacher) => teacher.id === id) ?? null;
	}
}

export const teacherRepository = new TeacherRepository();
