//@flow
import { closedGradableActivitySetId, clickCorrectAnswersForClosedGradableActivitySet } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import {
	checkAnswers,
	reset,
	showOneByOne,
	showAll,
	tryAgain,
	showAnswers,
	showAnswersToggleButton
} from '../../pageModels/buttonsPageModel';
import { scoreCard, playerControls } from '../../pageModels/componentsPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';
import { correctAnswers, activityDisabled, activityMarksBeingShown } from '../../pageModels/rcfActivityPageModel';

fixture('Closed Gradable Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'homework', role: 'student' });
});

commonTests();

fixture('Closed Gradable Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'hotspot', role: 'student' });
});

commonTests();

function commonTests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('closed-gradable');
	});
	test('initial buttons state: shown buttons', async (t) => {
		await t.expect(checkAnswers().exists).ok();
		await t.expect(playerControls().count).eql(1);
	});

	test('initial buttons state: hidden buttons', async (t) => {
		await t.expect(showOneByOne().exists).notOk();
		await t.expect(showAll().exists).notOk();
		await t.expect(tryAgain().exists).notOk();
	});

	test('initial buttons state: enabled buttons', async (t) => {
		await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
	});

	test('check answers clicked: less than 100%', async (t) => {
		await t.click(checkAnswers());

		await t.expect(checkAnswers().exists).notOk();
		await t.expect(tryAgain().hasAttribute('disabled')).notOk();
		await t.expect(reset().exists).notOk();
		await t.expect(scoreCard().hasAttribute('disabled')).notOk();
		await t.expect(activityDisabled().exists).ok();
	});

	test('check answers clicked: 100%', async (t) => {
		await clickCorrectAnswersForClosedGradableActivitySet();
		await t.click(checkAnswers());
		await t.expect(scoreCard().hasAttribute('disabled')).notOk();
		await t.expect(activityMarksBeingShown().exists).ok();
		await t.expect(checkAnswers().exists).notOk();
		await t.expect(tryAgain().exists).notOk();
		await t.expect(activityDisabled().exists).ok();
	});

	test('try again clicked', async (t) => {
		await t.click(checkAnswers());
		await t.expect(scoreCard().exists).ok();
		await t.click(tryAgain());
		await t.expect(reset().exists).notOk();
		await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
		await t.expect(tryAgain().exists).notOk();
		await t.expect(scoreCard().exists).notOk();
		await t.expect(activityDisabled().exists).notOk();
	});

	test('verify showAnswersButton after 3rd attempt by student', async (t) => {
		await t.click(checkAnswers());

		await t.expect(scoreCard().exists).ok();
		await t.click(tryAgain());
		await t.click(checkAnswers());

		await t.expect(scoreCard().exists).ok();
		await t.click(tryAgain());
		await t.click(checkAnswers());

		await t.expect(scoreCard().exists).ok();
		await t.expect(showAnswers().hasAttribute('disabled')).notOk();
		await t.expect(scoreCard().hasAttribute('disabled')).notOk();

		await t.click(showAnswers());

		await t.expect(correctAnswers().exists).ok();
		await t.expect(activityDisabled().exists).ok();
		await t.expect(showAnswersToggleButton().hasAttribute('disabled')).notOk();
		await t.expect(reset().exists).notOk();

		await t.expect(showAnswersToggleButton().innerText).eql('My answers');
		// click showAnswersToggle
		await t.click(showAnswersToggleButton());
		await t.expect(showAnswersToggleButton().innerText).eql('Correct answers');
		await t.expect(correctAnswers().exists).notOk();
		await t.click(showAnswersToggleButton());
		await t.expect(correctAnswers().exists).ok();
	});
}
