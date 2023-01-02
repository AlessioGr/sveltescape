<script lang="ts">
	import 'virtual:windi.css';
	import '../app.css';
	import Popover from 'svelte-easy-popover';

	import { fade, blur, scale } from 'svelte/transition';

	import { browser } from '$app/environment';

	if (browser) {
		import('virtual:windi-devtools');
	}

	import { stories } from '$lib/config';
	import { page } from '$app/stores';
	import type { Story } from '$lib/types';
	import { deepCopy } from 'windicss/utils';
	import StoryDisplay from '$components/StoryDisplay.svelte';

	let searchContent;

	let storiesToShow = stories;

	$: updateSearch(searchContent);

	function updateSearch(searchContent) {
		if (searchContent && searchContent.trim().length > 0) {
			let newStoriesToShow: Story[] = [];
			for (const story of stories) {
				if (
					(searchContent.startsWith('"') && searchContent.endsWith('"')) ||
					(searchContent.startsWith("'") && searchContent.endsWith("'"))
				) {
					let tempSearchContent = deepCopy(searchContent);
					tempSearchContent = tempSearchContent.substring(1, searchContent.length - 1);
					if (story.name.trim().toLowerCase() == tempSearchContent.trim().toLowerCase()) {
						newStoriesToShow.push(story);
					} else if (
						story.label &&
						story.label.trim().toLowerCase() == tempSearchContent.trim().toLowerCase()
					) {
						newStoriesToShow.push(story);
					}
				} else {
					if (
						story.name.trim().toLowerCase().includes(searchContent.trim().toLowerCase()) ||
						searchContent.trim().toLowerCase().includes(story.name.trim().toLowerCase())
					) {
						newStoriesToShow.push(story);
					} else if (
						story.label &&
						(story.label.trim().toLowerCase().includes(searchContent.trim().toLowerCase()) ||
							searchContent.trim().toLowerCase().includes(story.label.trim().toLowerCase()))
					) {
						newStoriesToShow.push(story);
					}
				}
			}
			storiesToShow = newStoriesToShow;
		} else if (!searchContent) {
			storiesToShow = stories;
		}
	}
	let referenceElements = [];
</script>

<main class="flex flex-col justify-center">
	<div class="flex flex-row gap-2 w-full h-screen">
		<!-- Sidebar -->
		<section class="flex flex-col border-r-2 border-black px-4 bg-white border-solid text-sm">
			<!-- Search -->
			<div class="mb-6 mt-2 relative">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500 dark:text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<input
					class="rounded-md px-2 py-1 pl-10"
					bind:value={searchContent}
					placeholder="Search..."
				/>
			</div>
			<!-- Stories -->
			<div class="flex flex-col justify-center gap-1.5">
				{#each storiesToShow as story, i}
					<Popover
						triggerEvents={['hover', 'focus']}
						referenceElement={referenceElements[i]}
						placement="right"
						spaceAway={15}
					>
						<div transition:scale={{ duration: 250 }} class="z-500 rounded-lg w-[200px] h-[150px]">
							<StoryDisplay
								story={deepCopy(story)}
								componentOnly={true}
								maxWidth={200}
								componentOnlyHideToolbar={true}
							/>
						</div>
					</Popover>
					<a
						bind:this={referenceElements[i]}
						href="/{story.name}"
						class:activeStoryButton={$page.url.pathname === '/' + story.name}
						class="hover:no-underline bg-gray-300 focus:(ring-3 ring-gray-500 outline-none) hover:bg-gray-400 px-3 py-1 rounded-md"
						>{story.label ? story.label : story.name}</a
					>
				{/each}
			</div>
		</section>

		<!-- Content -->
		<section class="flex w-full justify-center items-center">
			<slot />
		</section>
	</div>
</main>

<style>
	.activeStoryButton {
		@apply bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-800;
	}
</style>
