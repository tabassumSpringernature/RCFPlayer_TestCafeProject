// @flow

import type { Selector } from 'testcafe';

const getAttributes = async (selector: Selector, attributeName: string, count: ?number) => {
	const list = [];

	if (!count) {
		count = await selector.count;
	}

	for (let i = 0; i < count; i += 1) {
		list.push(selector.nth(i).getAttribute(attributeName));
	}

	return await Promise.all(list);
};

export default getAttributes;
