//@flow
import { closedGradableActivitySetId, clickCorrectAnswersForClosedGradableActivitySet } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { checkAnswers, reset, showOneByOne, showAll, tryAgain, controlsBarButtons } from '../../pageModels/buttonsPageModel';
import { scoreCard, showAnswersText } from '../../pageModels/componentsPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';

fixture('Closed Gradable Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'hotspot', role: 'teacher' });
});

test('verify template type', async (t) => {
	await t.expect(templateName()).eql('closed-gradable');
});

test('verify show answers text is present', async (t) => {
	await t.expect(showAnswersText().exists).ok();
});

test('verify no other buttons appear on activity load', async (t) => {
	await t.expect(controlsBarButtons().count).eql(4);
});

test('initial buttons state: shown buttons', async (t) => {
	await t.expect(checkAnswers().exists).ok();
	await t.expect(reset().exists).ok();
	await t.expect(showOneByOne().exists).ok();
	await t.expect(showAll().exists).ok();
});

test('initial buttons state: hidden buttons', async (t) => {
	await t.expect(tryAgain().exists).notOk();
});

test('initial buttons state: enabled buttons', async (t) => {
	await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
	await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
	await t.expect(showAll().hasAttribute('disabled')).notOk();
});

test('check answers clicked: less than 100%', async (t) => {
	await t.click(checkAnswers());

	await t.expect(scoreCard().hasAttribute('disabled')).notOk();
	await t.expect(showAll().hasAttribute('disabled')).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
	await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
	await t.expect(checkAnswers().exists).notOk();
});

test('check answers clicked: 100%', async (t) => {
	await clickCorrectAnswersForClosedGradableActivitySet();
	await t.click(checkAnswers());

	await t.expect(scoreCard().exists).ok();
	await t.expect(reset().exists).ok();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
	await t.expect(showOneByOne().hasAttribute('disabled')).ok();
	await t.expect(showAll().hasAttribute('disabled')).ok();
	await t.expect(tryAgain().exists).notOk();
});

test('one by one clicked', async (t) => {
	await t.click(showOneByOne());
	await t.expect(tryAgain().exists).notOk();
	await t.expect(reset().hasAttribute('disabled')).notOk();
	await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
	await t.expect(showAll().hasAttribute('disabled')).notOk();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
});
