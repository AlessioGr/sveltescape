import Header from '$components/stories/header/Header.svelte';
import type { Story } from '$lib/types';



export const HeaderConfig: Story = {
	component: Header,
	name: 'Header',
	props: {
		logoSRC: {
			defaultValue: '/assets/brand/logo.svg',
			type: 'string',
			valuePreprocessor: (value) => {
				return [
					{
						outputPropKey: 'logoSRC',
						value: value
					}
				];
			}
		},
		logoWidth: {
			type: 'number',
			defaultValue: undefined
		},
		logoHeight: {
			type: 'number',
			defaultValue: undefined
		},
		ownSizeCondition: {
			type: 'other',
			defaultValue: undefined
		},
		navLinks: {
			array: true,
			props: [
				{
					label: {
						defaultValue: 'Homepage',
						type: 'string'
					},
					href: {
						defaultValue: '/',
						type: 'string'
					}
				}
			]
		}
	}
};
