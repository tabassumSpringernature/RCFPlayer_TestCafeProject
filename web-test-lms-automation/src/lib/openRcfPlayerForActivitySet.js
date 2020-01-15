// @flow

import { waitForPageLoaded, activitySetLinkForId, openPlaylist, navigateToActivitySet } from '../pageModels/webTestLmsPageModel';
import { activityHasLoaded } from '../pageModels/rcfActivityPageModel';
import { t } from 'testcafe';

declare type Options = {
	activitySetId: string,
	origin: string,
	role: string,
	studentId?: string,
	displayType?: string
};

const openRcfPlayerForActivitySet = async ({ activitySetId, origin, role, studentId, displayType }: Options) => {
	await t.navigateTo(navigateToActivitySet({ origin, role, studentId, displayType }));
	await t.eval(() => location.reload(true));
	await waitForPageLoaded();

	const link = activitySetLinkForId(activitySetId);
	await t.click(link);
	if (origin === 'homework') {
		//we shouldn't be opening a single activity from homework but if we do make sure we open the playlist
		await t.click(openPlaylist());
	}
	await t.switchToIframe('iframe');
	await activityHasLoaded();
};
export default openRcfPlayerForActivitySet;
