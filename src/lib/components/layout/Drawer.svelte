<script>
	let { items = [] } = $props();
</script>

<ul class="menu p-4">
	{#each items as item}
		<li>
			<a href={item.href}>
				{item.icon}

				{item.label}
			</a>
		</li>
	{/each}
</ul>
