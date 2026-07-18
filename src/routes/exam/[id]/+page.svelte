<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { examResolver } from '$lib/resolvers/exam';
	import { ExamSession } from '$lib/session/exam-session';
	import { startExam } from '$lib/use-cases/start-exam';
	import { submitExam } from '$lib/use-cases/submit-exam';
	import { currentUser } from '$lib/auth/current-user';

	import QuestionCard from '$lib/components/exam/QuestionCard.svelte';

	const examId = Number(page.params.id);

	const resolvedExam = examResolver.resolve(examId);

	const session = resolvedExam ? new ExamSession(resolvedExam) : null;

	let question = $state(session?.currentQuestion() ?? null);

	let selected = $state(session ? session.answerSheet.getAnswer(session.current) : null);

	let currentIndex = $state(session?.current ?? 0);

	let starting = $state(session?.exam.mode === 'exam');
	let submitting = $state(false);
	let submitError = $state('');

	onMount(async () => {
		if (!session || session.exam.mode !== 'exam') return;

		try {
			await startExam(session);
		} catch (error) {
			submitError = 'Gagal memulai ujian. Muat ulang halaman.';
		} finally {
			starting = false;
		}
	});

	function refresh() {
		if (!session) return;

		question = session.currentQuestion();

		selected = session.answerSheet.getAnswer(session.current);

		currentIndex = session.current;
	}

	function handleSelect(choiceIndex) {
		if (!session) return;

		session.answer(choiceIndex);

		selected = session.answerSheet.getAnswer(session.current);
	}

	function next() {
		session?.next();
		refresh();
	}

	function previous() {
		session?.previous();
		refresh();
	}

	async function submit() {
		if (!session || submitting) return;

		if (!confirm('Yakin ingin mengumpulkan ujian?')) {
			return;
		}

		submitting = true;
		submitError = '';

		try {
			const result = await submitExam(session, $currentUser?.uid ?? 'guest');

			goto(`/result/${result.id}`);
		} catch (error) {
			submitError = error.message ?? 'Gagal mengumpulkan ujian, coba lagi.';
		} finally {
			submitting = false;
		}
	}
</script>

{#if !resolvedExam}
	<div class="alert alert-warning">
		<span>Ujian tidak ditemukan.</span>
	</div>

	<a class="btn mt-4" href="/dashboard"> Kembali ke Dashboard </a>
{:else}
	<p class="mb-4 text-sm opacity-70">
		Soal {currentIndex + 1} / {resolvedExam.questions.length}
	</p>

	{#if submitError}
		<div class="alert alert-error mb-4">
			<span>{submitError}</span>
		</div>
	{/if}

	<QuestionCard {question} {selected} onSelect={handleSelect} />
	<div class="mt-6">
		<button class="btn" onclick={previous} disabled={currentIndex === 0}> Previous </button>

		<button
			class="btn btn-primary"
			onclick={next}
			disabled={currentIndex === resolvedExam.questions.length - 1}
		>
			Next
		</button>
	</div>
	<div class="mt-6 flex justify-end">
		<button
			class="btn btn-success"
			type="button"
			onclick={submit}
			disabled={starting || submitting}
		>
			{submitting ? 'Mengirim...' : 'Submit'}
		</button>
	</div>
{/if}
