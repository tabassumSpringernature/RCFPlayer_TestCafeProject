//@flow
import { answerKeyActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist';
import { reset, showOneByOne, showAll, playlistEndButton, controlsBarButtons } from '../../pageModels/buttonsPageModel';
import { showAnswersText, playerControls, playerTitleBar } from '../../pageModels/componentsPageModel';
import { playerContent } from '../../pageModels/rcfActivityPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';
import { correctAnswers, answerKeyAnswers, answerKeyAnswersRevealed, activityDisabled } from '../../pageModels/rcfActivityPageModel';

fixture('Answer Key Homework Teacher, single activity set in playlist').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({ activitySetIds: [answerKeyActivitySetId], origin: 'homework', role: 'teacher' });
});

commonTests();

fixture('Answer Key Hotspot Teacher, single activity set in playlist').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({ activitySetIds: [answerKeyActivitySetId], origin: 'hotspot', role: 'teacher' });
});

commonTests();

function commonTests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('answer-key');
	});

	test('verify buttons on activity load', async (t) => {
		await t.expect(reset().exists).ok();
		await t.expect(showOneByOne().exists).ok();
		await t.expect(showAll().exists).ok();
		await t.expect(playlistEndButton().exists).ok();
	});

	test('verify show answers text is present', async (t) => {
		await t.expect(showAnswersText().exists).ok();
	});

	test('verify no other buttons appear on activity load', async (t) => {
		await t.expect(controlsBarButtons().count).eql(4);
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerControls().exists).ok();
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify showAll button', async (t) => {
		await t.click(showAll());

		await t.expect(correctAnswers().exists).ok();
		await t.expect(answerKeyAnswersRevealed().exists).ok();
		await t.expect(activityDisabled().exists).ok();
		await t.expect(showAll().hasAttribute('disabled')).ok();
		await t.expect(showOneByOne().hasAttribute('disabled')).ok();
		await t.expect(reset().hasAttribute('disabled')).notOk();
		await t.expect(showAnswersText().exists).ok();
	});

	test('verify reset button', async (t) => {
		await t.click(showAll());
		await t.click(reset());

		await t.expect(correctAnswers().exists).notOk();
		await t.expect(answerKeyAnswersRevealed().exists).notOk();
		await t.expect(activityDisabled().exists).notOk();
		await t.expect(showAnswersText().exists).ok();
		await t.expect(showAll().hasAttribute('disabled')).notOk();
		await t.expect(showOneByOne().hasAttribute('disabled')).notOk();
		await t.expect(reset().hasAttribute('disabled')).notOk();
	});

	test('verify showOneByOne', async (t) => {
		const countNoOfQuestions = await answerKeyAnswers().count;
		for (let i = 0; i < countNoOfQuestions - 1; i++) {
			await t.click(showOneByOne());

			await t.expect(correctAnswers().exists).ok();
			await t.expect(activityDisabled().exists).ok();
			await t.expect(showAnswersText().exists).ok();

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
}
