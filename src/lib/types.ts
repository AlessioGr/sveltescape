export type Story = {
	component;
	name: string;
	label?: string;
	props?: Props;
	storyPropsPreProcessor?: (props: Props) => Props; //Like valuePreprocessor but runs afterwards and for all props of the story
	storyPropsPostProcessor?: (props: Props) => Props; //Like storyPropsPreProcessor but changes only the result, not what you can see in the props
};

export type Props = Record<string, Prop>;
export interface Prop {
	array?: boolean;
	label?: string;
	enabled?: boolean;
	defaultValue?;
	readOnly?: boolean;
	value?;
	type?: 'string' | 'number' | 'boolean' | 'object' | 'other' | 'story';
	specialType?: 'hexColor' | 'enum' | Story;
	specialTypeArgs?;
	valuePreprocessor?: (value) => ProcessedValue[];
	props?: Props | Props[];
	input?: boolean; //Controls if the prop should be visible in the prop editor. If set to false, it will still be outputted
	output?: boolean; //Controls if the prop should be visible in the outputted component code or the component props
}

export type ProcessedValue = {
	outputPropKey: string;
	value;
};

export type Link = {
	label: string;
	href?: string;
	colorHex?: string;
	subLinks?: Link[];
};
export type NavLinks = Link[];

export type ShapeConfig = {
	shapeType: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	direction: 'top' | 'bottom';
	xScale?: number;
	xShift?: number;
	yScale?: number;
	yShift?: number;
	darkBG?: boolean;
	colorCSS?: string;
	containerCSS?: string;
	containerStyle?: string;
	svgStyle?: string;
	viewBox?: string;
	pathD?: string;
	invertX?: boolean;
	invertY?: boolean;
	defaultHeight?: number;
	generatedCurve?: {
		seed: string;
		amplitude: number;
		waveCount: number;
		waveLength: number;
		invert: boolean;
	};
	generatedZigZag?: {
		seed: string;
		amplitude: number;
		waveCount: number;
		waveLength: number;
		invert: boolean;
	};
};
