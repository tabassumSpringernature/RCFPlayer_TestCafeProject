// @flow

import {
	itemBasedStartButton,
	itemBasedBackButton,
	itemBasedNextButton,
	checkAnswers,
	itemBasedResetButton,
	itemBasedFinishButton
} from '../../pageModels/buttonsPageModel';
import {
	itemBasedCoverScreen,
	itemBasedCoverScreenActivityModeLabel,
	itemBasedScoreScreen,
	itemBasedCompletionText,
	itemBasedCoverScreenActivitySetTitle,
	itemBasedCoverScreenQuestionsTextContainer,
	itemBasedCoverScreenActivityModeLabelSvg
} from '../../pageModels/componentsPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';
import { activityDisabled } from '../../pageModels/rcfActivityPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedTestModeActivitySetId, itemBasedChallengeModeActivitySetId } from '../../lib/data/exampleActivitySet';

fixture('Item Based Test Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'student' });
});

tests();

fixture('Item Based Test Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();

fixture('Item Based Test Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'teacher' });
});

tests();

fixture('Item Based Test Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'teacher' });
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

fixture('Item Based Challenge Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'homework', role: 'teacher' });
});

tests();

fixture('Item Based Challenge Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});

tests();

function tests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('item-based');
	});

	test('verify itembased cover screen', async (t) => {
		await t.expect(itemBasedStartButton().exists).ok();
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(itemBasedCoverScreenActivitySetTitle().exists).ok();
		await t.expect(itemBasedCoverScreenActivityModeLabel().exists).ok();
		await t.expect(itemBasedCoverScreenQuestionsTextContainer().innerText).contains('questions to answer');
		await t.expect(itemBasedCoverScreenActivityModeLabelSvg().exists).ok();

		await t.expect(itemBasedStartButton().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedCoverScreen().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedCoverScreenActivityModeLabel().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedResetButton().exists).notOk();
		await t.expect(itemBasedScoreScreen().exists).notOk();
		await t.expect(itemBasedCompletionText().exists).notOk();
	});

	test('start with the activity set', async (t) => {
		await t.click(itemBasedStartButton());
		await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedBackButton().hasAttribute('disabled')).notOk();
	});

	test('verify check answers', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedBackButton().hasAttribute('disabled')).notOk();
	});

	test('verify itemBasedBackButton', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.click(itemBasedBackButton());

		await t.expect(itemBasedStartButton().exists).ok();
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(itemBasedCoverScreenActivityModeLabel().exists).ok();
	});

	test('verify scoreScreen', async (t) => {
		await t.click(itemBasedStartButton());
		while (await checkAnswers().exists) {
			await t.click(checkAnswers());
			if (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
			} else {
				await t.click(itemBasedFinishButton());
			}
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedResetButton().exists).ok();
		await t.expect(itemBasedCompletionText().exists).ok();
		await t.click(itemBasedResetButton());
		await t.expect(itemBasedCoverScreen().exists).ok();
	});
}
