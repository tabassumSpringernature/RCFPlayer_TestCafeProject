//@flow

import {
	itemBasedStartButton,
	itemBasedBackButton,
	itemBasedNextButton,
	checkAnswers,
	showAnswers,
	itemBasedResetButton
} from '../../pageModels/buttonsPageModel';
import { itemBasedScoreScreen } from '../../pageModels/componentsPageModel';
import { activityDisabled, correctAnswers } from '../../pageModels/rcfActivityPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedTestModeActivitySetId, itemBasedChallengeModeActivitySetId } from '../../lib/data/exampleActivitySet';
import { roleTeacher } from '../../pageModels/templateTypePageModel';

fixture('Item Based Test Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'teacher' });
});

tests();

fixture('Item Based Test Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});

tests();
testForAllExceptReviewMode();

fixture('Item Based Challenge Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'homework', role: 'teacher' });
});

tests();

fixture('Item Based Challenge Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});

tests();
testForAllExceptReviewMode();

function tests() {
	test('verify activity is set to run in teacher mode', async (t) => {
		await t.expect(roleTeacher().exists).ok();
	});

	test('teacher options : shown after start', async (t) => {
		await t.click(itemBasedStartButton());
		await t.expect(checkAnswers().exists).ok();
		await t.expect(itemBasedBackButton().exists).ok();
		await t.expect(showAnswers().exists).ok();
		await t.expect(itemBasedResetButton().exists).notOk();
		await t.expect(showAnswers().hasAttribute('disabled')).notOk();
	});

	test('teacher options : shown after check answers', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());
		await t.expect(itemBasedNextButton().exists).ok();
		await t.expect(itemBasedBackButton().exists).ok();
		await t.expect(showAnswers().exists).ok();
		await t.expect(correctAnswers().exists).notOk();
		await t.expect(itemBasedScoreScreen().exists).notOk();
		await t.expect(showAnswers().hasAttribute('disabled')).notOk();
	});

	test('teacher option : show answers', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(showAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.expect(correctAnswers().exists).ok();
		await t.expect(itemBasedNextButton().exists).ok();
		await t.expect(itemBasedBackButton().exists).ok();
		await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedBackButton().hasAttribute('disabled')).notOk();
	});
}

function testForAllExceptReviewMode() {
	test('teacher option non-review mode: check answers should not be present once answers are checked', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());
		await t.expect(checkAnswers().exists).notOk();
	});

	test('teacher option non-review mode: itembased Next button is not shown until question is answered', async (t) => {
		await t.click(itemBasedStartButton());
		await t.expect(itemBasedNextButton().exists).notOk();
		await t.click(showAnswers());
		await t.expect(showAnswers().exists).notOk();
		await t.expect(itemBasedNextButton().exists).ok();
	});
}
