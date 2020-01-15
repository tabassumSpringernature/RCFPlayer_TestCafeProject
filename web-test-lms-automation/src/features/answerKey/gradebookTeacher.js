//@flow
import { answerKeyActivitySetId } from '../../lib/data/exampleActivitySet';
import openRcfPlayerForActivitySet from '../../lib/openRcfPlayerForActivitySet';

fixture('Answer Key Gradebook Teacher').beforeEach(async () => {
	await openRcfPlayerForActivitySet({ activitySetId: answerKeyActivitySetId, origin: 'gradebook', role: 'teacher' });
});
