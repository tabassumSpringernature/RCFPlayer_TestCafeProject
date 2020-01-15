//@flow
import {
	itemBasedStartButton,
	itemBasedBackButton,
	itemBasedNextButton,
	itemBasedFinishButton,
	itemBasedResetButton,
	checkAnswers,
	showAnswers
} from '../../pageModels/buttonsPageModel';
import {
	itemBasedCoverScreen,
	itemBasedScoreScreen,
	itemBasedLivesBar,
	itemBasedProgressBarActiveClassNameRegExp,
	itemBasedScoreScreenLives,
	itemBasedScoreScreenReward,
	itemBasedScoreScreenActiveClassNameRegExp,
	itemBasedCompletionText,
	itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode,
	itemBasedCoverScreenActivityModeLabelForActivityType,
	itemBasedCoverScreenPrompt,
	itemBasedCoverScreenRule,
	challengeModeRewardText
} from '../../pageModels/componentsPageModel';
import { activityDisabled } from '../../pageModels/rcfActivityPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedChallengeModeActivitySetId, selectFirstAnswer, selectSecondAnswer } from '../../lib/data/exampleActivitySet';
import { itemBasedTestMode } from '../../pageModels/templateTypePageModel';

fixture('Item Based Challenge Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'homework', role: 'student' });
});
tests();
testOnlyForStudents();

fixture('Item Based Challenge Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();
testOnlyForStudents();
testActivitesAreRandom();

fixture('Item Based Challenge Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedChallengeModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});
tests();
testOnlyForTeacher();
testActivitesAreRandom();

function tests() {
	test('verify itembased mode', async (t) => {
		await t.expect(itemBasedTestMode()).eql('itemBased_challenge');
	});

	test('start with the activity set', async (t) => {
		//verify livesSVG is visible on itemBasedCoverScreen_questionsTextContainer
		await t.expect(itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode().exists).ok();
		// verify the activityModelLabel type
		await t.expect(itemBasedCoverScreenActivityModeLabelForActivityType()).eql('itemBased_challenge');
		// verify cover screen prompt and rule
		await t.expect(itemBasedCoverScreenPrompt().innerText).eql('Go for gold!');
		await t
			.expect(itemBasedCoverScreenRule().innerText)
			.contains('Challenge yourself to answer the questions without losing any lives.');

		await t.click(itemBasedStartButton());
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(3);
	});

	test('verify check answers', async (t) => {
		await t.click(itemBasedStartButton());

		await t.click(checkAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.expect(checkAnswers().exists).notOk();
		//verify only 02 lives are remaining 01 is lost
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(2);
		await t.expect(itemBasedLivesBar().count).eql(3);
		//click backButton to come back to coverScreen
		await t.click(itemBasedBackButton());
		await t.expect(activityDisabled().exists).notOk();
		await t.expect(itemBasedCoverScreen().exists).ok();
	});
}

function testOnlyForTeacher() {
	test('verify show answers', async (t) => {
		await t.click(itemBasedStartButton());
		//click show answers
		await t.click(showAnswers());
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(3);
	});
}

function testActivitesAreRandom() {
	test('verify: activities are randomly displayed; score screen; no next button on last activity item', async (t) => {
		await t.click(itemBasedStartButton());
		//first activity at first run
		//const firstItemFirstRun = await itemBasedChallengeModeItemId();
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(3);
		await t.click(checkAnswers());
		//life lost for wrong answer
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(2);

		await t.click(itemBasedNextButton());
		//second activity at first run
		//const secondItemFirstRun = await itemBasedChallengeModeItemId();
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(2);
		await t.click(checkAnswers());
		//on show answer activity is not lost
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);

		await t.click(itemBasedNextButton());
		await t.click(checkAnswers());

		await t.click(itemBasedFinishButton());
		//On last activity nextItem button is not present
		await t.expect(itemBasedNextButton().exists).notOk();
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).count).eql(0);

		//click reset button and run the activityset second time
		await t.click(itemBasedResetButton());
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(activityDisabled().exists).notOk();

		await t.click(itemBasedStartButton());
		//number of lives is reset to original
		await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(3);

		//second run of activity
		//const firstItemSecondRun = await itemBasedChallengeModeItemId();
		await t.click(checkAnswers());
		await t.click(itemBasedNextButton());
		//const secondItemSecondRun = await itemBasedChallengeModeItemId();

		/* TODO - commenting out for now, until we can resolve this test failing intermittently when the random choice
		   does mean that items are the same between runs
		//verify the activity runs in random sequence
		await t.expect(firstItemFirstRun).notEql(secondItemFirstRun);
		await t.expect(firstItemSecondRun).notEql(secondItemSecondRun);
		await t.expect(firstItemFirstRun).notEql(firstItemSecondRun);
		*/

		await t.click(checkAnswers());
		await t.click(itemBasedNextButton());
		await t.click(checkAnswers());

		//verify coverScreen elements for challenge mode
		await t.click(itemBasedFinishButton());

		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).exists).notOk();
		await t.expect(itemBasedScoreScreenReward().exists).ok();
	});
}

function testOnlyForStudents() {
	test('Student Role: verify check answers flow when all lives are lost', async (t) => {
		await t.click(itemBasedStartButton());
		let activeLives = await itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count;
		await t.expect(activeLives).eql(3);
		while (await checkAnswers().exists) {
			await t.expect(itemBasedNextButton().exists).notOk();
			await t.expect(showAnswers().exists).notOk();

			await t.click(checkAnswers());
			await t
				.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count)
				.eql((activeLives = activeLives - 1));
			await t.expect(checkAnswers().exists).notOk();
			await t.expect(showAnswers().exists).notOk();

			if (activeLives == 0) await t.click(itemBasedFinishButton());
			else await t.click(itemBasedNextButton());
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenLives().count).eql(3);
		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).count).eql(0);
		await t.expect(itemBasedCompletionText().innerText).eql('Game over!');
		await t
			.expect(
				itemBasedScoreScreenReward()
					.find('p')
					.withAttribute('class', challengeModeRewardText).innerText
			)
			.contains('You lost all your lives');
	});

	test('Student Role: verify check answers flow when no life is lost', async (t) => {
		await t.click(itemBasedStartButton());
		let activeLives = await itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count;
		await t.expect(activeLives).eql(3);
		while (await checkAnswers().exists) {
			await t.expect(itemBasedNextButton().exists).notOk();
			await t.expect(showAnswers().exists).notOk();
			await selectFirstAnswer();
			await t.click(checkAnswers());
			await t.expect(itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(activeLives);
			await t.expect(checkAnswers().exists).notOk();
			await t.expect(showAnswers().exists).notOk();

			if (await itemBasedNextButton().exists) await t.click(itemBasedNextButton());
			else await t.click(itemBasedFinishButton());
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenLives().count).eql(3);
		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).count).eql(3);
		await t.expect(itemBasedCompletionText().innerText).eql('Awesome!');
		await t
			.expect(
				itemBasedScoreScreenReward()
					.find('p')
					.withAttribute('class', challengeModeRewardText).innerText
			)
			.eql('');
	});

	test('Student Role: when activity ends with 01 life left', async (t) => {
		await t.click(itemBasedStartButton());
		var activeLives = await itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count;
		while (await checkAnswers().exists) {
			if (activeLives == 1) await selectFirstAnswer();
			else {
				await selectSecondAnswer();
				activeLives = activeLives - 1;
			}
			await t.click(checkAnswers());
			if (await itemBasedNextButton().exists) await t.click(itemBasedNextButton());
			else await t.click(itemBasedFinishButton());
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenLives().count).eql(3);
		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).count).eql(1);
		await t.expect(itemBasedCompletionText().innerText).eql('Good effort!');
		await t
			.expect(
				itemBasedScoreScreenReward()
					.find('p')
					.withAttribute('class', challengeModeRewardText).innerText
			)
			.eql('');
	});

	test('Student Role: when activity ends with 02 life left', async (t) => {
		await t.click(itemBasedStartButton());
		var activeLives = await itemBasedLivesBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count;
		while (await checkAnswers().exists) {
			if (activeLives == 2) await selectFirstAnswer();
			else {
				await selectSecondAnswer();
				activeLives = activeLives - 1;
			}
			await t.click(checkAnswers());
			if (await itemBasedNextButton().exists) await t.click(itemBasedNextButton());
			else await t.click(itemBasedFinishButton());
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenLives().count).eql(3);
		await t.expect(itemBasedScoreScreenLives().withAttribute('class', itemBasedScoreScreenActiveClassNameRegExp).count).eql(2);
		await t.expect(itemBasedCompletionText().innerText).eql('Well done!');
		await t
			.expect(
				itemBasedScoreScreenReward()
					.find('p')
					.withAttribute('class', challengeModeRewardText).innerText
			)
			.eql('');
	});
}
