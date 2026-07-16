/**
 * Result
 *
 * Menyimpan hasil pengerjaan satu ujian.
 * Result bersifat immutable setelah status Locked.
 */

/**
 * @typedef {'pending' | 'graded' | 'locked'} ResultStatus
 */

/**
 * @typedef {Object} Result
 *
 * @property {string} id
 *
 * @property {number} examId
 * @property {string} studentId
 *
 * @property {string} startedAt
 * @property {string} submittedAt
 *
 * @property {number[]} questionIds
 * @property {number[]} answers
 *
 * @property {number} score
 * @property {number} correctCount
 * @property {number} wrongCount
 *
 * @property {ResultStatus} status
 */
