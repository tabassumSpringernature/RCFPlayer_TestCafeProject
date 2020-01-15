// @flow
import { Selector } from 'testcafe';

export const activityDesktop = () => Selector('#activity.desktop');
export const activityDisabled = () => Selector('.activity.disabled');
export const activityMarksBeingShown = () => Selector('.activity.marking');
export const answerKeyAnswers = () => Selector('.answerKey.selectable');
export const answerKeyAnswersRevealed = () => Selector('.answerKey.selectable.selected');
export const audioCurrentTime = () => Selector('.mm_presentation [data-rcfinteraction=audioElement] .audioCurrentTime');
export const audioFile = () => Selector('.audioPlayButton');
export const correctAnswers = () => Selector('.correctAnswers');
export const itemBasedTestModeActivityId = (activityId: string) => Selector(`[data-rcfid="${activityId}"]`);
export const playerContent = () => Selector('#activity');
export const complexDragDropActivity = () => Selector('[data-rcfinteraction=complexDroppable]:not(.example) .dragTarget');
export const writingActivity = () => Selector('.studentInteractions .rcfTextArea');
export const activeActivityItem = () =>
	Selector('.active')
		.withAttribute('data-rcfid')
		.getAttribute('data-rcfid');
export const teacherScoreInput = (dataRcfId: string) => Selector(`[data-rcfid=writing_${dataRcfId}] .teacherScoreInput`);
export const teacherCommentsBox = (dataRcfId: string) => Selector(`[data-rcfid=writing_${dataRcfId}] .teacherInteractionCommentTextArea`);

export const activityHasLoaded = () => Selector('[data-loaded=true]');
