//@flow

import {
	dragDropClosedGradableActivitySetId,
	closedGradableActivitySetId,
	answerKeyActivitySetId,
	openGradableActivitySetId,
	nonGradableActivitySetId
} from '../../lib/data/exampleActivitySet';
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist';
import { templateName } from '../../pageModels/templateTypePageModel';
import {
	controlsBarButtons,
	playlistEndButton,
	nextActivitySetButton,
	playlistCompletionPopUpButton,
	playlistNavigationNextButton,
	playlistNavigationPreviousButton
} from '../../pageModels/buttonsPageModel';
import { playlistCompletionPopUp, playlistPaginationText } from '../../pageModels/componentsPageModel';

fixture('Playlist In Homework-Teacher').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({
		activitySetIds: [
			dragDropClosedGradableActivitySetId,
			answerKeyActivitySetId,
			openGradableActivitySetId,
			nonGradableActivitySetId,
			closedGradableActivitySetId
		],
		origin: 'homework',
		role: 'teacher'
	});
});

tests();

fixture('Playlist In Hotspot-Teacher').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({
		activitySetIds: [
			dragDropClosedGradableActivitySetId,
			answerKeyActivitySetId,
			openGradableActivitySetId,
			nonGradableActivitySetId,
			closedGradableActivitySetId
		],
		origin: 'hotspot',
		role: 'teacher'
	});
});

tests();

function tests() {
	test('Verify playlist start button and playlist end button', async (t) => {
		await t.expect(controlsBarButtons().count).eql(5);
		await t.expect(templateName()).eql('closed-gradable');
		await t.click(nextActivitySetButton());

		await t.expect(templateName()).eql('answer-key');
		await t.click(nextActivitySetButton());

		await t.expect(templateName()).eql('open-gradable');
		await t.click(nextActivitySetButton());

		await t.expect(templateName()).eql('non-gradable');
		await t.click(nextActivitySetButton());

		await t.expect(templateName()).eql('closed-gradable');

		await t.click(playlistEndButton());
		await t.switchToMainWindow('swal-overlay swal-overlay--show-modal');
		await t.setNativeDialogHandler(() => true);

		await t.expect(playlistCompletionPopUp().exists).ok();
		await t.expect(playlistCompletionPopUp().textContent).eql('playlist-completion-requested');
		await t.click(playlistCompletionPopUpButton());

		await t.expect(playlistCompletionPopUp().hasClass('.swal-overlay--show-modal')).notOk();
	});

	test('Verify playlist navigation buttons and pagination', async (t) => {
		await t.expect(playlistNavigationPreviousButton().hasAttribute('disabled')).ok();
		await t.expect(playlistPaginationText().textContent).eql('1 of 5');
		await t.click(playlistNavigationNextButton());

		await t.expect(templateName()).eql('answer-key');
		await t.expect(playlistPaginationText().textContent).eql('2 of 5');
		await t.click(playlistNavigationNextButton());

		await t.expect(templateName()).eql('open-gradable');
		await t.expect(playlistPaginationText().textContent).eql('3 of 5');
		await t.click(playlistNavigationNextButton());

		await t.expect(templateName()).eql('non-gradable');
		await t.expect(playlistPaginationText().textContent).eql('4 of 5');
		await t.click(playlistNavigationNextButton());

		await t.expect(templateName()).eql('closed-gradable');
		await t.expect(playlistPaginationText().textContent).eql('5 of 5');

		await t.click(playlistEndButton());
		await t.switchToMainWindow('swal-overlay swal-overlay--show-modal');
		await t.setNativeDialogHandler(() => true);

		await t.expect(playlistCompletionPopUp().exists).ok();
		await t.expect(playlistCompletionPopUp().textContent).eql('playlist-completion-requested');
		await t.click(playlistCompletionPopUpButton());

		await t.expect(playlistCompletionPopUp().hasClass('.swal-overlay--show-modal')).notOk();
	});
}
