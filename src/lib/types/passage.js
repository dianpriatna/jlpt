/**
 * Passage (Dokkai)
 *
 * Menyimpan bacaan untuk soal reading comprehension.
 * Passage hanya menyimpan daftar questionIds.
 * Question akan di-resolve oleh Passage/Exam Resolver.
 */

/**
 * @typedef {Object} Passage
 *
 * @property {number} id
 * @property {'N5'|'N4'|'N3'} level
 * @property {string} title
 * @property {string} content
 * @property {number[]} questionIds
 */
