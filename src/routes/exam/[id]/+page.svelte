<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { examResolver } from '$lib/resolvers/exam';
	import { ExamSession } from '$lib/session/exam-session';
	import { submitExam } from '$lib/use-cases/submit-exam';
	import { currentUser } from '$lib/auth/current-user';

	import QuestionCard from '$lib/components/exam/QuestionCard.svelte';

	const examId = Number(page.params.id);

	const resolvedExam = examResolver.resolve(examId);

	const session = resolvedExam ? new ExamSession(resolvedExam) : null;

	let question = $state(session?.currentQuestion() ?? null);

	let selected = $state(session ? session.answerSheet.getAnswer(session.current) : null);

	let currentIndex = $state(session?.current ?? 0);

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

	function submit() {
		if (!session) return;

		if (!confirm('Yakin ingin mengumpulkan ujian?')) {
			return;
		}

		const result = submitExam(session, $currentUser?.uid ?? 'guest');

		goto(`/result/${result.id}`);
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
	<QuestionCard {question} {selected} onSelect={handleSelect} />
	<div class="mt-6">
		<button class="btn" onclick={previous} disabled={currentIndex === 0}> Previous </button>

		<button class="btn btn-primary" onclick={next} disabled={currentIndex === resolvedExam.questions.length - 1}>
			Next
		</button>
	</div>
	<div class="mt-6 flex justify-end">
		<button class="btn btn-success" type="button" onclick={submit}> Submit </button>
	</div>
{/if}
