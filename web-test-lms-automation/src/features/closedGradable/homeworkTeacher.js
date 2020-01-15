//@flow
import { closedGradableActivitySetId, clickCorrectAnswersForClosedGradableActivitySet } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import {
	checkAnswers,
	reset,
	showOneByOne,
	showAll,
	playlistEndButton,
	tryAgain,
	controlsBarButtons
} from '../../pageModels/buttonsPageModel';
import { scoreCard, showAnswersText, playerControls, playerTitleBar } from '../../pageModels/componentsPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';
import {
	complexDragDropActivity,
	activityDisabled,
	playerContent,
	correctAnswers,
	answerKeyAnswersRevealed
} from '../../pageModels/rcfActivityPageModel';

fixture('Closed Gradable Homework Teacher, single activity set in playlist').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'homework', role: 'teacher' });
});

test('verify template type', async (t) => {
	await t.expect(templateName()).eql('closed-gradable');
});

test('verify buttons on activity load', async (t) => {
	await t.expect(reset().exists).ok();
	await t.expect(checkAnswers().exists).ok();
	await t.expect(showOneByOne().exists).ok();
	await t.expect(showAll().exists).ok();
	await t.expect(playlistEndButton().exists).ok();
});

test('verify show answers text is present', async (t) => {
	await t.expect(showAnswersText().exists).ok();
});

test('verify no other buttons appear on activity load', async (t) => {
	await t.expect(controlsBarButtons().count).eql(5);
});

test('verify components on activity load', async (t) => {
	await t.expect(playerControls().exists).ok();
	await t.expect(playerContent().exists).ok();
	await t.expect(playerTitleBar().exists).ok();
});

test('verify showAll button', async (t) => {
	await t.click(showAll());

	await t.expect(correctAnswers().exists).ok();
	await t.expect(activityDisabled().exists).ok();
	await t.expect(showAnswersText().exists).ok();
	await t.expect(showAll().hasAttribute('disabled')).ok();
	await t.expect(showOneByOne().hasAttribute('disabled')).ok();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
	await t.expect(reset().hasAttribute('disabled')).notOk();
});

test('verify reset button', async (t) => {
	await t.click(showAll());
	await t.click(reset());

	await t.expect(correctAnswers().exists).notOk();
	await t.expect(activityDisabled().exists).notOk();
	await t.expect(showAnswersText().exists).ok();
	await t.expect(showAll().hasAttribute('disabled')).notOk();
	await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
	await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
});

test('verify showOneByOneButton', async (t) => {
	const countNoOfQuestions = await complexDragDropActivity().count;
	for (let i = 0; i < countNoOfQuestions - 1; i++) {
		await t.click(showOneByOne());

		await t.expect(correctAnswers().exists).ok();
		await t.expect(activityDisabled().exists).ok();
		await t.expect(showAnswersText().exists).ok();
		await t.expect(checkAnswers().hasAttribute('disabled')).ok();

		if (i < countNoOfQuestions) {
			await t.expect(showAll().hasAttribute('disabled')).notOk();
			await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
			await t.expect(reset().hasAttribute('disabled')).notOk();
		} else {
			await t.expect(answerKeyAnswersRevealed().exists).ok();
			await t.expect(reset().hasAttribute('disabled')).notOk();
			await t.expect(showAll().hasAttribute('disabled')).ok();
			await t.expect(showOneByOne().hasAttribute('disabled')).ok();
		}
	}
});

test('check answers clicked: less than 100%', async (t) => {
	await t.click(checkAnswers());

	await t.expect(scoreCard().hasAttribute('disabled')).notOk();
	await t.expect(tryAgain().hasAttribute('disabled')).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
	await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
	await t.expect(showAll().hasAttribute('disabled')).notOk();
	await t.expect(checkAnswers().exists).notOk();
});

test('check answers clicked: 100%', async (t) => {
	await clickCorrectAnswersForClosedGradableActivitySet();
	await t.click(checkAnswers());

	await t.expect(scoreCard().exists).ok();
	await t.expect(tryAgain().exists).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
	await t.expect(showOneByOne().hasAttribute('disabled')).ok();
	await t.expect(showAll().hasAttribute('disabled')).ok();
});
