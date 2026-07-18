/**
 * @typedef {'kanji'|'vocabulary'|'grammar'|'reading'|'listening'} QuestionCategory
 */

/**
 * @typedef {Object} Question
 *
 * @property {number} id
 * @property {'N5'|'N4'|'N3'} level
 * @property {QuestionCategory} category
 * @property {string} question
 * @property {string[]} choices
 * @property {number} answer - index 0-based ke array choices (sesuai index yang dikirim UI saat memilih)
 *
 * @property {import('./question-status').QuestionStatus} status
 * @property {number} version - dimulai dari 1, naik tiap revisi
 * @property {number|null} previousId - id soal versi sebelumnya, null kalau versi pertama
 * @property {string} teacherId - pemilik soal, dipakai Firestore Security Rules
 */
