// @flow
import {
	navigateToDevTemplate,
	activitySetLinkForId,
	waitForPageLoaded as webTestLmsWaitForPageLoaded
} from '../pageModels/webTestLmsPageModel';

import { waitForPageLoaded as rcfPlayerDebugViewWaitForPageLoaded } from '../pageModels/rcfPlayerDebugView';
import { manifestForActivity, studentId, activitySetId } from '../pageModels/rcfPlayerDebugView';
import setAnswers from '../lib/setAnswers';
import { testActivitySetId } from '../lib/data/exampleActivitySet';

fixture('RcfPlayerDebugView').beforeEach(async (t) => {
	// Open rcf player for activity set displaying dev template
	await t.navigateTo(navigateToDevTemplate());
	await webTestLmsWaitForPageLoaded();
	await t.click(activitySetLinkForId(testActivitySetId));
	await t.switchToIframe('iframe');
	await rcfPlayerDebugViewWaitForPageLoaded();

	// Clear any existing student answers with direct call to api
	const emptyAnswers = {
		answersByActivity: {}
	};
	await setAnswers({ activitySetId: await activitySetId(), studentId: await studentId(), answers: emptyAnswers });
});

test('manifest content for activity set shown', async (t) => {
	const manifestContentText = await manifestForActivity().value;
	const manifestContent = JSON.parse(manifestContentText);
	await t.expect(manifestContent.rcfVersions !== undefined).ok('manifest missing rcfVersions');
	await t.expect(manifestContent.activitySets !== undefined).ok('manifest missing activitySets');
	await t.expect(manifestContent.activities !== undefined).ok('manifest missing activities');
});
