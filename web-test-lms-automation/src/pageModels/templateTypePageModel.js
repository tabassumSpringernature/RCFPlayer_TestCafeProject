// @flow

import { Selector } from 'testcafe';

export const itemBasedTestMode = () =>
	Selector('div')
		.withAttribute('data-activity-mode')
		.getAttribute('data-activity-mode');
export const templateName = () =>
	Selector('div')
		.withAttribute('data-template')
		.getAttribute('data-template');
export const templateNameSelector = () => Selector('div').withAttribute('data-template');
export const waitForPageLoaded = () => Selector('title').withExactText('rcf player');
export const roleStudent = () => Selector('[data-user-role=student]');
export const roleTeacher = () => Selector('[data-user-role=teacher]');
