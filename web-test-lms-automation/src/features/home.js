// @flow

import {
	navigateToDevTemplate,
	activitySetLinks,
	activitySetLinkForId,
	waitForPageLoaded as webTestLmsWaitForPageLoaded
} from '../pageModels/webTestLmsPageModel';
import { waitForPageLoaded as rcfPlayerDebugViewWaitForPageLoaded } from '../pageModels/rcfPlayerDebugView';

fixture('Homepage')
	.page(navigateToDevTemplate())
	.afterEach(async (t) => {
		await t.switchToMainWindow();
	});

const testActivitySetId = '00017cae8bd84f55977c8770dc8dab62';

// (Just checks first 10 links)
test('activity set links shown', async (t) => {
	await webTestLmsWaitForPageLoaded();

	const linkCount = 10;
	const activitySetLinkIds = await activitySetLinks(linkCount);
	await t
		.expect(activitySetLinkIds)
		.eql([
			'200e7195914344878429fa17b1988b6f_practice',
			'4ef287a98174446dbb04b31281dad0ea_test',
			'cf40a6d2e88940e7952ec5ed3c2c80b4_test',
			'3ec678a8311141818b02b17ec00d2316_practice',
			'abfe6900f70f49279bee4ab897c6e988_practice',
			'09b3ae1fa88247d5a3850daef66c79f9_practice',
			'83999cc92d844002a8c2a14642ca4a1a_practice',
			'ea97cb69f3164252a0f1385e921c5ef2_practice',
			'a29e8b99ee8a49c8a0c870938f6e67f8_practice',
			'8e467ea3a6cb4736b478faf059a2847c_practice'
		]);
});

test('clicking on activity set link opens rcf player', async (t) => {
	await webTestLmsWaitForPageLoaded();
	await t.click(activitySetLinkForId(testActivitySetId));

	await t.switchToIframe('iframe');
	await rcfPlayerDebugViewWaitForPageLoaded();
});
