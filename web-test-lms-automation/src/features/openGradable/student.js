//@flow
import shortid from 'shortid';
import { openGradableActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import setAnswers from '../../lib/setAnswers';
import { reset, scoreCardCloseButton, submitAnswers, tryAgain } from '../../pageModels/buttonsPageModel';
import { playerControls, playerTitleBar, scoreCard } from '../../pageModels/componentsPageModel';
import { playerContent, writingActivity } from '../../pageModels/rcfActivityPageModel';
import { templateName } from '../../pageModels/templateTypePageModel';

fixture('Open Gradable Homework Student')
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

tests({ origin: 'homework', role: 'student' });

fixture('Open Gradable Hotspot Student')
	.beforeEach(async (t) => {
		t.ctx.studentId = shortid.generate();

		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		await setAnswers({ activitySetId: openGradableActivitySetId, studentId: t.ctx.studentId });
	});

tests({ origin: 'hotspot', role: 'student' });

function tests({ origin, role }) {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('open-gradable');
	});

	test('initial buttons state', async (t) => {
		await t.expect(reset().exists).notOk();
		await t.expect(submitAnswers().hasAttribute('disabled')).notOk();
		await t.expect(scoreCard().exists).notOk();
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerControls().exists).ok();
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify submit', async (t) => {
		const count = await writingActivity().count;
		for (let i = 0; i < count; i++) {
			await t.typeText(writingActivity().nth(i), 'sometext');
			await t.expect(writingActivity().nth(i).value).notEql('');
		}
		await t.click(submitAnswers());

		await t.expect(scoreCard().exists).ok();
		await t.expect(submitAnswers().hasAttribute('disabled')).notOk();

		await t.switchToMainWindow();

		// View same activity again in player
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin,
			role,
			studentId: t.ctx.studentId
		});

		for (let i = 0; i < count; i++) {
			await t.expect(writingActivity().nth(i).value).eql('sometext');
		}

		await t.expect(scoreCard().exists).ok();
		await t.expect(submitAnswers().exists).notOk();
		await t.expect(tryAgain().exists).ok();
		await t.expect(tryAgain().hasAttribute('disabled')).ok();

		await t.click(scoreCardCloseButton());

		await t.switchToMainWindow();

		// View same activity again in player
		await openRcfPlayerForActivitySet({
			activitySetId: openGradableActivitySetId,
			origin,
			role,
			studentId: t.ctx.studentId
		});

		await t.expect(scoreCard().exists).ok();
	});
}
