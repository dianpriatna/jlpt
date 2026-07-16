/** @type {import('$lib/types/classroom').Classroom[]} */
export const classrooms = [
	{
		id: 'classroom-001',
		name: 'JLPT N5 - A',
		teacherId: 'teacher-001',
		studentIds: ['student-001', 'student-002', 'student-003', 'student-004'],
		active: true
	},
	{
		id: 'classroom-002',
		name: 'JLPT N5 - B',
		teacherId: 'teacher-002',
		studentIds: ['student-005', 'student-006', 'student-007'],
		active: true
	},
	{
		id: 'classroom-003',
		name: 'JLPT N4 - A',
		teacherId: 'teacher-003',
		studentIds: ['student-008', 'student-009'],
		active: true
	},
	{
		id: 'classroom-004',
		name: 'JLPT N4 - B',
		teacherId: 'teacher-004',
		studentIds: ['student-010'],
		active: true
	},
	{
		id: 'classroom-005',
		name: 'JLPT N3 - A',
		teacherId: 'teacher-005',
		studentIds: [],
		active: true
	}
];
