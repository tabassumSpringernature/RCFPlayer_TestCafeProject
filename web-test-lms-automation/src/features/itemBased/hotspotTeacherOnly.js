//@flow

import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedTestModeActivitySetId } from '../../lib/data/exampleActivitySet';
import { playlistPaginationText } from '../../pageModels/componentsPageModel';
import { itemBasedStartButton, itemBasedNextButton, checkAnswers, showAnswers } from '../../pageModels/buttonsPageModel';

fixture('Item Based Test Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});

test('verify itembased cover screen', async (t) => {
	await t.expect(playlistPaginationText().exists).notOk();
});

test('teacher options : shown after start', async (t) => {
	await t.click(itemBasedStartButton());
	await t.expect(itemBasedNextButton().exists).notOk();
});

test('teacher option : show answers', async (t) => {
	await t.click(itemBasedStartButton());
	await t.click(showAnswers());
	await t.expect(checkAnswers().exists).notOk();
	await t.expect(showAnswers().exists).notOk();
});
