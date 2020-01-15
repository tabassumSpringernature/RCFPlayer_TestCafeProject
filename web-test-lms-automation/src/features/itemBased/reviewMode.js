//@flow
import {
	itemBasedTestModeActivitySetId,
	itemBasedPracticeModeActivitySetId,
	itemBasedChallengeModeActivitySetId
} from '../../lib/data/exampleActivitySet';

import {
	itemBasedStartButton,
	itemBasedNextButton,
	itemBasedFinishButton,
	itemBasedBackButton,
	showAnswers,
	checkAnswers,
	playlistEndButton,
	playlistCompletionPopUpButton,
	playlistNavigationPreviousButton,
	playlistNavigationNextButton
} from './../../pageModels/buttonsPageModel';

import {
	playlistPaginationText,
	playlistCompletionPopUp,
	itemBasedCoverScreen,
	itemBasedScoreScreen,
	itemBasedProgressBar,
	itemBasedProgressBarCorrectClassNameRegExp,
	itemBasedProgressBarActiveClassNameRegExp,
	itemBasedProgressBarWrongClassNameRegExp
} from './../../pageModels/componentsPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedTestMode } from '../../pageModels/templateTypePageModel';

// Homework / Teacher is 'Review mode'
fixture('Item Based Test Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'teacher' });
});

fixture('Item Based Practice Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'homework', role: 'teacher' });
});

fixture('Item Based Challenge Mode Homework Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'homework', role: 'teacher' });
});

test('verify itembased cover screen', async (t) => {
	await t.expect(playlistPaginationText().exists).ok();
	await t.expect(playlistNavigationPreviousButton().hasAttribute('disabled')).ok();
	await t.expect(playlistNavigationNextButton().hasAttribute('disabled')).ok();
});

test('teacher option: shown after start', async (t) => {
	await t.click(itemBasedStartButton());
	await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
});

test('teacher option: showAnswers, checkAnswers buttons remains disabled on click', async (t) => {
	await t.click(itemBasedStartButton());
	await t.click(showAnswers());
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists).notOk();
	await t.expect(showAnswers().hasAttribute('disabled')).ok();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
});

test('verify check answers', async (t) => {
	await t.click(itemBasedStartButton());
	await t.click(checkAnswers());

	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
	await t.expect(itemBasedBackButton().hasAttribute('disabled')).notOk();
	await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
	await t.expect(showAnswers().hasAttribute('disabled')).notOk();
	await t.expect(itemBasedCoverScreen().exists).notOk();
	await t.expect(itemBasedScoreScreen().exists).notOk();
	await t.expect(playlistEndButton().exists).notOk();
	await t.expect(itemBasedStartButton().exists).notOk();
	//check no progress bar li is correct
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();
	//check  progress bar li is wrong is present for wrong answer
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).count).eql(1);
	await t.click(itemBasedNextButton());
	await t.click(checkAnswers());
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).count).eql(2);
});
test('done button sends playlist completion event', async (t) => {
	await t.click(itemBasedStartButton());
	for (let i = 1; i < 17; i++) {
		await t.click(itemBasedNextButton());
	}
	await t.click(itemBasedFinishButton());
	await t.click(playlistEndButton());
	await t.switchToMainWindow('swal-overlay swal-overlay--show-modal');
	await t.expect(playlistCompletionPopUp().textContent).eql('playlist-completion-requested');
	await t.click(playlistCompletionPopUpButton());
	await t.expect(playlistCompletionPopUp().hasClass('.swal-overlay--show-modal')).notOk();
});

test('verify itembased mode', async (t) => {
	await t.expect(itemBasedTestMode()).eql('review');
});

test('start with the activity set', async (t) => {
	await t.click(itemBasedStartButton());
	await t.expect(itemBasedProgressBar().count).eql(17);
});

test('verify show answers', async (t) => {
	await t.click(itemBasedStartButton());
	await t.click(showAnswers());
	await t.expect(itemBasedProgressBar().exists).ok();
	await t.expect(checkAnswers().exists).ok();
	//check no progress bar li is correct
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();
	//check no progress bar li is wrong
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists).notOk();
	await t.expect(playlistEndButton().exists).notOk();
	await t.expect(showAnswers().hasAttribute('disabled')).ok();
	await t.expect(checkAnswers().hasAttribute('disabled')).ok();
});

test('verify at a time only one progressbar is active', async (t) => {
	await t.click(itemBasedStartButton());
	await t.click(itemBasedNextButton());
	await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
});
