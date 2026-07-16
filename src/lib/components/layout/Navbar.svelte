<script>
	let { title = 'JLPT Examination' } = $props();
</script>

<div class="navbar bg-base-100 border-b">
	<div class="flex-1">
		<button class="btn btn-ghost btn-square lg:hidden"> ☰ </button>

		<a class="btn btn-ghost text-xl">
			{title}
		</a>
	</div>
</div>
