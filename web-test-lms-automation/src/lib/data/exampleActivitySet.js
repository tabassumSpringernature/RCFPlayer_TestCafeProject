import { t, Selector, ClientFunction } from 'testcafe';
export const testActivitySetId = '3ec678a8311141818b02b17ec00d2316_practice';

export const closedGradableActivitySetId = '474e88d704ae43c1aedd9fb116486373';

export const clickCorrectAnswersForClosedGradableActivitySet = () =>
			t
				.click(Selector('.dropDown').nth(0))
				.click(Selector('[data-rcfid=item_2]').withText('In'))
				.click(Selector('.dropDown').nth(1))
				.click(Selector('[data-rcfid=item_1]').withText('Given'))
				.click(Selector('.dropDown').nth(2))
				.click(Selector('[data-rcfid=item_2]').withText('it'));

export const clickCorrectAnswerForDroppableInteraction = async () => {
	const selector = Selector('.active [data-rcfinteraction=dropDown]:not(.example) select');

	/* eslint-disable */
	const selectOption = ClientFunction(text => {
		var el = selectEl();
		var findOptionIndexByText = function (t) {
			for (var i = 0; i < el.options.length; i++) {
				if (el.options[i].text === t)
					return i;
			}
			return -1;
		};
		el.selectedIndex = findOptionIndexByText(text);
	});
	/* eslint-enable */
	await selectOption.with({ dependencies: { selectEl: selector } })('CORRECT');
};

export const selectCorrectAnswer = async () => {
	var select = Selector('.active .interactive [data-rcfinteraction]:not(.example) span').withText(/^correct$/i);
	var cnt = await select.count;
	for (let i = 0; i < cnt; i++) {
		let selected = await select.nth(i).getAttribute('class');
		if (selected.includes('selected')) {
			i = i + 1;
		} else {
			await t.click(select.nth(i));
		}
	}
};

export const selectFirstAnswer = async () => {
	var firstAnswer = Selector('.active [data-rcfid="item_1"].selectable');
	await t.click(firstAnswer);
};

export const selectSecondAnswer = async () => {
	var firstAnswer = Selector('.active [data-rcfid="item_2"].selectable');
	await t.click(firstAnswer);
};

export const dragDropClosedGradableActivitySetId = '2b3f6a296e6240e7a1e9f25d2b00d98e';
export const typeInClosedGradableActivitySetId = '084177678f6049e79acaacc6c295e309';
export const openGradableActivitySetId = '0c012b9796b541d98debc40d6e6d771b';
export const answerKeyActivitySetId = '9f59a01b417543a7986c50a431f81b17';
export const answerKeyActivityTitle = 'ANSWER-KEY: D30-38 Slides';
export const audioActivityId = '649f66ade9ad4874aabea0c4a77b004f';
export const nonGradableActivitySetId = '67a89a95fbe14665a6bb70cac6b91297';
export const itemBasedTestModeActivitySetId = 'cf40a6d2e88940e7952ec5ed3c2c80b4_test';
export const itemBasedTestModeFirstItem = 'itemRadio_2';
export const itemBasedTestModeSecondItem = 'itemRadio_1';
export const clickCorrectAnswerForItemBasedTestModeFirstItem = () => t.click(Selector('#itemRadio_2 [data-rcfid="item_1"]'));
export const clickCorrectAnswerForItemBasedTestModeSecondItem = () => t.click(Selector('#itemRadio_1 [data-rcfid="item_2"]'));
export const itemBasedChallengeModeActivitySetId = '200e7195914344878429fa17b1988b6f_challenge';
export const itemBasedChallengeModeItemId = () => Selector('[data-itemsettype="core"].active').getAttribute('data-rcfid');
export const itemBasedPracticeModeActivitySetId = '3ec678a8311141818b02b17ec00d2316_practice';

export const expectedStudentAnswers = {
	activity_1: { example: 'answers for activity_1, activitySetId 3ec678a8311141818b02b17ec00d2316_practice', answers: [], score: 0 },
	activity_2: { example: 'answers for activity_2, activitySetId 3ec678a8311141818b02b17ec00d2316_practice', answers: [], score: 0 }
};
