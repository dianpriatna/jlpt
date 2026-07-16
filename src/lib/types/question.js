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
 * @property {number} answer
 */
