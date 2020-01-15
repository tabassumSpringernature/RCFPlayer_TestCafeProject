//@flow
import { openGradableActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist';
import { templateName } from '../../pageModels/templateTypePageModel';
import shortid from 'shortid';
import setAnswers from '../../lib/setAnswers';
import { reset, playlistEndButton, controlsBarButtons } from '../../pageModels/buttonsPageModel';
import { playerControls, playerTitleBar } from '../../pageModels/componentsPageModel';
import { playerContent, activityDisabled, writingActivity } from '../../pageModels/rcfActivityPageModel';

fixture('Open Gradable Homework Teacher')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();

		await openRcfPlayerActivitiesInPlaylist({
			activitySetIds: [openGradableActivitySetId],
			origin: 'homework',
			role: 'teacher',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: openGradableActivitySetId, studentId: t.ctx.studentId });
	});

tests();

fixture('Open Gradable Hotspot Teacher')
	.beforeEach(async (t) => {
		t.ctx.studentId = shortid.generate();

		await openRcfPlayerActivitiesInPlaylist({
			activitySetIds: [openGradableActivitySetId],
			origin: 'hotspot',
			role: 'teacher',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		await setAnswers({ activitySetId: openGradableActivitySetId, studentId: t.ctx.studentId });
	});

tests();

function tests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('open-gradable');
	});

	test('initial buttons state', async (t) => {
		await t.expect(reset().hasAttribute('disabled')).notOk();
		await t.expect(playlistEndButton().hasAttribute('disabled')).notOk();
	});

	test('verify no other buttons appear on activity load', async (t) => {
		await t.expect(controlsBarButtons().count).eql(2);
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerControls().exists).ok();
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify reset', async (t) => {
		await t.expect(reset().hasAttribute('disabled')).notOk();
		await t.expect(activityDisabled().exists).notOk();

		//reset answers, without submitting answers
		const count = await writingActivity().count;
		var text = 'sometext';
		for (let i = 0; i < count; i++) {
			await t.typeText(writingActivity().nth(i), text);
			await t.expect(writingActivity().nth(i).value).notEql('');
		}
		await t.click(reset());
		await t.expect(activityDisabled().exists).notOk();
		for (let i = 0; i < count; i++) await t.expect(writingActivity().nth(i).value).eql('');

		// TODO - this automation test does not at present verify anything
		// (have migrated across existing test logic)
	});
}
