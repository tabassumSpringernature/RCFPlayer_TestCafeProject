//@flow

import { nonGradableActivitySetId } from '../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../lib/openRcfPlayerForActivitySet';
import { controlsBarButtons } from '../pageModels/buttonsPageModel';
import { playerTitleBar } from '../pageModels/componentsPageModel';
import { playerContent } from '../pageModels/rcfActivityPageModel';
import { templateName } from '../pageModels/templateTypePageModel';

fixture('Non Gradable Homework Student').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: nonGradableActivitySetId, origin: 'homework', role: 'student' });
});

tests();

fixture('Non Gradable Hotspot Student').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: nonGradableActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();

fixture('Non Gradable Hotspot Teacher').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: nonGradableActivitySetId, origin: 'hotspot', role: 'teacher' });
});

tests();

fixture('Non Gradable Homework Teacher').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: nonGradableActivitySetId, origin: 'homework', role: 'teacher' });
});

homeworkTeacherTests();

function tests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('non-gradable');
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify no other buttons appear on activity load', async (t) => {
		await t.expect(controlsBarButtons().count).eql(0);
	});
}

function homeworkTeacherTests() {
	test('verify template type', async (t) => {
		await t.expect(templateName()).eql('non-gradable');
	});

	test('verify components on activity load', async (t) => {
		await t.expect(playerContent().exists).ok();
		await t.expect(playerTitleBar().exists).ok();
	});

	test('verify no other buttons appear on activity load', async (t) => {
		await t.expect(controlsBarButtons().count).eql(1);
	});
}
