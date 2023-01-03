import type { Props, Story, PropsArray } from '$lib/types';
import pkg from 'really-relaxed-json';
import type { ProcessedValue, Prop } from '$lib/types';
import { toRelaxedJson } from '$lib/config';
import { deepCopy } from 'windicss/utils';
const { prettyPrint, Options } = pkg;
// Story Props: Props
// => outputProps: Record<string, unknown>
// => propsString: props={...} />
// => finalComponentCodeValue: <Shapes props={...} />

/*
    Outputs the initial outputProps and mutates the props input (which is story.props) to get
    their first, initial default values
 */
export function initStoryPropsAndOutputProps(
	props: Props,
	first: boolean
): Record<string, unknown> {
	const outputProps: Record<string, unknown> = {};

	for (const propKey in props) {
		const prop: Prop = props[propKey];
		if (!prop) {
			continue;
		}
		if (!prop.enabled === false) {
			prop.enabled = true;
		}

		if (prop.props) {
			if (!prop.array) {
				if (prop.enabled === false) {
					outputProps[propKey] = undefined;
					continue;
				}
				if (prop.output === false) {
					outputProps[propKey] = undefined;
					initStoryPropsAndOutputProps(prop.props as Props, false); //Load just to set default values but ignore localProps
					continue;
				}
				outputProps[propKey] = initStoryPropsAndOutputProps(prop.props as Props, false);
			} else {
				if (prop.enabled === false) {
					outputProps[propKey] = undefined;
					continue;
				}
				if (prop.output === false) {
					outputProps[propKey] = undefined;
					for (const arrayEntry of prop.props as PropsArray) {
						initStoryPropsAndOutputProps(arrayEntry as Props, false); //Load just to set default values but ignore localProps
					}
					continue;
				}
				if (!outputProps[propKey]) {
					outputProps[propKey] = [];
				}
				for (const arrayEntry of prop.props as PropsArray) {
					outputProps[propKey].push(initStoryPropsAndOutputProps(arrayEntry as Props, false));
				}
			}
			continue;
		}

		if (prop.type === 'story') {
			console.warn('Processing story...', prop);

			initStoryPropsAndOutputProps((prop.specialType as Story).props, true);
			if (prop.defaultValue && prop.enabled !== false) {
				const initProps = outputPropsToStoryProps(
					(prop.specialType as Story).props,
					prop.defaultValue as Record<string, unknown>,
					true
				);
				(prop.specialType as Story).props = initProps;
				console.error('settting initProps', deepCopy(initProps));
			}

			outputProps[propKey] = storyPropsToOutputProps(
				processProps((prop.specialType as Story).props, prop.specialType as Story),
				null
			);
			console.warn('Output...', outputProps[propKey]);
			return outputProps;
		}

		if (prop.enabled === false) {
			continue;
		}
		if (!prop.value) {
			outputProps[propKey] = undefined;
			prop.value = prop.defaultValue;
		}
		if (!prop.valuePreprocessor) {
			if (prop.output !== false) {
				outputProps[propKey] = prop.value;
			}
		} else {
			const processedValues: ProcessedValue[] = prop.valuePreprocessor(prop.value);
			for (const processedValue of processedValues) {
				if (prop.output !== false) {
					outputProps[processedValue.outputPropKey] = processedValue.value;
				}
			}
		}
	}
	if (first) {
		//loadedInitial = true;
	}
	return outputProps;
}

/*
    This function takes a story's props and returns a version with just key and value pairs
    which should be outputted
 */
export function storyPropsToOutputProps(props: Props, parent: any): Record<string, unknown> {
	console.log('Storypropstooutputprops');

	if (parent?.enabled === false) {
		if (parent && parent.array) {
			console.log('Disabled 1');
			return undefined;
		} else {
			console.log('Disabled 2');
			return undefined;
		}
	}
	const outputProps: Record<string, unknown> = {};
	for (const propKey in props) {
		const prop = props[propKey];
		if (!prop || prop.enabled === false || prop.output === false) {
			outputProps[propKey] = undefined;
			continue;
		}
		if (prop.props) {
			if (!prop.array) {
				outputProps[propKey] = storyPropsToOutputProps(prop.props as Props, prop);
			} else {
				if (!outputProps[propKey]) {
					outputProps[propKey] = [];
				}
				for (const arrayEntry of prop.props as PropsArray) {
					outputProps[propKey].push(storyPropsToOutputProps(arrayEntry as Props, prop));
					if (outputProps[propKey].length === 1 && outputProps[propKey][0].length === 0) {
						console.error('Handling deletion edge case for ', outputProps[propKey], '...');
						outputProps[propKey] = undefined;
					}
				}
			}
			continue;
		}
		const type = prop.type;
		let value = prop.value;

		//console.warn("Key:", propKey, "Type:",type)

		//make numbers numbers and not strings
		if (type === 'number') {
			const value2 = Number(value);
			if (isNaN(value2)) {
				value = '';
			} else {
				value = value2;
			}
		} else if (type === 'other') {
			//like functions
			//TODO
		}

		if (prop.type === 'story') {
			console.warn('Processing story...', prop);
			outputProps[propKey] = storyPropsToOutputProps(
				processProps((prop.specialType as Story).props, prop.specialType as Story),
				null
			);
			return outputProps;
		}

		if (!prop.valuePreprocessor) {
			outputProps[propKey] = value;
		} else {
			const processedValues: ProcessedValue[] = prop.valuePreprocessor(value);
			for (const processedValue of processedValues) {
				outputProps[processedValue.outputPropKey] = processedValue.value;
			}
		}
	}

	console.log('sptop result', outputProps);
	return outputProps;
}

/*
 * Story prop pre- and post-processors
 */
export function processProps(props: Props, story: Story): Props {
	if (!story.storyPropsPreProcessor) {
		// => Only clone
		if (!story.storyPropsPostProcessor) {
			return props;
		} else {
			const propsClone = structuredClone(props);
			return story.storyPropsPostProcessor(propsClone);
		}
	} else {
		//Modify for Pre
		if (!story.storyPropsPostProcessor) {
			props = story.storyPropsPreProcessor(props);
			return props;
		} else {
			props = story.storyPropsPreProcessor(props);
			const propsClone = structuredClone(props);
			return story.storyPropsPostProcessor(propsClone);
		}
	}
}

/*
 * Converts the propsOutput (resulting from story props) to a string which can be used when declaring the component
 * Format: props={stringifiedprops}.
 */
export function propsOutputToPropsString(outputProps: Record<string, unknown>): string {
	let propsString = '{';
	if (!outputProps) {
		return;
	}

	for (const key in outputProps) {
		let value: unknown = outputProps[key];

		if (!value) {
			continue;
		}

		const typeOfOutputProps = typeof outputProps[key];
		//console.warn("Type of", key, "is", type);
		value = getStringifiedValue(value);

		const isString = typeOfOutputProps === 'string' || outputProps[key] instanceof String;
		if (isString) {
			propsString += key + ': "' + value + '", ';
		} else {
			propsString += key + ': ' + value + ', ';
		}
	}
	propsString += '}';
	//console.log("Prettyprinting ", propsString)
	propsString = prettyPrint(Options.JsPretty, propsString);
	//console.log("Result", propsString)
	propsString = 'props={' + propsString + '}';
	return propsString;
}

export function finalComponentCodeValueToOutputProps(
	finalComponentCodeValue: string,
	story: Story
) {
	const extractedPropsString = finalComponentCodeValue.substring(
		story.name.length + 3,
		finalComponentCodeValue.length - 3
	);

	const pureProps = extractedPropsString.substring(6, extractedPropsString.length);
	let purePropsJSON;
	try {
		purePropsJSON = toRelaxedJson(pureProps);
	} catch (e) {
		return null;
	}
	return purePropsJSON;
}
export function outputPropsToStoryProps(
	storyProps: Props,
	propResults: Record<string, unknown>,
	modifyDefaultValue?: boolean
) {
	for (const key in propResults) {
		const value = propResults[key];
		if (typeof value === 'object' && Array.isArray(value)) {
			//array
			let counter = 0;
			for (const item of value) {
				storyProps[key].props[counter] = outputPropsToStoryProps(
					storyProps[key].props[counter],
					item
				); //storyProps[key].props is PropsArray
				counter++;
			}
		} /*else if(false){ // no array, but has nested prop?

        }*/ else if (storyProps[key]) {
			if (value === null) {
				storyProps[key].enabled = false;
			}
			if (modifyDefaultValue && storyProps[key].enabled !== false) {
				storyProps[key].defaultValue = value;
			}
			storyProps[key].value = value;
		}
	}
	console.warn('storyProps result', storyProps);
	return storyProps;
}

function getStringifiedValue(value: unknown) {
	const type = typeof value;
	if (type === 'object') {
		value = JSON.stringify(value);
	}
	return value;
}
