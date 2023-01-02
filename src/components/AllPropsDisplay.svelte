<script lang="ts">
	import PropDisplay from '$components/PropDisplay.svelte';
	import type { Props, Story } from '$lib/types';
	import { initStoryPropsAndOutputProps } from '$lib/PropManager';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let parent: Story | Props | Props[];
	export let props: Props | Props[];

	export let indent = 0;

	export let array = false;

	export let propName: string;

	$: if (!Array.isArray(parent) && parent.props && parent.enabled !== false) {
		parent.enabled = true;
	}

	let loadedInitial = false;
	$: handleStoryPropsEdited(props);
	function handleStoryPropsEdited(props: Props | Props[]) {
		if (!loadedInitial) {
			console.log('Init props...');
			if (Array.isArray(props)) {
				for (const propsSingle of props as Props[]) {
					initStoryPropsAndOutputProps(propsSingle as Props, true);
				}
			} else {
				initStoryPropsAndOutputProps(props as Props, true);
			}
			loadedInitial = true;
		}
	}

	function addMore() {
		if (array) {
			shouldAnimate = true;
			(props as Props[]).push(structuredClone(props[0]));
			props = props;
		}
	}

	function removeMore(index) {
		if (array) {
			shouldAnimate = true;
			(props as Props[]).splice(index, 1);
			props = props;
		}
	}

	function moveUp(index) {
		if (array) {
			shouldAnimateMove = true;
			if (index <= 0) {
				return;
			}
			const cur = (props as Props[])[index];
			(props as Props[])[index] = (props as Props[])[index - 1];
			(props as Props[])[index - 1] = cur;
			props = props;
		}
	}

	function moveDown(index) {
		if (array) {
			shouldAnimateMove = true;
			if (index >= (props as Props[]).length - 1) {
				return;
			}
			const cur = (props as Props[])[index];
			(props as Props[])[index] = (props as Props[])[index + 1];
			(props as Props[])[index + 1] = cur;
			props = props;
		}
	}

	let uuidFromTime = Date.now();

	let shouldAnimate = false;
	let shouldAnimateMove = false;
	let animatingKey = {};

	const animatee = (node, args) => {
		let toReturn = undefined;
		if (shouldAnimate) {
			toReturn = fly(node, args);
		} else if (shouldAnimateMove) {
			toReturn = fly(node, args);
		}
		shouldAnimate = false;
		shouldAnimateMove = false;
		return toReturn;
	};
</script>

<div style="margin-left: {indent}em;" class="flex flex-row gap-1 items-center">
	<input id={propName + indent + uuidFromTime} type="checkbox" bind:checked={parent.enabled} />
	<label for={propName + indent + uuidFromTime} class="font-bold text-lg"
		>{propName} props {indent} {array ? ' (Array)' : ''}</label
	>
</div>
{#if props}
	<div class="flex flex-col" style="margin-left: {indent}em;">
		{#if array && Array.isArray(props)}
			{#each props as propContainer, i (i)}
				<div
					transition:animatee={{ y: 200 }}
					animate:flip
					class="flex flex-col gap-1 relative border-b-2 border-l-2 border-blue-200 hover:border-blue-500 rounded-bl-md border-solid pb-2 pl-2 mb-3"
				>
					<button
						on:click={() => {
							removeMore(i);
						}}
						class="hover:bg-blue-50 rounded-lg px-1.5 absolute -left-6 -top-1 text-blue-600 text-md font-bold"
						>x</button
					>
					{#if i > 0}
						<button
							on:click={() => {
								moveUp(i);
							}}
							class="hover:bg-blue-50 rounded-lg px-1.5 absolute -left-6.5 top-4 text-blue-600 text-md font-bold"
							>↑</button
						>
					{/if}
					{#if i < props.length - 1}
						<button
							on:click={() => {
								moveDown(i);
							}}
							class="hover:bg-blue-50 rounded-lg px-1.5 absolute -left-6.5 top-8 text-blue-600 text-md font-bold"
							>↓</button
						>
					{/if}
					{#each Object.keys(propContainer) as propKey}
						{@const prop = propContainer[propKey]}
						{#if prop.props && prop.input !== false}
							<div>
								<svelte:self
									propName={propKey}
									indent={indent + 1}
									bind:parent={propContainer[propKey]}
									bind:props={propContainer[propKey].props}
									array={!!prop.array}
								/>
							</div>
						{:else if prop.input !== false}
							<div class="flex flex-row gap-2 text-xs items-center">
								{#if prop.readOnly}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<span
										on:click={() => {
											propContainer[propKey].enabled = !prop.enabled;
											if (propContainer[propKey].enabled === false) {
												propContainer[propKey].value = null;
											} else {
												propContainer[propKey].value = propContainer[propKey].defaultValue;
											}
										}}
										class="whitespace-nowrap cursor-pointer {prop.enabled === false
											? 'text-gray-400 line-through'
											: ''}"
									>
										🔒 <b>{prop.label ? prop.label : propKey}</b>:</span
									>
								{:else}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<span
										on:click={() => {
											propContainer[propKey].enabled = !prop.enabled;
											if (propContainer[propKey].enabled === false) {
												propContainer[propKey].value = null;
											} else {
												propContainer[propKey].value = propContainer[propKey].defaultValue;
											}
										}}
										class="whitespace-nowrap cursor-pointer {prop.enabled === false
											? 'text-gray-400 line-through'
											: ''}"
									>
										<b>{prop.label ? prop.label : propKey}</b>:</span
									>
								{/if}
								{#if prop?.enabled !== false}
									<PropDisplay bind:prop={propContainer[propKey]} />
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		{:else}
			<div
				class="flex flex-col gap-1 border-b-2 border-l-2 border-gray-200 rounded-bl-md hover:border-gray-400 border-solid pb-2 pl-2 "
			>
				{#each Object.keys(props) as propKey}
					{@const prop = props[propKey]}
					{#if prop.props && prop.input !== false}
						<svelte:self
							propName={propKey}
							indent={indent + 1}
							bind:parent={props[propKey]}
							bind:props={props[propKey].props}
							array={!!prop.array}
						/>
					{:else if prop.input !== false}
						<div class="flex flex-row gap-2 text-xs items-center">
							{#if prop.readOnly}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span
									on:click={() => {
										props[propKey].enabled = !prop.enabled;
										if (props[propKey].enabled === false) {
											props[propKey].value = null;
										} else {
											props[propKey].value = props[propKey].defaultValue;
										}
									}}
									class="whitespace-nowrap cursor-pointer {prop.enabled === false
										? 'text-gray-400 line-through'
										: ''}"
								>
									🔒 <b>{prop.label ? prop.label : propKey}</b>:</span
								>
							{:else}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span
									on:click={() => {
										props[propKey].enabled = !prop.enabled;
										if (props[propKey].enabled === false) {
											props[propKey].value = null;
										} else {
											props[propKey].value = props[propKey].defaultValue;
										}
									}}
									class="whitespace-nowrap cursor-pointer {prop.enabled === false
										? 'text-gray-400 line-through'
										: ''}"
								>
									<b>{prop.label ? prop.label : propKey}</b>:</span
								>
							{/if}
							{#if prop?.enabled !== false}
								<PropDisplay bind:prop={props[propKey]} />
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/if}
		{#if array}
			<button
				on:click={() => addMore()}
				class="-mt-1 mx-auto text-xs w-max mb-2 bg-gray-300 focus:(ring-3 ring-gray-500 outline-none) hover:bg-gray-400 px-2 py-1 rounded-md font-bold text-lg"
				>+</button
			>
		{/if}
	</div>
{/if}
