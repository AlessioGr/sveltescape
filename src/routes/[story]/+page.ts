import type { PageLoad } from './$types';
import { stories } from '$lib/config';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, url }) => {
	const storyName = params.story;
	const componentOnly = url.searchParams.get('componentOnly');
	const componentOnlyHideToolbar = url.searchParams.get('componentOnlyHideToolbar');
	const maxWidth = url.searchParams.get('maxWidth');

	const propsEncoded = url.searchParams.get('props');
	let propsDecoded;
	if (propsEncoded) {
		propsDecoded = JSON.parse(decodeURI(propsEncoded));
	}

	let foundStory;
	for (const story of stories) {
		if (story.name === storyName) {
			foundStory = story;
		}
	}

	if (!foundStory) {
		throw error(400, 'Story not found');
	}

	if (propsDecoded) {
		foundStory.props = propsDecoded;
	}

	return {
		story: foundStory,
		componentOnly: componentOnly ? componentOnly === 'true' : false,
		componentOnlyHideToolbar: componentOnlyHideToolbar
			? componentOnlyHideToolbar === 'true'
			: false,
		maxWidth: maxWidth ? Number.parseInt(maxWidth) : 0
	};
};
