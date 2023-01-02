<script lang="ts">
	import type { Prop } from '$lib/types';
	import ObjectPropDisplay from '$components/ObjectPropDisplay.svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
	import AllPropsDisplay from '$components/AllPropsDisplay.svelte';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
		Switch
	} from '@rgossiaux/svelte-headlessui';

	export let prop: Prop;
	import { slide } from 'svelte/transition';
</script>

{#if prop.type === 'string'}
	{#if prop.specialType && prop.specialType === 'hexColor'}
		{#if prop.readOnly}
			<div class="px-4 py-3 rounded-md" style="background-color: {prop.value};" />
			<span>{prop.value}</span>
		{:else}
			<div class="-m-1.5">
				<ColorPicker bind:hex={prop.value} label={prop.value} />
			</div>
		{/if}
	{:else if prop.specialType && prop.specialType === 'enum'}
		{#if prop.readOnly}
			<input
				readonly
				type="text"
				class="bg-gray-300 outline-none border-0 text-gray-900 rounded-t-md px-2 py-0.5"
				bind:value={prop.value}
				placeholder={prop.defaultValue}
			/>
		{:else}
			<Listbox value={prop.value} on:change={(e) => (prop.value = e.detail)} let:open>
				<ListboxButton
					class="active:(border-blue-600 bg-blue-600 bg-blue-50) bg-gray-100 border-b-2 border-solid border-gray-300 px-4 py-0.5 rounded-t-md"
					>{prop.value}</ListboxButton
				>
				{#if open}
					<div class="shadow-md absolute bg-white rounded-md z-100" transition:slide>
						<ListboxOptions class="">
							{#each prop.specialTypeArgs as possibleValue}
								<ListboxOption
									class="px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
									value={possibleValue}
								>
									{possibleValue}
								</ListboxOption>
							{/each}
						</ListboxOptions>
					</div>
				{/if}
			</Listbox>
		{/if}
	{:else if prop.readOnly}
		<input
			readonly
			type="text"
			class="bg-gray-300 outline-none border-0 text-gray-900 rounded-t-md px-2 py-0.5"
			bind:value={prop.value}
			placeholder={prop.defaultValue}
		/>
	{:else}
		<input
			type="text"
			class="bg-gray-100 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5 focus-visible:(border-blue-600 bg-blue-600 bg-blue-50)"
			bind:value={prop.value}
			placeholder={prop.defaultValue}
		/>
	{/if}
{:else if prop.type === 'object'}
	<div>
		<br />
		<ObjectPropDisplay bind:object={prop.value} />
	</div>
{:else if prop.type === 'number'}
	{#if prop.readOnly}
		<input
			readonly
			type="number"
			inputmode="numeric"
			class="bg-gray-300 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5"
			bind:value={prop.value}
			placeholder={prop.defaultValue}
		/>
	{:else}
		<input
			type="number"
			inputmode="numeric"
			class="bg-gray-100 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5 focus-visible:(border-blue-600 bg-blue-600 bg-blue-50)"
			bind:value={prop.value}
			placeholder={prop.defaultValue}
		/>
	{/if}
{:else if prop.type === 'boolean'}
	{#if prop.readOnly}
		<input
			readonly
			type="checkbox"
			class="rounded-md"
			bind:checked={prop.value}
			placeholder={prop.defaultValue}
		/>
	{:else}
		<Switch
			checked={prop.value}
			on:change={(e) => (prop.value = e.detail)}
			class={prop.value ? 'switch small switch-enabled' : 'switch small switch-disabled'}
		>
			<span class="sr-only">Enable preview</span>
			<span class="toggle" class:toggle-on={prop.value} class:toggle-off={!prop.value} />
		</Switch>
	{/if}
{:else if prop.type === 'story' && typeof prop.specialType === 'object'}
	<div>
		<AllPropsDisplay
			propName={prop.specialType.name}
			bind:props={prop.specialType.props}
			bind:parent={prop.specialType}
			array={!!prop.specialType.props.array}
		/>
	</div>
{:else if prop.readOnly}
	<input
		readonly
		type="text"
		class="bg-gray-300 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5"
		bind:value={prop.value}
		placeholder={prop.defaultValue}
	/>
{:else}
	<input
		type="text"
		class="bg-gray-100 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5 focus-visible:(border-blue-600 bg-blue-600 bg-blue-50)"
		bind:value={prop.value}
		placeholder={prop.defaultValue}
	/>
{/if}
