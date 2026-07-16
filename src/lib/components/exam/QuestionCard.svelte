<script>
	import ChoiceList from './ChoiceList.svelte';
	import SemanticText from '../SemanticText.svelte';

	let { question = null, selected = null, onSelect = () => {} } = $props();
</script>

{#if question}
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<h2 class="card-title">Soal</h2>

			<p class="text-xl leading-loose">
				<SemanticText text={question.question} />
			</p>

			<ChoiceList choices={question.choices} {selected} {onSelect} />
		</div>
	</div>
{/if}
