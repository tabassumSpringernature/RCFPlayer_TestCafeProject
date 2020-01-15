// @flow

import { Selector } from 'testcafe';

export const activitySetId = () =>
	Selector('span')
		.withAttribute('data-activity-set-id')
		.getAttribute('data-activity-set-id');
export const getAnswersForActivitySet = () => Selector('.get-answers-for-activity-set');
export const manifestForActivity = () => Selector('textarea').withAttribute('data-manifest-details');
export const setAnswersForActivitySet = () => Selector('.set-answers-for-activity-set');
export const studentAnswers = () => Selector('textarea').withAttribute('data-student-answers');
export const studentId = () =>
	Selector('span')
		.withAttribute('data-student-id')
		.getAttribute('data-student-id');
export const waitForPageLoaded = () => Selector('title').withExactText('rcf player');
