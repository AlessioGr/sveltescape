<script lang="ts">
	import { generateBezierCurveSVG, generateZigZagSVG } from '$components/stories/SVGGenerator';
	import type { ShapeConfig } from '$lib/types';

	export let props: {
		demo?: boolean;
		shapes: ShapeConfig[];
	} = {
		shapes: [{ shapeType: 1, direction: 'top' }]
	};

	//Parsing shapes
	$: if (props && props.shapes && Array.isArray(props.shapes)) {
		parseShapes();
	}
	function parseShapes() {
		for (const shape of props.shapes) {
			if (shape.direction === 'top' && shape.invertY === undefined) {
				console.log('Triggered Shapes update!');
				shape.invertY = true;
				props = props; //Trigger update!
			}

			shape.containerCSS =
				'shape left-0 right-0 absolute overflow-hidden pointer-events-none leading-0 z-2 ';
			shape.containerCSS +=
				(shape.direction === 'top' ? 'topShape ' : 'bottomShape ') +
				(shape.invertX ? 'sInvertX ' : '') +
				(shape.invertY ? 'sInvertY ' : '');

			shape.containerStyle = '';
			let defaultHeight;
			let viewBox;
			let pathD;
			if (!shape.generatedCurve && !shape.generatedZigZag) {
				switch (shape.shapeType) {
					case 1:
						defaultHeight = shape.direction === 'top' ? 100 : 120;
						viewBox = '0 0 1200 194.3';
						pathD =
							'M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z';
						break;
					case 2:
						defaultHeight = 40;
						viewBox = '0 0 1200 350';
						pathD = 'M1200 350V0C22.4 60.3 0 336.7 0 336.7V350h1200z';
						break;
					case 3:
						defaultHeight = 60;
						viewBox = '0 0 1200 194.3';
						pathD =
							'M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z';
						break;
					case 4: //zigzag
						viewBox = '0 0 1200 100';
						defaultHeight = 60;
						pathD = 'M1200 77.2L400 0 0 77.2V100h1200z';
						break;
					case 6: //zigzag Like an inverted 4
						viewBox = '0 0 1200 100';
						defaultHeight = 80;
						pathD = 'M1200 100H0V0l400 77.2L1200 0z';
						break;
					case 5:
						viewBox = '0 0 1200 176';
						defaultHeight = 120;
						pathD = 'M0 176h1200V14L800 88 400 0 0 156z';
						break;
					case 7: //round
						viewBox = '0 0 1200 150.98286501068407';
						defaultHeight = 400;
						pathD =
							'M 0 120C 201.8178479351445 120, 201.8178479351445 134.9622588591544, 403.635695870289 134.9622588591544C 591.4325058019131 134.9622588591544, 591.4325058019131 107.27091068634763, 779.2293157335371 107.27091068634763C 963.0609152139592 107.27091068634763, 963.0609152139592 150.98286501068407, 1146.8925146943814 150.98286501068407 V 194.3 H 0 V 0';
						break;
				}
			} else {
				let result: { dPath: string; height: number };
				if (shape.generatedCurve) {
					result = generateBezierCurveSVG(
						shape.generatedCurve.seed,
						shape.generatedCurve.amplitude,
						shape.generatedCurve.waveCount,
						shape.generatedCurve.waveLength,
						shape.generatedCurve.invert
					);
				} else if (shape.generatedZigZag) {
					result = generateZigZagSVG(
						shape.generatedZigZag.seed,
						shape.generatedZigZag.amplitude,
						shape.generatedZigZag.waveCount,
						shape.generatedZigZag.waveLength,
						shape.generatedZigZag.invert
					);
				}
				viewBox = `0 0 1200 ${result.height}`;
				defaultHeight = 400;
				pathD = result.dPath;
			}

			if (shape.defaultHeight) {
				defaultHeight = shape.defaultHeight;
			}

			if (!shape.viewBox) {
				shape.viewBox = viewBox;
			}
			if (!shape.pathD) {
				shape.pathD = pathD;
			}

			shape.svgStyle = 'width: calc(100% + 1px); height: ' + defaultHeight + 'px; ';

			if (shape.darkBG) {
				shape.containerCSS += 'text-background-white dark:text-background-dark-50 ';
			} else {
				shape.containerCSS += 'text-background-light-100 dark:text-background-dark-100 ';
			}

			if (shape.yScale) {
				const newHeight = defaultHeight * shape.yScale;
				shape.svgStyle += 'height: ' + newHeight + 'px; ';
			}
			if (shape.yShift) {
				shape.containerStyle += 'bottom: ' + shape.yShift + 'px; ';
			}

			if (shape.xScale) {
				shape.svgStyle += 'width: calc(' + 100 * shape.xScale + '%); ';
			}
			if (shape.xShift) {
				shape.containerStyle += 'left: ' + shape.xShift + 'px; ';
			}

			if (shape.colorCSS) {
				shape.containerStyle += 'color: ' + shape.colorCSS + '; ';
			}
		}
	}
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
