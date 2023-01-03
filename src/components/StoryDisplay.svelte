<script lang="ts">
	import type { ProcessedValue, Prop, Props, Story } from '$lib/types';
	import AllPropsDisplay from '$components/AllPropsDisplay.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { deepCopy } from 'windicss/utils';
	import { Switch } from '@rgossiaux/svelte-headlessui';

	import {
		finalComponentCodeValueToOutputProps,
		initStoryPropsAndOutputProps,
		outputPropsToStoryProps,
		processProps,
		propsOutputToPropsString,
		storyPropsToOutputProps
	} from '$lib/PropManager';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let story: Story;
	export let componentOnly = false;
	export let maxWidth = 0;
	export let componentOnlyHideToolbar = false;

	let propResults: Record<string, unknown> = {};

	let oldStoryName;

	let propsString = '';

	let loadedInitial = false;

	//$: console.log("Props now:", props);

	/*function findStoryPropFromDeepKey(parentPath: string[], key: string){ //TODO
        let currentProps: Props|PropsArray = story.props;
        for(const pathKey of parentPath){
            if(Array.isArray(currentProps)){
                for(const props of currentProps){
                    if(propKey === pathKey){
                        //console.warn("Setting currentprop to propkeything", propKey, "and prop", prop)
                        currentProps = prop;
                        break;
                    }
                }
            }
            for(const propKey in currentProps){
                const prop: Prop = currentProps[propKey];
                if(prop.key) {
                    if(prop.key === pathKey){
                        if(prop.props){
                            currentProps = prop.props;
                            break;
                        }
                    }
                }else {
                    // console.warn("Else! propKey", propKey, "pathKey", pathKey)
                    if(propKey === pathKey){
                        //console.warn("Setting currentprop to propkeything", propKey, "and prop", prop)
                        currentProps = prop;
                        break;
                    }
                }

            }
        }
        for(const prop of currentProps){
            if(prop.key === key){
                return prop;
            }
        }

        console.error("Returning null. Currentprops", currentProps, "Parentpath", parentPath, "Key", key, "AllProps", story.props, ". This should not happen!")
        return null;
    }

    function propagateFromPropResultsToStoryValues(propResults, parentPath: string[] ){
        for(const propKey in propResults){
            console.info("Checking key", propKey, "...")
            if (typeof propResults[propKey] === 'object') {
                let newParentPath = deepCopy(parentPath)
                newParentPath.push(propKey)
                propagateFromPropResultsToStoryValues(propResults[propKey], newParentPath)
            }else{
                if(parentPath.length === 0){
                    const foundProp = story.props[propKey];
                    if(foundProp){
                        foundProp.value = propResults[propKey];
                    }
                }else {
                    //Hard, as now both propResults and story.props has to be traversed recursively
                    let propToModify = findStoryPropFromDeepKey(parentPath, propKey);
                    if(propToModify){
                        if(propToModify.value !== propResults[propKey]){
                            console.warn("DIFFERENT VALUE - WONT SKIP")
                        }
                        console.error("propKey", propKey)


                        propToModify.value = propResults[propKey];
                        //console.error("Modified", propKey, "with path", parentPath, "prop value from ", oldValue, "to", propToModify.value + ". Propresults:", propResults, "propKey:", propKey, "inside:", propResults[propKey], ".viewBox", propResults.viewBox, "typeof propresults", typeof propResults, "all keys of propresults:", Object.keys(propResults))
                    }else{
                        console.error("Could not find prop to modify for key", propKey, "and path", parentPath, "in story props", story.props)
                    }
                }
            }
        }
    }*/

	//Component => Editor
	//$: handlePropResultsEdited(propResults); //TODO: This currently still breaks

	//Editor => Component
	$: handleStoryPropsEdited(story, story?.props);

	/*function handlePropResultsEdited(propResults) {
        console.log("propResults reactivity", propResults)
        return;
        if(!propResults?.shapes){
            console.error("Skipping handlePropResultsEdited as no shapes.")
            return;
        }
        const results2 = deepCopy(propResults);
        console.error("propResults", propResults?.shapes[0])
        console.error("results2", results2?.shapes[0])
        console.error("Propagating prop changes from component => story.props", deepCopy(propResults))
        propagateFromPropResultsToStoryValues(propResults, [])
    }*/

	function handleStoryPropsEdited(story: Story, props: Props) {
		console.log('story.props Reactivity');

		/*if(oldStoryName && story.name !== oldStoryName){ //TODO: Not sure if useful
            $page.url.searchParams.set('props',null);
            if(browser){
                goto(`?${$page.url.searchParams.toString()}`);
            }
        }*/

		if (!loadedInitial || story.name !== oldStoryName) {
			loadInitial();

			/*if(browser){
                $page.url.searchParams.set('props',encodeURI(JSON.stringify(story.props)));
                goto(`?${$page.url.searchParams.toString()}`);
            }*/
			return;
		}
		propResults = storyPropsToOutputProps(processProps(story.props, story), null);
		propsString = propsOutputToPropsString(propResults);
		updateFinalComponentCodeValueFromPropEditor();

		/*if(browser){
            $page.url.searchParams.set('props',encodeURI(JSON.stringify(story.props)));
            goto(`?${$page.url.searchParams.toString()}`);
        }*/

		if (justConvertedComponentCodeValue) {
			justConvertedComponentCodeValue = false;
			automaticComponentCodeValueUpdate = false;
		}
	}
	function loadInitial() {
		loadedInitial = true;
		console.log('loadinitial 1');
		initStoryPropsAndOutputProps(story.props, true);
		propResults = initStoryPropsAndOutputProps(processProps(story.props, story), true);
		console.log('loadinitial 2');
		oldStoryName = story.name;
		propsString = propsOutputToPropsString(propResults);
		console.log('loadinitial 3');
		updateFinalComponentCodeValueFromPropEditor();
	}

	let automaticComponentCodeValueUpdate = false;
	let justConvertedComponentCodeValue = false;

	let finalComponentCodeValue = '<' + story.name + ' ' + propsString + '/>';

	function updateFinalComponentCodeValueFromPropEditor() {
		automaticComponentCodeValueUpdate = true;
		finalComponentCodeValue = '<' + story.name + ' ' + propsString + '/>';
		console.log(
			'%c updateFinalComponentCodeValueFromPropEditor',
			'background: #222; color: #bada55'
		);
	}

	function updatePropEditorFromFinalComponentCodeValue(componentCodeValue) {
		if (automaticComponentCodeValueUpdate) {
			automaticComponentCodeValueUpdate = false;
			console.log('Skipped the update!');
			return;
		}
		console.log('Updating props from component code value...');

		const convertedStoryProps = outputPropsToStoryProps(
			deepCopy(story.props),
			finalComponentCodeValueToOutputProps(componentCodeValue, story)
		);
		story.props = convertedStoryProps;
		console.warn('convertedStoryProps', convertedStoryProps);
		automaticComponentCodeValueUpdate = false;
		justConvertedComponentCodeValue = true;
	}

	$: updatePropEditorFromFinalComponentCodeValue(finalComponentCodeValue);
</script>

{#if !componentOnly || (componentOnly && componentOnlyHideToolbar === false)}
	<div
		class="{componentOnly
			? ''
			: ''} items-center absolute top-1 right-4 flex flex-row z-1000 bg-white rounded-md px-2 py-0.5"
	>
		{#if componentOnly}
			<span class="mr-2 font-semibold text-sm">Max-Width</span>
			<input
				type="number"
				inputmode="numeric"
				class="w-20 mr-4 bg-gray-100 outline-none border-b-2 border-gray-300 text-gray-900 rounded-t-md px-2 py-0.5 focus-visible:(border-blue-600 bg-blue-600 bg-blue-50)"
				bind:value={maxWidth}
				placeholder=""
			/>
		{/if}
		<span class="mr-2 font-semibold text-sm">Preview</span>
		<Switch
			checked={componentOnly}
			on:change={(e) => (componentOnly = e.detail)}
			class={componentOnly ? 'switch medium switch-enabled' : 'switch medium switch-disabled'}
		>
			<span class="sr-only">Enable preview</span>
			<span
				class:enabled={componentOnly}
				class="toggle"
				class:toggle-on={componentOnly}
				class:toggle-off={!componentOnly}
			/>
		</Switch>
	</div>
{/if}

{#if componentOnly}
	<div
		style={maxWidth && maxWidth > 0 ? 'align-items: center;' : ''}
		class="flex flex-col justify-center bg-white absolute {componentOnlyHideToolbar
			? 'w-full h-full'
			: 'w-screen h-screen'} left-0 z-500 pt-8.9"
	>
		<div
			style={maxWidth && maxWidth > 0
				? 'max-width: ' + maxWidth + 'px; width: ' + maxWidth + 'px;'
				: ''}
		>
			<svelte:component this={story.component} bind:props={propResults} />
		</div>
	</div>
{:else}
	<Splitpanes class="flex w-full h-full flex-col justify-between" horizontal={true}>
		<!-- Component and Props -->
		<Pane class="relative w-full h-full flex flex-row justify-between items-center">
			<Splitpanes class="bg-white">
				<!-- Component -->
				<Pane class="flex w-full justify-center items-center relative">
					<svelte:component this={story.component} bind:props={propResults} />
				</Pane>
				<!-- Props-->
				<Pane
					size={30}
					class="pt-8 flex flex-col py-4 h-full px-4 bg-white border-solid border-l-2 border-b-2 rounded-bl-md border-black overflow-scroll letoverflow"
				>
					<AllPropsDisplay
						propName={story.name}
						bind:props={story.props}
						bind:parent={story}
						array={!!story.props.array}
					/>
				</Pane>
			</Splitpanes>
		</Pane>

		<!-- Code -->
		<Pane
			size={10}
			class="relative flex flex-col py-4 px-4 bg-white border-solid border-t-2 border-l-2 border-black rounded-tl-md"
		>
			<button
				on:click={() => {
					navigator.clipboard.writeText('<' + story.name + ' ' + propsString + '/>');
				}}
				class="absolute right-2 top-2 bg-gray-300 focus:(ring-4 ring-gray-500 outline-none) hover:bg-gray-400 px-2 py-1 rounded-md"
				>Copy</button
			>
			<span class="font-bold">Code:</span>
			<textarea class="font-mono pr-6 h-full" bind:value={finalComponentCodeValue} />
		</Pane>
	</Splitpanes>
{/if}

<style>
	:global(.splitpanes.default-theme .splitpanes__pane) {
		background-color: unset !important;
	}

	:global(.letoverflow) {
		overflow-x: scroll !important;
		overflow-y: scroll !important;
	}
</style>
