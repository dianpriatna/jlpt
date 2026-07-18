<script>
	import './layout.css';

	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	import { auth } from '$lib/firebase';

	import { currentUser, authReady, currentRole } from '$lib/auth/current-user';

	let { children } = $props();

	onMount(() => {
		return onAuthStateChanged(auth, async (user) => {
			currentUser.set(user);

			if (user) {
				// role diambil dari Custom Claims, bukan Firestore, biar tidak nambah read
				const tokenResult = await user.getIdTokenResult();

				currentRole.set(tokenResult.claims.role ?? null);
			} else {
				currentRole.set(null);
			}

			authReady.set(true);
		});
	});
</script>

{@render children()}
