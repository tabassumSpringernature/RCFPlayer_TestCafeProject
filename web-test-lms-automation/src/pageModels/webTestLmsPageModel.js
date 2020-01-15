// @flow

import { Selector } from 'testcafe';
import getAttributes from '../lib/getAttributes';
import { getWebTestLmsRootUrl } from '../lib/config';

const activitySetIdAttribute = 'data-activity-set-id';
const appUrl = getWebTestLmsRootUrl();

export const activitySetLinkForId = (activitySetId: string) => Selector('.App-link').withAttribute(activitySetIdAttribute, activitySetId);
export const activitySetLinkForPlaylist = (activitySetId: string) =>
	Selector('.App-link')
		.withAttribute(activitySetIdAttribute, activitySetId)
		.parent()
		.prevSibling();
export const activitySetLinks = (count: number): Promise<Array<string>> =>
	getAttributes(Selector('.App-link'), activitySetIdAttribute, count);
export const openPlaylist = () => Selector('.playlistButton');
export const waitForPageLoaded = Selector('title').withExactText('web test lms');
export const closePlayer = Selector('.App-tool button:nth-child(2)');

declare type NavigateToActivitySetOptions = {
	origin: string,
	role: string,
	studentId?: string,
	displayType?: string
};

export const navigateToDevTemplate = (): string => `${appUrl}#window-type=iframe&dev-template=true`;

export const navigateToActivitySet = ({
	origin,
	role,
	studentId = 'student123',
	displayType = 'windowed'
}: NavigateToActivitySetOptions): string =>
	`${appUrl}#window-type=iframe&link-origin=${origin}&user-role=${role}&student-id=${studentId}&display-type=${displayType}`;
