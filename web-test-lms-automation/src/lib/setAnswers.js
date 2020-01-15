// @flow
import fetch from 'node-fetch';
import type { SetAnswersForActivitySetOptions } from '@rcf/universal-library-rcf-player';
import TestRcfAdapter from '@rcf/universal-library-test-rcf-adapter';
import config from '@rcf/universal-library-config';

// Add fetch to global so api call will work
global.fetch = fetch;

declare type Options = {
	activitySetId: string,
	studentId: string,
	answers?: {}
};

const setAnswers = async ({ activitySetId, studentId, answers = {} }: Options): Promise<void> => {
	const { setAnswersForActivitySet } = new TestRcfAdapter({ config, contentWebviewWindow: undefined, debugMode: 'production' });

	const setAnswersForActivitySetOptions: SetAnswersForActivitySetOptions = {
		student: studentId,
		durationInSeconds: 100, // fake for now,
		activitySetId,
		answers,
		maxScore: 10, // fake for now,
		userScore: 8, // fake for now,
		submitType: 'submit-closed-gradable' // fake for now
	};

	return setAnswersForActivitySet(setAnswersForActivitySetOptions);
};

export default setAnswers;
