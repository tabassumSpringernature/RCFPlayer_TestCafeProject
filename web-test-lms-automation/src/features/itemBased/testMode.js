//@flow
import shortid from 'shortid';
import setAnswers from '../../lib/setAnswers';
import {
	clickCorrectAnswerForItemBasedTestModeFirstItem,
	clickCorrectAnswerForItemBasedTestModeSecondItem,
	itemBasedTestModeFirstItem,
	itemBasedTestModeSecondItem
} from '../../lib/data/exampleActivitySet';
import {
	itemBasedStartButton,
	itemBasedBackButton,
	itemBasedNextButton,
	itemBasedFinishButton,
	itemBasedResetButton,
	checkAnswers,
	showAnswers,
	clearGradebookButton
} from '../../pageModels/buttonsPageModel';
import {
	itemBasedCoverScreen,
	playlistPaginationText,
	itemBasedCoverScreenActivityModeLabel,
	itemBasedProgressBar,
	itemBasedProgressBarActiveClassNameRegExp,
	itemBasedProgressBarCorrectClassNameRegExp,
	itemBasedProgressBarWrongClassNameRegExp,
	itemBasedScoreScreen,
	itemBasedScoreScreenScore,
	itemBasedScoreScreenScorePercentageContent,
	itemBasedCompletionText,
	playerControls,
	itemBasedScoreScreenCorrectAnswerValue,
	itemBasedScoreScreenCorrectAnswerIcon,
	itemBasedScoreScreenWrongAnswer,
	itemBasedScoreScreenScoreText,
	itemBasedScoreScreenPercentageValue,
	itemBasedScoreScreenPercentageChar,
	itemBasedScoreScreenCorrectText,
	itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode,
	itemBasedCoverScreenActivityModeLabelForActivityType,
	itemBasedCoverScreenPrompt,
	itemBasedCoverScreenRule
} from '../../pageModels/componentsPageModel';
import { activityDisabled, itemBasedTestModeActivityId, correctAnswers } from '../../pageModels/rcfActivityPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedTestModeActivitySetId } from '../../lib/data/exampleActivitySet';
import { templateNameSelector, templateName, itemBasedTestMode } from '../../pageModels/templateTypePageModel';

fixture('Item Based Test Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'homework', role: 'student' });
});

tests();
testOnlyForStudents();

fixture('Item Based Test Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'student' });
});

tests();
testOnlyForStudents();

fixture('Item Based Test Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});

tests();

fixture('ItemBased Gradebook Student, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'gradebook', role: 'student' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'gradebook', role: 'student' });
});
noAttemptForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'gradebook', role: 'teacher' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedTestModeActivitySetId, origin: 'gradebook', role: 'teacher' });
});
noAttemptForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: itemBasedTestModeActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: itemBasedTestModeActivitySetId, studentId: t.ctx.studentId });
	});
testsForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: itemBasedTestModeActivitySetId,
			origin: 'homework',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: itemBasedTestModeActivitySetId, studentId: t.ctx.studentId });
	});
testsForGradebook();

function tests() {
	test('verify itembased mode', async (t) => {
		await t.expect(itemBasedTestMode()).eql('itemBased_test');
	});

	test('verify cover screen do not show pagination', async (t) => {
		await t.expect(playlistPaginationText().exists).notOk();
	});

	test('start with the activity set', async (t) => {
		//verify livesSVG is not visible on itemBasedCoverScreen_questionsTextContainer
		await t.expect(itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode().exists).ok();
		// verify the activityModelLabel type
		await t.expect(itemBasedCoverScreenActivityModeLabelForActivityType()).eql('itemBased_test');
		//verify cover screen prompt and rule
		await t.expect(itemBasedCoverScreenPrompt().innerText).eql('How many can you get right?');
		await t.expect(itemBasedCoverScreenRule().innerText).contains('Answer all the questions.');
		await t.click(itemBasedStartButton());
		await t.expect(itemBasedProgressBar().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedProgressBar().count).eql(2);
	});

	test('verify check answers', async (t) => {
		await t.click(itemBasedStartButton());
		await t.click(checkAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.expect(checkAnswers().exists).notOk();
		//check the first progress bar li is wrong
		await t
			.expect(
				itemBasedProgressBar()
					.nth(0)
					.withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists
			)
			.ok();

		await t.expect(checkAnswers().exists).notOk();

		// check there are no progress bar li's marked correct
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();

		// check there is just one wrong progress bar li
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).count).eql(1);

		//click itemBasedBackButton
		await t.click(itemBasedBackButton());
		await t.expect(itemBasedStartButton().exists).ok();
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(itemBasedCoverScreenActivityModeLabel().exists).ok();
	});

	test('verify activities are sequentially displayed; score screen; no next button on last activity item', async (t) => {
		await t.click(itemBasedStartButton());
		await t.expect(itemBasedTestModeActivityId(itemBasedTestModeFirstItem).exists).ok();
		//check the first progress bar li is active
		await t
			.expect(
				itemBasedProgressBar()
					.nth(0)
					.withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists
			)
			.ok();

		//navigate to next item
		await t.click(checkAnswers());
		await t.click(itemBasedNextButton());

		await t.expect(itemBasedTestModeActivityId(itemBasedTestModeSecondItem).exists).ok();

		//check the first progress bar li is not active
		await t
			.expect(
				itemBasedProgressBar()
					.nth(0)
					.withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists
			)
			.notOk();

		//check the second progress bar li is active
		await t
			.expect(
				itemBasedProgressBar()
					.nth(1)
					.withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists
			)
			.ok();

		//select correct answer
		await clickCorrectAnswerForItemBasedTestModeSecondItem();
		await t.click(checkAnswers());

		//check the second progress bar li is correct
		await t
			.expect(
				itemBasedProgressBar()
					.nth(1)
					.withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists
			)
			.ok();

		await t.click(itemBasedFinishButton());
		//verify score screen components
		await t.expect(itemBasedScoreScreen()().exists).ok();
		await t.expect(itemBasedResetButton().exists).ok();
		await t.expect(itemBasedCompletionText().exists).ok();
		await t.expect(itemBasedScoreScreenScore().exists).ok();
		await t.expect(itemBasedScoreScreenScorePercentageContent().exists).ok();

		await t.expect(itemBasedProgressBar().exists).notOk();
		await t.expect(itemBasedStartButton().exists).notOk();
		await t.expect(itemBasedCoverScreen().exists).notOk();
		await t.expect(itemBasedStartButton().exists).notOk();
		await t.expect(checkAnswers().exists).notOk();
		await t.expect(itemBasedNextButton().exists).notOk();
		await t.expect(itemBasedFinishButton().exists).notOk();

		//check no progress bar li is correct
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();

		await t.click(itemBasedResetButton());

		await t.expect(itemBasedStartButton().exists).ok();
		await t.expect(itemBasedCoverScreen().exists).ok();

		await t.click(itemBasedStartButton());

		await t.expect(itemBasedTestModeActivityId(itemBasedTestModeFirstItem).exists).ok();
		await t.click(checkAnswers());
		await t.click(itemBasedNextButton());

		await t.expect(itemBasedTestModeActivityId(itemBasedTestModeSecondItem).exists).ok();
	});
}

function testOnlyForStudents() {
	test('Student Role: verify check answers flow with wrong answers', async (t) => {
		await t.click(itemBasedStartButton());
		let itemCount = await itemBasedProgressBar().count;
		for (let i = 0; i < itemCount; i++) {
			await t
				.expect(
					itemBasedProgressBar()
						.nth(i)
						.withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists
				)
				.ok();
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			await t.expect(showAnswers().exists).notOk();
			await t.expect(showAnswers().exists).notOk();
			await t.expect(correctAnswers().exists).notOk();

			// on click to check answer button
			await t.click(checkAnswers());
			await t.expect(correctAnswers().exists).notOk();
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).count).eql(i + 1);
			await t
				.expect(
					itemBasedProgressBar()
						.nth(i)
						.withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists
				)
				.ok();
			await t.expect(itemBasedProgressBar().withAttribute(itemBasedProgressBarActiveClassNameRegExp).exists).notOk();
			await t.expect(showAnswers().exists).notOk();
			await t.expect(checkAnswers().exists).notOk();
			if (i == itemCount - 1) {
				await t.click(itemBasedFinishButton());
			} else {
				await t.click(itemBasedNextButton());
			}
		}
	});

	test('Student Role: verify check answers flow with correct answers', async (t) => {
		await t.click(itemBasedStartButton());
		let itemCount = await itemBasedProgressBar().count;
		for (let i = 0; i < itemCount; i++) {
			await t
				.expect(
					itemBasedProgressBar()
						.nth(i)
						.withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists
				)
				.ok();
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			await t.expect(showAnswers().exists).notOk();
			await t.expect(showAnswers().exists).notOk();
			await t.expect(correctAnswers().exists).notOk();

			// on click to check answer button
			if (i == itemCount - 1) {
				await clickCorrectAnswerForItemBasedTestModeSecondItem();
			} else {
				await clickCorrectAnswerForItemBasedTestModeFirstItem();
			}
			await t.click(checkAnswers());
			// await t.expect(correctAnswers().exists).ok();
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).count).eql(i + 1);
			await t
				.expect(
					itemBasedProgressBar()
						.nth(i)
						.withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists
				)
				.ok();
			await t.expect(itemBasedProgressBar().withAttribute(itemBasedProgressBarActiveClassNameRegExp).exists).notOk();
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists).notOk();
			await t.expect(showAnswers().exists).notOk();
			await t.expect(checkAnswers().exists).notOk();
			if (i == itemCount - 1) {
				await t.click(itemBasedFinishButton());
			} else {
				await t.click(itemBasedNextButton());
			}
		}
	});
}

function noAttemptForGradebook() {
	test('no attempt: activity has not been attempted, no player controls present', async (t) => {
		await t.expect(templateName()).eql('no-attempt-available');
		await t.expect(templateNameSelector().textContent).contains('This activity has not been attempted.');
		await t.expect(playerControls().exists).notOk();
	});
}

function testsForGradebook() {
	['student', 'teacher'].forEach((role) => {
		test('open student answered activity in Gradebbok role: teacher and student', async (t) => {
			await t.click(itemBasedStartButton());
			let itemCount = await itemBasedProgressBar().count;

			for (let i = 0; i < itemCount; i++) {
				if (i == itemCount - 1) {
					await clickCorrectAnswerForItemBasedTestModeSecondItem();
				} else {
					await clickCorrectAnswerForItemBasedTestModeFirstItem();
				}
				await t.click(checkAnswers());
				if (i == itemCount - 1) {
					await t.click(itemBasedFinishButton());
				} else {
					await t.click(itemBasedNextButton());
				}
			}
			await t.expect(itemBasedScoreScreen().exists).ok();

			await t.switchToMainWindow();
			//open activity in gradebook student role
			await openRcfPlayerForActivitySet({
				activitySetId: itemBasedTestModeActivitySetId,
				origin: 'gradebook',
				role: `${role}`,
				studentId: t.ctx.studentId
			});

			await t.expect(playerControls().count).eql(0);
			await t.expect(itemBasedScoreScreenScore().exists).ok();
			//verify score screen features
			await t.expect(itemBasedScoreScreenCorrectAnswerValue().innerText).eql('2');
			await t.expect(itemBasedScoreScreenCorrectAnswerIcon().innerText).eql(' x ');
			await t.expect(itemBasedScoreScreenWrongAnswer().innerText).eql('0');
			await t.expect(itemBasedScoreScreenScoreText().innerText).eql('Your score');
			await t.expect(itemBasedScoreScreenPercentageValue().innerText).eql('100');
			await t.expect(itemBasedScoreScreenPercentageChar().innerText).eql('%');
			await t.expect(itemBasedScoreScreenCorrectText().innerText).eql('correct');
			await t.expect(itemBasedCompletionText().innerText).eql('Awesome!');
		});
	});
}
