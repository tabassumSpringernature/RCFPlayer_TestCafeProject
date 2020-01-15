// @flow
import { Selector } from 'testcafe'
import { dragDropClosedGradableActivitySetId} from '../../lib/data/exampleActivitySet'
import {
  playerWindowToggleButton,
  playlistNavigationCloseButton
} from '../../pageModels/buttonsPageModel'
import {
  playerWindowedMode,
  playerMaximizedMode,
  playerFullScreenMode
} from '../../pageModels/componentsPageModel'
// import { windowType, windowTypeOption, activitySetLinkForId } from '../../pageModels/webTestLmsPageModel'
import  openRcfPlayerForActivitySetWithWindowType from '../../lib/openRcfPlayerForActivitySetWIthWindowType'
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist'
import { Selector } from 'testcafe';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import {activityHasLoaded} from '../../pageModels/rcfActivityPageModel';


fixture(
  'Answer Key Hotspot Teacher, single activity set in playlist, windowed'
).beforeEach(async () => {
	await openRcfPlayerForActivitySet({
	activitySetId: dragDropClosedGradableActivitySetId,
    origin: 'hotspot',
    role: 'teacher',
	displayType: 'windowed',
  });
});

test.only('open player with windowType as pop-up', async t => {
	// await t.expect(Selector('#in-tab-player').exists).ok();
  await t.switchToMainWindow();
	await t
		// .click(windowType)
		// .click(windowTypeOption.withText('Pop-up'))

	// const link = activitySetLinkForId(dragDropClosedGradableActivitySetId);
	// console.log('*********link: ' +link);
	// await t.click(link);
	await activityHasLoaded();
await t.wait(1000);

	await t.debug();

// 	await openRcfPlayerForActivitySetWithWindowType({
// 		activitySetId: dragDropClosedGradableActivitySetId,
// 		origin: 'hotspot',
// 		role: 'teacher',
// 		displayType: 'windowed',
// 		windowType: 'tab'
// });
});
https://uatstudent.macmillaneducationeverywhere.com/login
fixture`Getting Started`
	.page`https://uatstudent.macmillaneducationeverywhere.com/login`;
test('My first test', async t => {
	await t
		.typeText('#LoginuserId', 'nsujgure')
		.typeText('#LoginPassword', 'Admin@123456')
		.click('#LoginSubmit')
		.wait(10000)
		.debug()
	console.log("Welcome to Testcafe");
});
