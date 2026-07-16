<script>
	import { parse } from '$lib/parser';

	let { text = '', targetStyle = 'underline' } = $props();

	const nodes = $derived(parse(text));
</script>

{#each nodes as node}
	{#if node.type === 'plain'}
		{@html node.text}
	{:else if node.type === 'ruby'}
		<ruby>
			{node.kanji}
			<rt>{node.reading}</rt>
		</ruby>
	{:else if node.type === 'target'}
		{#if targetStyle === 'underline'}
			<span class="border-b-2 border-black font-medium">
				{node.text}
			</span>
		{:else if targetStyle === 'yellow'}
			<span class="bg-yellow-300 px-1 rounded">
				{node.text}
			</span>
		{:else if targetStyle === 'green'}
			<span class="bg-green-300 px-1 rounded">
				{node.text}
			</span>
		{:else}
			<span>
				{node.text}
			</span>
		{/if}
	{/if}
{/each}
