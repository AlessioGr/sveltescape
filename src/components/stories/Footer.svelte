<script lang="ts">
	import Shapes from '$components/stories/Shapes.svelte';
	import type { Link, ShapeConfig } from '$lib/types';

	export let props: {
		logoSRC: string;
		logoWidth: number;
		logoHeight: number;
		color: string;
		shapes: {
			demo?: boolean;
			shapes: ShapeConfig[];
		};
		footerBar: {
			left: Link[];
			right: Link[];
		};
	};

	const currentLocale = null;
	/*
    shapes:[
    {
        shapeType: 6,
        direction: "top",
    },
    ]
    */
</script>

<footer
	style="background-color: {props.color};"
	class="flex flex-col relative inline-block overflow-hidden w-full pt-24 text-white px-4"
>
	<Shapes props={props.shapes} />

	<div class="grid overflow-hidden grid-cols-3 grid-rows-1 gap-4 py-4">
		<div class="box col-start-1 flex flex-col">
			<a href={$currentLocale ? '/' + $currentLocale.simple : '/'}>
				<img
					class="w-70"
					src={props?.logoSRC}
					alt="logo"
					width={props?.logoWidth}
					height={props?.logoHeight}
				/>
			</a>
			<p>alessio@bonfireleads.com</p>
		</div>
		<div class="box col-start-2 col-span-1 flex flex-col uppercase">
			<p>Column 2 text</p>
		</div>
		<div class="box col-start-3 col-span-1 flex flex-col uppercase">
			<p>Contact</p>
			<p>Link2</p>
			<p>Link3</p>
		</div>
	</div>

	<!-- Bottom footer -->
	<div
		class="flex flex-row justify-between uppercase font-semibold border-white border-t-3 pt-4 pb-4"
	>
		<div class="flex flex-row gap-3">
			{#each props.footerBar.left as link}
				{#if link.href}
					<a style={link.colorHex ? 'color: ' + link.colorHex + ';' : ''} href={link.href}
						>{link.label}</a
					>
				{:else}
					<span style={link.colorHex ? 'color: ' + link.colorHex + ';' : ''}>{link.label}</span>
				{/if}
			{/each}
		</div>
		<ul class="flex flex-row gap-4 font-bold uppercase">
			{#each props.footerBar.right as link}
				{#if link.href}
					<li>
						<a style={link.colorHex ? 'color: ' + link.colorHex + ';' : ''} href={link.href}
							>{link.label}</a
						>
					</li>
				{:else}
					<li>
						<span style={link.colorHex ? 'color: ' + link.colorHex + ';' : ''}>{link.label}</span>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</footer>
