//@flow
import { itemBasedStartButton, showAnswers, checkAnswers } from '../../pageModels/buttonsPageModel';
import { itemBasedNextButton } from '../../pageModels/buttonsPageModel';
import { playlistPaginationText } from '../../pageModels/componentsPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { roleStudent } from '../../pageModels/templateTypePageModel';
import { itemBasedTestModeActivitySetId, itemBasedChallengeModeActivitySetId } from '../../lib/data/exampleActivitySet';

fixture('Item Based Test Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'student' });
});

tests();

fixture('Item Based Test Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();

fixture('Item Based Challenge Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'homework', role: 'student' });
});

tests();

fixture('Item Based Challenge Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();

function tests() {
	test('verify itembased cover screen', async (t) => {
		await t.expect(playlistPaginationText().exists).notOk();
	});

	test('verify cover screen do not show pagination', async (t) => {
		await t.expect(playlistPaginationText().exists).notOk();
	});

	test('student options : shown after start', async (t) => {
		await t.click(itemBasedStartButton());

		await t.expect(showAnswers().exists).notOk();
		await t.expect(itemBasedNextButton().exists).notOk();
	});

	test('student options : shown after check answers', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());

		await t.expect(showAnswers().exists).notOk();
	});

	test('verify activity is set to run in student mode', async (t) => {
		await t.expect(roleStudent().exists).ok();
	});
}
//check answers submitted to LMS
