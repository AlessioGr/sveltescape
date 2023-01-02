<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

<h2 class="text-center text-5xl font-extrabold noserif">You have glitched out of reality 🤯</h2>
<a href="/" data-sveltekit-reload>
	<img
		src="https://imagedelivery.net/ynYW4l3Nbrhm65KTDVmk4A/f1ef77fd-2d3f-4c14-16c7-4624fe11b200/mediumlarge"
		alt="404 Page - static television"
		width="768"
		height="513"
		loading="eager"
		class="rounded-xl mx-auto mt-6 shadow-2xl shadow-primary-100 transition-all hover:(transform preserve-3d scale-103 -skew-y-1)"
	/>
</a>
<h2 class="text-center text-2xl font-bold mt-10 noserif">{$page.status} : {$page.error.message}</h2>
<div class="flex justify-center mt-5">
	<a
		href="/"
		data-sveltekit-reload
		class="flex justify-center max-w-70 w-70 min-w-70 text-white px-8 py-2 text-xl font-bold bg-primary-100 rounded-md noserif transition-all hover:(transform preserve-3d scale-103 -skew-y-1)"
		>➡ Back to homepage</a
	>
</div>
