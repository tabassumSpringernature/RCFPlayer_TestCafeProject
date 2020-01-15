//@flow
import shortid from 'shortid';
import setAnswers from '../../lib/setAnswers';
import { openGradableActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { tryAgain, submitButton, controlsBarButtons, clearGradebookButton, scoreCardCloseButton } from '../../pageModels/buttonsPageModel';
import { scoreCard, playerControls, scoreCardText } from '../../pageModels/componentsPageModel';
import { templateName, templateNameSelector } from '../../pageModels/templateTypePageModel';
import { activityDisabled, writingActivity, teacherScoreInput, teacherCommentsBox } from '../../pageModels/rcfActivityPageModel';

fixture('Open Gradable Gradebook Student, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: openGradableActivitySetId, origin: 'gradebook', role: 'student' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: openGradableActivitySetId, origin: 'gradebook', role: 'student' });
});
noAttemptForGradebook();

fixture('Open Gradable Gradebook Teacher, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: openGradableActivitySetId, origin: 'gradebook', role: 'teacher' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: openGradableActivitySetId, origin: 'gradebook', role: 'teacher' });
});
noAttemptForGradebook();

fixture('Open Gradable Hotspot-to-Gradebook Student, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: openGradableActivitySetId, studentId: t.ctx.studentId });
	});
commonForGradebook();

fixture('Open Gradable Homework-to-Gradebook Student, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'homework',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: openGradableActivitySetId, studentId: t.ctx.studentId });
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
	test('Open Gradable Students Role checks: writing activity', async (t) => {
		const count = await writingActivity().count;
		var text = 'sometext';
		for (let i = 0; i < count; i++) {
			await t.typeText(writingActivity().nth(i), text);
			await t.expect(writingActivity().nth(i).value).notEql('');
		}
		await t.click(submitButton());
		await t.expect(submitButton().hasAttribute('disabled')).notOk();
		await t.expect(controlsBarButtons().count).eql(1);
		await t.expect(scoreCard().exists).ok();
		await t.expect(scoreCardText().innerText).contains('Awaiting teacher marks and comments');

		await t.switchToMainWindow();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
		await t.expect(tryAgain().hasAttribute('disabled')).ok();
		// verify student answer readonly
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(text);

		await t.switchToMainWindow();
		//open activity in gradebook role: student
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'gradebook',
			role: 'student',
			studentId: t.ctx.studentId
		});
		// verify student answer readonly
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(text);

		//verify player controls
		await t.expect(activityDisabled().exists).ok();
		await t.expect(controlsBarButtons().count).eql(0);
		await t.expect(scoreCard().exists).ok();
		await t.expect(scoreCardText().innerText).contains('Awaiting teacher marks and comments');
	});

	test('Open Gradable Teacher Role checks: writing activity', async (t) => {
		const count = await writingActivity().count;
		var text = 'sometext';
		for (let i = 0; i < count; i++) {
			await t.typeText(writingActivity().nth(i), text);
			await t.expect(writingActivity().nth(i).value).notEql('');
		}
		await t.click(submitButton());
		await t.expect(submitButton().hasAttribute('disabled')).notOk();
		await t.expect(controlsBarButtons().count).eql(1);
		await t.expect(scoreCard().hasAttribute('disabled')).notOk();
		await t.expect(scoreCardText().innerText).contains('Awaiting teacher marks and comments');

		// verify student answers are read only
		await t.switchToMainWindow();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'homework',
			role: 'student',
			studentId: t.ctx.studentId
		});
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(text);
		await t.expect(tryAgain().hasAttribute('disabled')).ok();

		await t.switchToMainWindow();
		//open activity in gradebook role:teacher
		//verify student answers are read only
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'gradebook',
			role: 'teacher',
			studentId: t.ctx.studentId
		});

		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(text);
		await t.expect(controlsBarButtons().count).eql(1);
		await t.expect(submitButton().hasAttribute('disabled')).notOk();
		await t.expect(activityDisabled().exists).ok();
		await t.expect(scoreCard().exists).notOk();

		// teacher marks the activity
		await t.typeText(teacherScoreInput('1'), '1');
		await t.typeText(teacherScoreInput('2'), '2');
		await t.click(submitButton());
		await t.expect(submitButton().hasAttribute('disabled')).notOk();
		await t.expect(scoreCardText().innerText).contains('This activity was marked');
		await t.click(scoreCardCloseButton());
		await t.expect(scoreCard().exists).notOk();
		await t.expect(controlsBarButtons().count).eql(1);

		await t.switchToMainWindow();
		//open activity in gradebook role:student
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'gradebook',
			role: 'student',
			studentId: t.ctx.studentId
		});
		await t.expect(controlsBarButtons().count).eql(0);
		await t.expect(scoreCardText().innerText).contains('This activity was marked');
		await t.click(scoreCardCloseButton());
		await t.expect(scoreCard().exists).notOk();
	});
}

test('Open Gradable Students Role : verify TryAgain', async (t) => {
	const count = await writingActivity().count;
	var text = 'sometext';
	for (let i = 0; i < count; i++) {
		await t.typeText(writingActivity().nth(i), text);
		await t.expect(writingActivity().nth(i).value).notEql('');
	}
	await t.click(submitButton());
	await t.expect(submitButton().hasAttribute('disabled')).notOk();

	await t.switchToMainWindow();
	await openRcfPlayerForActivitySet({
		activitySetId: openGradableActivitySetId,
		origin: 'gradebook',
		role: 'teacher',
		studentId: t.ctx.studentId
	});

	await t.typeText(teacherScoreInput('1'), '1');
	await t.typeText(teacherCommentsBox('1'), 'try again');
	await t.typeText(teacherScoreInput('2'), '2');
	await t.typeText(teacherCommentsBox('2'), 'Well done');

	await t.click(submitButton());
	await t.expect(submitButton().hasAttribute('disabled')).notOk();
	await t.expect(scoreCardText().innerText).contains('This activity was marked');

	//teacher edits feedback
	await t.typeText(teacherCommentsBox('1'), '. Keep Trying');
	await t.typeText(teacherCommentsBox('2'), '. Good Work');
	await t.click(submitButton());
	await t.expect(submitButton().hasAttribute('disabled')).notOk();

	//student views feedback
	const origins = ['hotspot', 'homework'];
	for (const origin of origins) {
		await t.switchToMainWindow();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin,
			role: 'student',
			studentId: t.ctx.studentId
		});

		await t.click(tryAgain());
		await t.expect(activityDisabled().exists).notOk();

		var newText = 'writing again';
		for (let i = 0; i < count; i++) {
			await t.selectText(writingActivity().nth(i)).pressKey('delete');
			await t.typeText(writingActivity().nth(i), newText);
			await t.expect(writingActivity().nth(i).value).eql(newText);
		}

		// student submits feedback again
		await t.click(submitButton());
		await t.expect(submitButton().hasAttribute('disabled')).notOk();

		// confirm when viewing again as student, submitted answers show
		await t.switchToMainWindow();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'gradebook',
			role: 'student',
			studentId: t.ctx.studentId
		});
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(newText);

		// Confirm when viewing as a teacher, submitted answers show
		await t.switchToMainWindow();
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'gradebook',
			role: 'teacher',
			studentId: t.ctx.studentId
		});
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql(newText);

		// Submit again as a teacher (required so when looping around to check behaviour from a homework origin,
		// the activity starts in a 'teacher feedback submited' state, allowing the student to try again)
		await t.click(submitButton());
		await t.expect(submitButton().hasAttribute('disabled')).notOk();
	}
});
