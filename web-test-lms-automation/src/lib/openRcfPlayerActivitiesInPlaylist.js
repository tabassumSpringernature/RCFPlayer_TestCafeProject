// @flow

import { waitForPageLoaded, activitySetLinkForPlaylist, openPlaylist, navigateToActivitySet } from './../pageModels/webTestLmsPageModel';
import { activityHasLoaded } from '../pageModels/rcfActivityPageModel';
import { t } from 'testcafe';

declare type Options = {
	activitySetIds: Array<string>,
	origin: string,
	role: string,
	studentId?: string,
	displayType?: string
};

const openRcfPlayerActivitiesInPlaylist = async ({ activitySetIds, origin, role, studentId, displayType }: Options) => {
	await t.navigateTo(navigateToActivitySet({ origin, role, studentId, displayType }));
	await waitForPageLoaded();
	for (const activitySetId of activitySetIds) {
		const link = activitySetLinkForPlaylist(activitySetId);
		await t.click(link);
	}
	await t.click(openPlaylist());
	await t.switchToIframe('iframe');
	await activityHasLoaded();
};
export default openRcfPlayerActivitiesInPlaylist;
