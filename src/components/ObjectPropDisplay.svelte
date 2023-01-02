<script lang="ts">
	export let object;

	let keys = [];
	if (!Array.isArray(object)) {
		for (const key in object) {
			keys.push(key);
		}
	}
</script>

<div>
	{#if Array.isArray(object)}
		{#each object as objectValue}
			<svelte:self bind:object={objectValue} /><br />
		{/each}
	{:else}
		{#each keys as key}
			{#if typeof key === 'object' && Array.isArray(object[key])}
				{#each key as objectValue}
					<svelte:self bind:object={objectValue} />
				{/each}
			{:else}
				{#if object[key]['readOnly']}
					<label class="whitespace-nowrap"> 🔒 <b>{key}</b>:</label>
				{:else}
					<label class="whitespace-nowrap"> <b>{key}</b>:</label>
				{/if}
				<input
					class="ObjectPropDisplay bg-gray-100 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5 focus-visible:(border-blue-600 bg-blue-600 bg-blue-50)"
					bind:value={object[key]}
					placeholder={object[key]}
				/><br /><br />
			{/if}
		{/each}
	{/if}
</div>
