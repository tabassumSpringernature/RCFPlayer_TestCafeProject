//@flow

import { audioActivityId } from '../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../lib/openRcfPlayerForActivitySet';
import { reset } from '../pageModels/buttonsPageModel';
import { audioFile, audioCurrentTime } from '../pageModels/rcfActivityPageModel';

fixture('Audio Activity').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: audioActivityId, origin: 'homework', role: 'teacher' });
});

test('verify audioFiles on click to reset button', async (t) => {
	await t.expect(audioCurrentTime().textContent).eql('00:00');
	await t.click(audioFile());

	await t.expect(audioCurrentTime().textContent).notEql('00:00');
	await t.click(reset());

	await t.expect(audioCurrentTime().textContent).eql('00:00');
});
