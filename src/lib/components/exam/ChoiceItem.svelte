<script>
	let { choice, index, selected, onclick = () => {} } = $props();
</script>

<li>
	<button
		class="btn w-full text-left {selected === index ? 'btn-primary' : 'btn-ghost'}"
		{onclick}
	>
		{index + 1}. {choice}
	</button>
</li>
