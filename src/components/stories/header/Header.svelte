<script lang="ts">
	import DesktopNav from '$components/stories/header/DesktopNav.svelte';

	import { afterNavigate } from '$app/navigation';
	import type { NavigationTarget } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import type { NavLinks } from '$lib/types';
	import MobileNav from '$components/stories/header/MobileNav.svelte';

	export let props: {
		logoSRC: string;
		logoWidth: number;
		logoHeight: number;
		ownSizeCondition: (page: NavigationTarget) => boolean;
		navLinks: NavLinks;
	};

	let useOwnSize =
		props?.ownSizeCondition && $page.route.id ? props?.ownSizeCondition($page) : true;

	const currentLocale = null;

	afterNavigate((params) => {
		if (props?.ownSizeCondition && params.to) {
			useOwnSize = props?.ownSizeCondition(params.to);
		}
	});
</script>

<header
	class="z-10 py-4 px-6 flex flex-row items-center justify-between w-full {useOwnSize
		? 'relative'
		: 'absolute'}"
>
	{#if props?.logoSRC}
		<a href={$currentLocale ? '/' + $currentLocale.simple : '/'}>
			<img
				class="w-70 {useOwnSize ? '' : ''}"
				src={props?.logoSRC}
				alt="logo"
				width={props?.logoWidth}
				height={props?.logoHeight}
			/>
		</a>
	{/if}

	{#if props?.navLinks}
		<MobileNav dark={useOwnSize} navLinks={props.navLinks} />
		<DesktopNav dark={useOwnSize} navLinks={props.navLinks} />
	{/if}
</header>
