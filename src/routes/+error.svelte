<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<div class="flex flex-col">
	<h2 class="text-center text-5xl font-extrabold noserif">You have glitched out of reality 🤯</h2>

	<h2 class="text-center text-2xl font-bold mt-10 noserif">
		{$page.status} : {$page.error.message}
	</h2>
	<div class="flex justify-center mt-5">
		<a
			href="/"
			data-sveltekit-reload
			class="flex justify-center max-w-70 w-70 min-w-70 text-white px-8 py-2 text-xl font-bold bg-primary-100 rounded-md noserif transition-all hover:(transform preserve-3d scale-103 -skew-y-1)"
			>➡ Back to homepage</a
		>
	</div>
</div>
