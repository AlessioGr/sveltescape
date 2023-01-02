<script lang="ts">
	import type { ShapeConfig } from '$lib/types';

	export let props: {
		demo?: boolean;
		shapes: ShapeConfig[];
	} = {
		shapes: [{ shapeType: 1, direction: 'top' }]
	};

	//Parsing shapes
	/*$: if(props && props.shapes && Array.isArray(props.shapes)){
    parseShapes();
  }*/
</script>

<div class={props.demo ? 'w-full relative' : ''}>
	{#if props && props.shapes && Array.isArray(props.shapes)}
		{#each props.shapes as shape}
			<div style={shape.containerStyle} class={shape.containerCSS}>
				<svg
					style={shape.svgStyle}
					xmlns="http://www.w3.org/2000/svg"
					viewBox={shape.viewBox}
					preserveAspectRatio="none"><path d={shape.pathD} /></svg
				>
			</div>
		{/each}
	{/if}
</div>

<style>
	.sInvertX {
		transform: scaleX(-1);
	}
	.sInvertY {
		transform: scaleY(-1);
	}
	.sInvertX.sInvertY {
		transform: scaleY(-1) scaleX(-1);
	}
	.topShape.sInvertY {
		@apply -top-1;
	}
	.topShape {
		@apply -top-5;
	}
	.bottomShape {
		@apply -bottom-1;
	}

	.shape svg {
		fill: currentColor;
		transform: translateX(-50%);
		position: relative;
		left: 50%;
		min-width: 100%;
	}
</style>
