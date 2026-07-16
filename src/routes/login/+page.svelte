<script>
	import { goto } from '$app/navigation';

	import { login } from '$lib/auth/login';

	let email = $state('');
	let password = $state('');

	let loading = $state(false);

	let error = $state('');

	async function handleLogin() {
		error = '';

		loading = true;

		try {
			await login(email, password);

			goto('/dashboard');
		} catch {
			error = 'Email atau Password salah.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="hero min-h-screen">
	<div class="card w-full max-w-md bg-base-100 shadow-xl">
		<div class="card-body">
			<h1 class="text-center text-3xl font-bold">JLPT Examination</h1>

			<p class="text-center text-sm opacity-70">日本語能力試験</p>

			<input
				class="input input-bordered mt-6"
				type="email"
				placeholder="Email"
				bind:value={email}
			/>

			<input
				class="input input-bordered"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>

			{#if error}
				<div class="alert alert-error">
					{error}
				</div>
			{/if}

			<button class="btn btn-primary mt-2" on:click={handleLogin} disabled={loading}>
				{loading ? 'Loading...' : 'Login'}
			</button>
		</div>
	</div>
</div>
