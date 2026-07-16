<script>
	import { onMount } from 'svelte';

	import { requireAuth } from '$lib/auth/guard';
	import { currentUser } from '$lib/auth/current-user';

	import { examRepository } from '$lib/repositories/exam';

	let exams = $state([]);

	onMount(() => {
		requireAuth();

		exams = examRepository.findAll();
	});

	function startExam(id) {
		goto(`/exam/${id}`);
	}
</script>

<div class="container mx-auto max-w-5xl p-6">
	<h1 class="text-3xl font-bold">Dashboard</h1>

	<p class="opacity-70">
		{$currentUser?.email}
	</p>

	<div class="divider"></div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each exams as exam}
			<div class="card bg-base-100 shadow">
				<div class="card-body">
					<h2 class="card-title">
						{exam.title}
					</h2>

					<p>
						Level {exam.level}
					</p>

					<div class="card-actions justify-end">
						<a class="btn btn-primary" href={`/exam/${exam.id}`}> Start </a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
