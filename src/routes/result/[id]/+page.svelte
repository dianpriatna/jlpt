<script>
	import { page } from '$app/state';

	import { resultRepository } from '$lib/repositories/result';
	import { examResolver } from '$lib/resolvers/exam';

	import SemanticText from '$lib/components/SemanticText.svelte';

	const resultId = page.params.id;

	const result = resultRepository.findById(resultId);

	const resolvedExam = result ? examResolver.resolve(result.examId) : null;

	const questionsById = resolvedExam
		? new Map(resolvedExam.questions.map((question) => [question.id, question]))
		: new Map();

	const reviewItems = result
		? result.questionIds
				.map((questionId, index) => ({
					question: questionsById.get(questionId),
					studentAnswer: result.answers[index]
				}))
				.filter((item) => item.question)
		: [];

	const formattedDate = result
		? new Date(result.submittedAt).toLocaleString('id-ID', {
				dateStyle: 'medium',
				timeStyle: 'short'
			})
		: '';
</script>

{#if !result || !resolvedExam}
	<div class="alert alert-warning">
		<span>Hasil ujian tidak ditemukan.</span>
	</div>

	<a class="btn mt-4" href="/dashboard"> Kembali ke Dashboard </a>
{:else}
	<div class="container mx-auto max-w-3xl p-6">
		<div class="card bg-base-100 shadow">
			<div class="card-body">
				<h1 class="card-title text-2xl">{resolvedExam.exam.title}</h1>

				<p class="text-sm opacity-70">Selesai pada {formattedDate}</p>

				<div class="mt-4 grid grid-cols-3 gap-4 text-center">
					<div>
						<p class="text-sm opacity-70">Skor</p>
						<p class="text-3xl font-bold">{result.score}</p>
					</div>

					<div>
						<p class="text-sm opacity-70">Benar</p>
						<p class="text-3xl font-bold text-success">{result.correctCount}</p>
					</div>

					<div>
						<p class="text-sm opacity-70">Salah</p>
						<p class="text-3xl font-bold text-error">{result.wrongCount}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 space-y-4">
			{#each reviewItems as item, index (item.question.id)}
				<div class="card bg-base-100 shadow">
					<div class="card-body">
						<p class="text-sm opacity-70">Soal {index + 1}</p>

						<p class="text-lg leading-loose">
							<SemanticText text={item.question.question} />
						</p>

						<ul class="mt-2 space-y-1">
							{#each item.question.choices as choice, choiceIndex}
								{@const isCorrectChoice = choiceIndex === item.question.answer}
								{@const isStudentChoice = choiceIndex === item.studentAnswer}

								<li
									class="rounded px-2 py-1 {isCorrectChoice
										? 'bg-success/20'
										: isStudentChoice
											? 'bg-error/20'
											: ''}"
								>
									{choiceIndex + 1}. {choice}
								</li>
							{/each}
						</ul>

						{#if item.studentAnswer === null}
							<p class="text-warning mt-2 text-sm">Tidak dijawab</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<a class="btn btn-primary mt-6" href="/dashboard"> Kembali ke Dashboard </a>
	</div>
{/if}
