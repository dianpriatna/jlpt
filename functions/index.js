import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

initializeApp();

const db = getFirestore();

// toleransi keterlambatan submit karena latency jaringan, bukan celah cheat
const GRACE_SECONDS = 15;

/**
 * Dipanggil saat siswa mulai mengerjakan exam mode.
 * Waktu mulai dicatat pakai server timestamp (bukan dikirim dari client)
 * supaya siswa tidak bisa memalsukan startedAt untuk menambah sisa waktu.
 */
export const startExam = onCall(async (request) => {
	const uid = request.auth?.uid;
	if (!uid) throw new HttpsError('unauthenticated', 'Login diperlukan.');

	const { examId } = request.data;
	const examSnap = await db.collection('exams').doc(String(examId)).get();

	if (!examSnap.exists) throw new HttpsError('not-found', 'Exam tidak ditemukan.');
	if (examSnap.data().mode !== 'exam') {
		throw new HttpsError('failed-precondition', 'startExam hanya untuk mode exam.');
	}

	const attemptRef = await db.collection('attempts').add({
		examId,
		studentId: uid,
		status: 'in_progress',
		startedAt: FieldValue.serverTimestamp()
	});

	return { attemptId: attemptRef.id };
});

/**
 * Grading exam mode berjalan di sini (bukan di client):
 * - kunci jawaban diambil ulang dari Firestore, bukan dipercaya dari client
 * - waktu pengerjaan divalidasi terhadap server timestamp attempt.startedAt
 * - satu write: satu Result document
 */
export const submitExam = onCall(async (request) => {
	const uid = request.auth?.uid;
	if (!uid) throw new HttpsError('unauthenticated', 'Login diperlukan.');

	const { examId, attemptId, answers, flags } = request.data;

	const attemptRef = db.collection('attempts').doc(attemptId);
	const attemptSnap = await attemptRef.get();

	if (!attemptSnap.exists) throw new HttpsError('not-found', 'Attempt tidak ditemukan.');

	const attempt = attemptSnap.data();

	if (attempt.studentId !== uid)
		throw new HttpsError('permission-denied', 'Bukan attempt milikmu.');
	if (attempt.status !== 'in_progress') {
		throw new HttpsError('failed-precondition', 'Attempt sudah disubmit sebelumnya.');
	}

	const examSnap = await db.collection('exams').doc(String(examId)).get();
	if (!examSnap.exists) throw new HttpsError('not-found', 'Exam tidak ditemukan.');
	const exam = examSnap.data();

	// --- anti-cheat: validasi waktu pakai server timestamp, bukan full-trust client ---
	const startedAt = /** @type {Timestamp} */ (attempt.startedAt).toMillis();
	const now = Timestamp.now().toMillis();
	const elapsedSeconds = Math.floor((now - startedAt) / 1000);

	const timeExceeded =
		exam.durationSeconds != null && elapsedSeconds > exam.durationSeconds + GRACE_SECONDS;

	// --- grading: ambil kunci jawaban dari Firestore, bukan dari client ---
	const questionRefs = exam.questionIds.map((id) => db.collection('questions').doc(String(id)));
	const questionSnaps = await db.getAll(...questionRefs);

	let correct = 0;
	const questionIds = [];

	for (const snap of questionSnaps) {
		if (!snap.exists) continue;

		const question = snap.data();
		questionIds.push(question.id);

		const studentAnswer = answers?.[question.id];
		if (studentAnswer === question.answer) correct++;
	}

	const total = questionIds.length;
	const score = total > 0 ? Math.round((correct / total) * 100) : 0;

	const result = {
		examId,
		studentId: uid,
		mode: 'exam',
		questionIds,
		answers,
		flags: flags ?? [],
		score,
		correctCount: correct,
		wrongCount: total - correct,
		timeExceeded,
		elapsedSeconds,
		status: 'graded',
		startedAt: attempt.startedAt,
		submittedAt: FieldValue.serverTimestamp()
	};

	const resultRef = await db.collection('results').add(result);

	await attemptRef.update({ status: 'submitted' });

	return { resultId: resultRef.id, score, correct, total, timeExceeded };
});
