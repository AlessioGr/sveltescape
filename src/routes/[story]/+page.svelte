<script lang="ts">
	import type { PageData } from './$types';

	import type { Story } from '$lib/types';
	import StoryDisplay from '$components/StoryDisplay.svelte';
	import { deepCopy } from 'windicss/utils';
	export let data: PageData;

	let story: Story = data.story;

	$: story = deepCopy(data.story);
	$: componentOnly = data.componentOnly;
	$: maxWidth = data.maxWidth;
	$: componentOnlyHideToolbar = data.componentOnlyHideToolbar;
</script>

<svelte:head>
	<title>Story: {story.name}</title>
</svelte:head>

<div style="display: contents">
	{#if story}
		<StoryDisplay {componentOnly} {componentOnlyHideToolbar} {maxWidth} {story} />
	{:else}
		<h2 class="text-center flex font-bold text-2xl">Error: story not found</h2>
	{/if}
</div>
