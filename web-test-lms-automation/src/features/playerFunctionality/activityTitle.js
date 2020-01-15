//@flow
import { answerKeyActivitySetId, answerKeyActivityTitle } from '../../lib/data/exampleActivitySet';
import { activityTitle } from '../../pageModels/componentsPageModel';
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist';

fixture('Answer Key Hotspot Teacher, single activity set in playlist').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({ activitySetIds: [answerKeyActivitySetId], origin: 'hotspot', role: 'teacher' });
});

test('verify activityTitle', async (t) => {
	await t.expect(activityTitle().innerText).contains(answerKeyActivityTitle);
});
