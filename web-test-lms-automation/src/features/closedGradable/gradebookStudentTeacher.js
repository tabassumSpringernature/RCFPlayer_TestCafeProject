//@flow
import shortid from 'shortid';
import { clickCorrectAnswersForClosedGradableActivitySet, closedGradableActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import setAnswers from '../../lib/setAnswers';
import {
	checkAnswers,
	clearGradebookButton,
	controlsBarButtons,
	reset,
	showAnswers,
	showAnswersToggleButton,
	tryAgain
} from '../../pageModels/buttonsPageModel';
import { playerControls, scoreCard, scoreCardText } from '../../pageModels/componentsPageModel';
import { activityDisabled, correctAnswers } from '../../pageModels/rcfActivityPageModel';
import { templateName, templateNameSelector } from '../../pageModels/templateTypePageModel';

fixture('Closed Gradable Gradebook Student, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'gradebook', role: 'student' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'gradebook', role: 'student' });
});
noAttemptForGradebook();

fixture('Closed Gradable Gradebook Teacher, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'gradebook', role: 'teacher' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'gradebook', role: 'teacher' });
});
noAttemptForGradebook();

fixture('Closed Gradable Hotspot-to-Gradebook Student, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: closedGradableActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: closedGradableActivitySetId, studentId: t.ctx.studentId });
	});
commonForGradebook();

fixture('Closed Gradable Homework-to-Gradebook Student, single activity set')
	.beforeEach(async (t) => {
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: closedGradableActivitySetId,
			origin: 'homework',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		await setAnswers({ activitySetId: closedGradableActivitySetId, studentId: t.ctx.studentId });
	});
commonForGradebook();

function noAttemptForGradebook() {
	test('no attempt: activity has not been attempted, no player controls present', async (t) => {
		await t.expect(templateName()).eql('no-attempt-available');
		await t.expect(templateNameSelector().textContent).contains('This activity has not been attempted.');
		await t.expect(playerControls().exists).notOk();
	});
}

function commonForGradebook() {
	['student', 'teacher'].forEach((role) => {
		test('Gradable students: all wrong answers', async (t) => {
			// await openRcfPlayerForActivitySet({ activitySetId: closedGradableActivitySetId, origin: 'hotspot', role: 'student' })
			await t.click(checkAnswers());
			await t.expect(checkAnswers().exists).notOk();
			await t.expect(tryAgain().hasAttribute('disabled')).notOk();
			await t.expect(reset().exists).notOk();
			await t.expect(scoreCard().hasAttribute('disabled')).notOk();
			await t.expect(activityDisabled().exists).ok();
			var score = await scoreCardText().innerText;
			var scoreRes = score.substring(11);

			await t.switchToMainWindow();
			//open activity in gradebook student role
			await openRcfPlayerForActivitySet({
				activitySetId: closedGradableActivitySetId,
				origin: 'gradebook',
				role: `${role}`,
				studentId: t.ctx.studentId
			});
			//verify player controls
			await t.expect(activityDisabled().exists).ok();
			await t.expect(showAnswers().exists).ok();
			await t.expect(controlsBarButtons().count).eql(1);
			await t.click(showAnswers());
			await t.expect(correctAnswers().exists).ok();
			await t.expect(scoreCard().exists).notOk();
			await t.expect(showAnswersToggleButton().exists).ok();
			if (role == 'student') {
				await t.expect(showAnswersToggleButton().innerText).eql('My answers');
			} else {
				await t.expect(showAnswersToggleButton().innerText).eql("Student's answers");
			}
			await t.click(showAnswersToggleButton());
			await t.expect(showAnswersToggleButton().innerText).eql('Correct answers');
			await t.expect(scoreCard().exists).ok();
			await t.expect(scoreCardText().innerText).contains(scoreRes);
		});

		test('Gradable students: all correct answers', async (t) => {
			await clickCorrectAnswersForClosedGradableActivitySet();
			await t.click(checkAnswers());
			await t.expect(reset().exists).notOk();
			await t.expect(scoreCard().hasAttribute('disabled')).notOk();
			await t.expect(checkAnswers().exists).notOk();
			await t.expect(tryAgain().exists).notOk();
			await t.expect(activityDisabled().exists).ok();
			var score = await scoreCardText().innerText;
			var scoreRes = score.substring(11);

			await t.switchToMainWindow();
			//open activity in gradebook student role
			await openRcfPlayerForActivitySet({
				activitySetId: closedGradableActivitySetId,
				origin: 'gradebook',
				role: `${role}`,
				studentId: t.ctx.studentId
			});
			await t.expect(activityDisabled().exists).ok();
			await t.expect(showAnswers().exists).ok();
			await t.expect(controlsBarButtons().count).eql(1);
			await t.click(showAnswers());
			await t.expect(correctAnswers().exists).ok();
			await t.expect(scoreCard().exists).notOk();
			await t.expect(showAnswersToggleButton().exists).ok();
			if (role == 'student') {
				await t.expect(showAnswersToggleButton().innerText).eql('My answers');
			} else {
				await t.expect(showAnswersToggleButton().innerText).eql("Student's answers");
			}
			await t.click(showAnswersToggleButton());
			await t.expect(showAnswersToggleButton().innerText).eql('Correct answers');
			await t.expect(scoreCard().exists).ok();
			await t.expect(scoreCardText().innerText).contains(scoreRes);
		});
	});
}
