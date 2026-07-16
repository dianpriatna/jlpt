<script>
	let { choices = [], selected = null, onSelect = () => {} } = $props();
</script>

<ul class="space-y-2">
	{#each choices as choice, index}
		<li>
			<label class="flex items-center gap-2 cursor-pointer">
				<input
					type="radio"
					name="answer"
					checked={selected === index}
					onchange={() => onSelect(index)}
				/>

				<span>{choice}</span>
			</label>
		</li>
	{/each}
</ul>
