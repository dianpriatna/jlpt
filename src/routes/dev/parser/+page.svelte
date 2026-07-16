<script>
	import SemanticText from '$lib/components/SemanticText.svelte';

	let text = $state('毎朝(まいあさ)、_電車_で学校(がっこう)へ行きます。');

	let targetStyle = $state('underline');
</script>

<div class="mx-auto max-w-4xl space-y-8 p-8">
	<h1 class="text-3xl font-bold">Semantic Parser Playground</h1>

	<div class="space-y-2">
		<label class="font-medium"> Semantic Text </label>

		<textarea class="textarea textarea-bordered h-40 w-full" bind:value={text}></textarea>
	</div>

	<div class="space-y-2">
		<label class="font-medium"> Target Style </label>

		<select class="select select-bordered" bind:value={targetStyle}>
			<option value="underline">Underline</option>
			<option value="yellow">Yellow Highlight</option>
			<option value="green">Green Highlight</option>
		</select>
	</div>

	<div class="rounded-xl border bg-white p-8 text-2xl leading-loose">
		<SemanticText {text} {targetStyle} />
	</div>
</div>
