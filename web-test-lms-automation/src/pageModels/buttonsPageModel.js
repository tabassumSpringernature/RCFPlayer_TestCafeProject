// @flow
import { Selector } from 'testcafe';

export const checkAnswers = () => Selector('button').withAttribute('data-player-control', 'check-answers-button');
export const clearGradebookButton = () => Selector('div#appHeader button[type="button"]:nth-child(4) > span');
export const controlGroupButtons = () =>
	Selector('div')
		.withAttribute('data-control-group', 'marking')
		.find('button');
export const controlsBarButtons = () => Selector('div[data-controls-bar] button');
export const itemBasedBackButton = () => Selector('button').withAttribute('data-player-control', 'item-based-back-button');
export const itemBasedFinishButton = () => Selector('button').withAttribute('data-player-control', 'item-based-finish-button');
export const itemBasedNextButton = () => Selector("[data-player-control='item-based-next-button']");
export const itemBasedResetButton = () => Selector('button').withAttribute('data-player-control', 'item-based-reset-activity-button');
export const itemBasedStartButton = () => Selector('button').withAttribute('data-player-control', 'item-based-start-button');
export const nextActivitySetButton = () => Selector('button').withAttribute('data-player-control', 'next-activity-set-button');
export const playerTitleBarCloseButton = () => Selector('button').withAttribute('data-player-control', 'title-bar-close-button');

export const playerWindowToggleButton = () =>
	Selector('button').withAttribute('data-player-control', 'title-bar-request-toggle-window-size-button');
export const playlistCompletionPopUpButton = () => Selector('button.swal-button.swal-button');
export const playlistEndButton = () => Selector('button').withAttribute('data-player-control', 'end-playlist-button');
export const playlistNavigationNextButton = () =>
	Selector('button').withAttribute('data-player-control', 'activity-set-navigation-next-button');
export const playlistNavigationPreviousButton = () =>
	Selector('button').withAttribute('data-player-control', 'activity-set-navigation-previous-button');
export const reset = () => Selector('button').withAttribute('data-player-control', 'reset-activity-button');
export const scoreCardCloseButton = () => Selector('button').withAttribute('data-player-control', 'score-card-close');
export const showAll = () => Selector('button').withAttribute('data-player-control', 'show-all-button');
export const showAnswers = () => Selector('button').withAttribute('data-player-control', 'show-all-button');
export const showAnswersToggleButton = () => Selector('button').withAttribute('data-player-control', 'answers-toggle-button');
export const showOneByOne = () => Selector('button').withAttribute('data-player-control', 'show-one-by-one-button');
export const submitAnswers = () => Selector('button').withAttribute('data-player-control', 'submit-button');
export const submitButton = () => Selector('button').withAttribute('data-player-control', 'submit-button');
export const tryAgain = () => Selector('button').withAttribute('data-player-control', 'try-again-button');
export const playlistNavigationCloseButton = () =>
	Selector('button').withAttribute('data-player-control', 'activity-set-navigation-close-button');
