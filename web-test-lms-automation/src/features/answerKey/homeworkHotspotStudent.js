//@flow
import { answerKeyActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { showAnswers, reset } from '../../pageModels/buttonsPageModel';
import { playerControls, playerTitleBar } from '../../pageModels/componentsPageModel';
import { playerContent } from '../../pageModels/rcfActivityPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';
import { correctAnswers, answerKeyAnswersRevealed, activityDisabled } from '../../pageModels/rcfActivityPageModel';

fixture('Answer Key Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: answerKeyActivitySetId, origin: 'homework', role: 'student' });
});

commonTests();

fixture('Answer Key Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: answerKeyActivitySetId, origin: 'hotspot', role: 'student' });
});

commonTests();

function commonTests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('answer-key');
	});

	test('initial buttons state: shown buttons', async (t) => {
		await t.expect(showAnswers().exists).ok();
		await t.expect(playerControls().count).eql(1);
	});

	test('initial buttons state: enabled buttons', async (t) => {
		await t.expect(showAnswers().hasAttribute('disabled')).notOk();
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerControls().exists).ok();
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify showAnswers', async (t) => {
		await t.click(showAnswers());

		await t.expect(correctAnswers().exists).ok();
		await t.expect(answerKeyAnswersRevealed().exists).ok();
		await t.expect(activityDisabled().exists).ok();
		await t.expect(showAnswers().hasAttribute('disabled')).ok();
		await t.expect(reset().exists).notOk();
	});
}
