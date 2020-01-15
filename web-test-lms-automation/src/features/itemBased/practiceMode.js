//@flow
import shortid from 'shortid';
import setAnswers from '../../lib/setAnswers';
import {
	itemBasedStartButton,
	itemBasedBackButton,
	itemBasedNextButton,
	itemBasedFinishButton,
	itemBasedResetButton,
	showAnswersToggleButton,
	checkAnswers,
	showAnswers,
	clearGradebookButton
} from '../../pageModels/buttonsPageModel';
import {
	itemBasedCoverScreen,
	itemBasedScoreScreen,
	itemBasedProgressBarActiveClassNameRegExp,
	itemBasedProgressBarWrongClassNameRegExp,
	playlistPaginationText,
	itemBasedProgressBar,
	itemBasedScoreScreenCorrectAnswerValue,
	itemBasedScoreScreenCorrectAnswerIcon,
	itemBasedScoreScreenRetries,
	itemBasedScoreScreenScoreText,
	itemBasedScoreScreenScore,
	playerControls,
	itemBasedCompletionText,
	itemBasedScoreScreenPercentageValue,
	itemBasedScoreScreenPercentageChar,
	itemBasedScoreScreenCorrectText,
	itemBasedProgressBarCorrectClassNameRegExp,
	itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode,
	itemBasedCoverScreenActivityModeLabelForActivityType,
	itemBasedCoverScreenPrompt,
	itemBasedCoverScreenRule
} from '../../pageModels/componentsPageModel';
import { activityDisabled, activeActivityItem, correctAnswers } from '../../pageModels/rcfActivityPageModel';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';
import { itemBasedPracticeModeActivitySetId, clickCorrectAnswerForDroppableInteraction } from '../../lib/data/exampleActivitySet';
import { templateNameSelector, templateName, itemBasedTestMode } from '../../pageModels/templateTypePageModel';

fixture('Item Based Practice Mode Homework Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'homework', role: 'student' });
});
tests();
testOnlyForStudents();

fixture('Item Based Practice Mode Hotspot Student, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'hotspot', role: 'student' });
});
tests();
testOnlyForStudents();

fixture('Item Based Practice Mode Hotspot Teacher, single activity set').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'hotspot', role: 'teacher' });
});
tests();
testOnlyForTeacher();

fixture('ItemBased Gradebook Student, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'gradebook', role: 'student' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'gradebook', role: 'student' });
});
noAttemptForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set').beforeEach(async (t) => {
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'gradebook', role: 'teacher' });
	await t.switchToMainWindow();
	await t.click(clearGradebookButton());
	await t.eval(() => location.reload(true));
	await openRcfPlayerForActivitySet({ activitySetId: itemBasedPracticeModeActivitySetId, origin: 'gradebook', role: 'teacher' });
});
noAttemptForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: itemBasedPracticeModeActivitySetId,
			origin: 'hotspot',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: itemBasedPracticeModeActivitySetId, studentId: t.ctx.studentId });
	});
testsForGradebook();

fixture('ItemBased Gradebook Teacher, single activity set')
	.beforeEach(async (t) => {
		// Choose a random student id for this test
		t.ctx.studentId = shortid.generate();
		await openRcfPlayerForActivitySet({
			activitySetId: itemBasedPracticeModeActivitySetId,
			origin: 'homework',
			role: 'student',
			studentId: t.ctx.studentId
		});
	})
	.afterEach(async (t) => {
		// Clean up student lms state - clear any answers for this student / activity set id with a direct api call to api-test-lms
		await setAnswers({ activitySetId: itemBasedPracticeModeActivitySetId, studentId: t.ctx.studentId });
	});
testsForGradebook();

function tests() {
	test('verify itembased mode', async (t) => {
		await t.expect(itemBasedTestMode()).eql('itemBased_practice');
	});

	test('verify cover screen do not show pagination', async (t) => {
		await t.expect(playlistPaginationText().exists).notOk();
	});

	test('start with the activity set', async (t) => {
		//verify livesSVG is not visible on itemBasedCoverScreen_questionsTextContainer
		await t.expect(itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode().exists).ok();
		//verify the activityModelLabel type
		await t.expect(itemBasedCoverScreenActivityModeLabelForActivityType()).eql('itemBased_practice');
		//verify cover screen prompt and rule
		await t.expect(itemBasedCoverScreenPrompt().innerText).eql('Practice makes perfect');
		await t
			.expect(itemBasedCoverScreenRule().innerText)
			.contains("Answer all the questions. If you get one wrong, you'll get a chance to try it again.");
		await t.click(itemBasedStartButton());
		await t.expect(itemBasedStartButton().exists).notOk();
		await t.expect(itemBasedProgressBar().hasAttribute('disabled')).notOk();
		await t.expect(itemBasedProgressBar().count).eql(3);
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists).notOk();
	});

	test('verify check answers', async (t) => {
		await t.click(itemBasedStartButton());
		//initial number of progress bar
		await t.expect(itemBasedProgressBar().count).eql(3);
		await t.click(checkAnswers());
		await t.expect(activityDisabled().exists).ok();
		await t.expect(checkAnswers().exists).notOk();
		//progress bar for wrong answer
		await t.expect(itemBasedProgressBar().count).eql(3);
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).exists).notOk();
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).exists).ok();
		//click backButton to come back to coverScreen
		await t.click(itemBasedBackButton());
		await t.expect(activityDisabled().exists).notOk();
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(itemBasedStartButton().exists).ok();
	});

	test('verify score screen', async (t) => {
		await t.click(itemBasedStartButton());
		while (await checkAnswers().exists) {
			await clickCorrectAnswerForDroppableInteraction();
			await t.click(checkAnswers());
			//verify progress bar gets activated  for correct answer
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).exists).ok();

			if (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
			} else {
				await t.click(itemBasedFinishButton());
			}
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
		await t.expect(itemBasedScoreScreenScore().exists).ok();
		//verify score screen  features
		await t.expect(itemBasedScoreScreenCorrectAnswerValue().innerText).eql('3');
		await t.expect(itemBasedScoreScreenCorrectAnswerIcon().innerText).eql(' x ');
		await t.expect(itemBasedScoreScreenRetries().innerText).eql('Retries: 0');
		await t.expect(itemBasedScoreScreenScoreText().innerText).eql('Your score');
		await t.expect(itemBasedScoreScreenPercentageValue().innerText).eql('100');
		await t.expect(itemBasedScoreScreenPercentageChar().innerText).eql('%');
		await t.expect(itemBasedScoreScreenCorrectText().innerText).eql('accuracy');
		//on reset user is back to cover screen
		await t.click(itemBasedResetButton());
		await t.expect(itemBasedCoverScreen().exists).ok();
		await t.expect(itemBasedStartButton().exists).ok();
	});
}

test('verify score screen on retries', async (t) => {
	await t.click(itemBasedStartButton());
	for (let i = 0; i <= 2; i++) {
		await t.click(checkAnswers());
		await t.click(itemBasedNextButton());
	}
	while (await checkAnswers().exists) {
		await clickCorrectAnswerForDroppableInteraction();
		await t.click(checkAnswers());
		if (await itemBasedNextButton().exists) {
			await t.click(itemBasedNextButton());
		} else {
			await t.click(itemBasedFinishButton());
		}
	}
	await t.expect(itemBasedScoreScreen().exists).ok();
	await t.expect(itemBasedScoreScreenCorrectAnswerValue().innerText).eql('3');
	await t.expect(itemBasedScoreScreenRetries().innerText).eql('Retries: 3');
});

function testOnlyForTeacher() {
	test('Teacher Role: verify check answers flow for teachers', async (t) => {
		await t.click(itemBasedStartButton());
		//click show answers
		while (await checkAnswers().exists) {
			await t.click(checkAnswers());
			await t.expect(itemBasedProgressBar().count).eql(3);
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			if (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
			} else {
				await t.click(itemBasedFinishButton());
			}
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
	});

	test('Teacher Role: verify show answers for teachers', async (t) => {
		await t.click(itemBasedStartButton());
		//click show answers
		while (await showAnswers().exists) {
			await t.click(showAnswers());
			await t.expect(itemBasedProgressBar().count).eql(3);
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			if (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
			} else {
				await t.click(itemBasedFinishButton());
			}
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
	});
}

function testOnlyForStudents() {
	test('Student Role: verify check answers flow with wrong answer, wrong answer gets qued at the end to be recycled', async (t) => {
		await t.click(itemBasedStartButton());
		let itemCount = 1;
		let firstActiveActivityItem = await activeActivityItem();
		//click show answers
		while ((await checkAnswers().exists) && itemCount <= 5) {
			await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
			await t.click(checkAnswers());
			await t.expect(activityDisabled().exists).ok();
			await t.expect(showAnswers().hasAttribute('disabled')).notOk();
			await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
			await t.expect(itemBasedProgressBar().count).eql(3);
			//progressbar dont get active on wrong answer
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			while (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
				itemCount = itemCount + 1;
				console.log('count of item : ', itemCount);
				//verify the wrong answer get stacked to be replayed again
				if (itemCount == 4) {
					await t.expect(activeActivityItem()).eql(firstActiveActivityItem);
				}
			}
		}
	});

	test('Student Role: verify check answers flow with correct answer', async (t) => {
		await t.click(itemBasedStartButton());
		//click show answers
		while (await checkAnswers().exists) {
			await t.expect(checkAnswers().hasAttribute('disabled')).notOk();
			await clickCorrectAnswerForDroppableInteraction();
			await t.click(checkAnswers());
			await t.expect(activityDisabled().exists).ok();
			await t.expect(showAnswers().exists).notOk();
			await t.expect(itemBasedNextButton().hasAttribute('disabled')).notOk();
			await t.expect(itemBasedProgressBar().count).eql(3);
			//at a time only one progressbar is active, for correct answer correctAnswer class is added to progress bar
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			while (await itemBasedNextButton().exists) {
				await t.click(itemBasedNextButton());
				await clickCorrectAnswerForDroppableInteraction();
				await t.click(checkAnswers());
				await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			}
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarCorrectClassNameRegExp).count).eql(3);
			await t.click(itemBasedFinishButton());
		}
		await t.expect(itemBasedScoreScreen().exists).ok();
	});

	test('Student Role: verify show answers for students', async (t) => {
		await t.click(itemBasedStartButton());
		let itemCount = 1;
		let firstActiveActivityItem = await activeActivityItem();
		while ((await checkAnswers().exists) && itemCount <= 5) {
			await t.click(checkAnswers());
			await t.expect(activityDisabled().exists).ok();
			//click show answers
			await t.click(showAnswers());
			await t.expect(correctAnswers().exists).ok();
			await t.expect(activityDisabled().exists).ok();
			//only one bar of progressbar is active at a time
			await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarActiveClassNameRegExp).count).eql(1);
			//check togglebutton button
			await t.expect(showAnswersToggleButton().hasAttribute('disabled')).notOk();
			await t.expect(showAnswersToggleButton().innerText).eql('My answers');
			await t.click(showAnswersToggleButton());
			await t.expect(showAnswersToggleButton().innerText).eql('Correct answers');
			await t.expect(correctAnswers().exists).notOk();
			await t.click(showAnswersToggleButton());
			await t.expect(correctAnswers().exists).ok();
			await t.click(itemBasedNextButton());
			itemCount = itemCount + 1;
			if (itemCount == 4) {
				await t.expect(activeActivityItem()).eql(firstActiveActivityItem);
			}
		}
		await t.expect(itemBasedProgressBar().withAttribute('class', itemBasedProgressBarWrongClassNameRegExp).count).eql(3);
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
		test('hotspot,Homework to Gradebook: open student answered activity in Gradebbok role: teacher and student', async (t) => {
			await t.click(itemBasedStartButton());
			while (await checkAnswers().exists) {
				await clickCorrectAnswerForDroppableInteraction();
				await t.click(checkAnswers());

				if (await itemBasedNextButton().exists) {
					await t.click(itemBasedNextButton());
				} else {
					await t.click(itemBasedFinishButton());
				}
			}
			await t.expect(itemBasedScoreScreen().exists).ok();

			await t.switchToMainWindow();
			//open activity in gradebook student role
			await openRcfPlayerForActivitySet({
				activitySetId: itemBasedPracticeModeActivitySetId,
				origin: 'gradebook',
				role: `${role}`,
				studentId: t.ctx.studentId
			});

			await t.expect(playerControls().count).eql(0);
			await t.expect(itemBasedScoreScreenScore().exists).ok();
			//verify score screen features
			await t.expect(itemBasedScoreScreenCorrectAnswerValue().innerText).eql('3');
			await t.expect(itemBasedScoreScreenCorrectAnswerIcon().innerText).eql(' x ');
			await t.expect(itemBasedScoreScreenRetries().innerText).eql('Retries: 0');
			await t.expect(itemBasedScoreScreenScoreText().innerText).eql('Your score');
			await t.expect(itemBasedScoreScreenPercentageValue().innerText).eql('100');
			await t.expect(itemBasedScoreScreenPercentageChar().innerText).eql('%');
			await t.expect(itemBasedScoreScreenCorrectText().innerText).eql('accuracy');
			await t.expect(itemBasedCompletionText().innerText).eql('Awesome!');
		});
	});
}
//test to check items are run in random fashion
