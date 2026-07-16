/**
 * Exam
 *
 * Menyimpan konfigurasi sebuah ujian.
 * Exam tidak menyimpan object Question maupun Passage.
 * Seluruh data akan di-resolve oleh Exam Resolver.
 */

/**
 * @typedef {'practice' | 'exam'} ExamMode
 */

/**
 * @typedef {'vocabulary' | 'grammar-reading' | 'listening'} ExamSection
 */

/**
 * @typedef {Object} Exam
 *
 * @property {number} id
 * @property {string} title
 * @property {'N5'|'N4'|'N3'} level
 *
 * @property {ExamMode} mode
 *
 * @property {ExamSection[]} sections
 *
 * @property {number[]} questionIds
 * @property {number[]} passageIds
 *
 * @property {boolean} randomQuestions
 * @property {boolean} randomChoices
 *
 * @property {boolean} showTimer
 */
