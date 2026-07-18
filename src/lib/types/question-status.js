/**
 * Lifecycle status soal.
 *
 * Draft -> Validated -> Published -> Archived
 *
 * Soal berstatus Published tidak boleh diubah retroaktif setelah
 * pernah dipakai di exam history. Revisi dibuat sebagai soal/versi
 * baru; soal lama pindah ke status Archived.
 *
 * @typedef {'draft'|'validated'|'published'|'archived'} QuestionStatus
 */

export const QUESTION_STATUS = Object.freeze({
	DRAFT: 'draft',
	VALIDATED: 'validated',
	PUBLISHED: 'published',
	ARCHIVED: 'archived'
});
