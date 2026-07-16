<script>
	import './layout.css';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	import { auth } from '$lib/firebase';

	import { currentUser, authReady } from '$lib/auth/current-user';

	let { children } = $props();

	onMount(() => {
		return onAuthStateChanged(auth, (user) => {
			currentUser.set(user);

			authReady.set(true);
		});
	});
</script>

{@render children()}
