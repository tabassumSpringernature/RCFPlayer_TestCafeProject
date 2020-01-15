// @flow
import { Selector } from 'testcafe';
export const activityTitle = () => Selector('[data-player-control=title-bar-activity-set-title]');
export const itemBasedCompletionText = () =>
	Selector('[data-player-control=item-based-score-screen] [data-player-control=completion-text]');
export const challengeModeRewardText = /player__reward_text/;

export const itemBasedCoverScreen = () => Selector('[data-player-control=item-based-cover-screen]');
export const itemBasedLivesBar = () => Selector('[data-player-control=item-based-header] [data-player-control=lives-progress] li');
export const itemBasedCoverScreenActivityModeLabel = () =>
	Selector('[data-player-control=item-based-cover-screen] [data-player-control=activity-mode-label]');
export const itemBasedCoverScreenActivityModeLabelForActivityType = () =>
	Selector(itemBasedCoverScreenActivityModeLabel()).getAttribute('aria-label');
export const itemBasedCoverScreenActivityModeLabelSvg = () => Selector(itemBasedCoverScreenActivityModeLabel()).find('svg');
export const itemBasedCoverScreenActivitySetTitle = () =>
	Selector('[data-player-control=item-based-cover-screen] [data-player-control=activity-set-title]');
export const itemBasedProgressBarWrongClassNameRegExp = /progressBar_wrong/;
export const itemBasedProgressBarCorrectClassNameRegExp = /progressBar_correct/;
export const itemBasedProgressBarActiveClassNameRegExp = /progressBar_active/;
export const itemBasedScoreScreenActiveClassNameRegExp = /life_active/;

export const itemBasedScoreScreen = () => Selector('[data-player-control=item-based-score-screen]');
export const itemBasedScoreScreenScore = () => Selector('[data-player-control=item-based-score-screen] [data-player-control=score]');
export const itemBasedScoreScreenLives = () => Selector('[data-player-control=item-based-score-screen] [data-player-control=lives] li');
export const itemBasedScoreScreenReward = () => Selector('[data-player-control=item-based-score-screen] [data-player-control=reward]');
export const itemBasedScoreScreenScorePercentageContent = () =>
	Selector('[data-player-control=item-based-score-screen] [data-player-control=score-percentage-content]');
export const playerControls = () => Selector('[data-controls-bar=true]');
export const playerFullScreenMode = () => Selector('div').withAttribute('data-display-type', 'full-screen');
export const playerId = () => Selector('#player-root');
export const playerMaximizedMode = () => Selector('div').withAttribute('data-display-type', 'maximized');
export const playerTitleBar = () => Selector('[data-player-control=title-bar-activity-set-title]').parent();
export const playerWindowedMode = () => Selector('div').withAttribute('data-display-type', 'windowed');
export const playlistCompletionPopUp = () => Selector('.swal-overlay .swal-text');
export const playlistPaginationText = () =>
	Selector('span').withAttribute('data-player-control', 'activity-set-navigation-pagination-text');
export const scoreCard = () => Selector('[data-player-control=score-card]');
export const scoreCardText = () =>
	Selector(scoreCard())
		.find('div')
		.withAttribute('class', /player__scoreCard_scoreText/);

export const itemBasedCoverScreenQuestionsTextContainer = () =>
	Selector(itemBasedCoverScreen())
		.find('div')
		.withAttribute('class', /itemBasedCoverScreen_questionsTextContainer/);
export const itemBasedCoverScreenQuestionsTextContainerLivesForChallengeMode = () =>
	Selector('[data-player-control=item-based-cover-screen] span svg #titleLives');

export const showAnswersText = () => Selector('[data-player-control=show-answers-text]');
export const itemBasedScoreScreenCorrectAnswerValue = () =>
	Selector(itemBasedScoreScreenScore())
		.find('span')
		.withAttribute('class', /correctText/);
export const itemBasedScoreScreenCorrectAnswerIcon = () =>
	itemBasedScoreScreenScore()
		.find('span')
		.withAttribute('class', /correctIcon/);
export const itemBasedScoreScreenRetries = () =>
	Selector(itemBasedScoreScreenScore())
		.find('span')
		.withAttribute('class', /attemptsText/);
export const itemBasedScoreScreenScoreText = () =>
	Selector(itemBasedScoreScreenScorePercentageContent())
		.find('span')
		.withAttribute('class', /youScoreText/);
export const itemBasedScoreScreenPercentageValue = () =>
	Selector(itemBasedScoreScreenScorePercentageContent())
		.find('span')
		.withAttribute('class', /percentageValue/);
export const itemBasedScoreScreenPercentageChar = () =>
	Selector(itemBasedScoreScreenScorePercentageContent())
		.find('span')
		.withAttribute('class', /percentageChar/);
export const itemBasedScoreScreenCorrectText = () =>
	Selector(itemBasedScoreScreenScorePercentageContent())
		.find('span')
		.withAttribute('class', /correctText/);
export const itemBasedProgressBar = () =>
	Selector('[data-player-control=item-based-header] [data-player-control=itemBased-progressBar] li');
export const itemBasedScoreScreenWrongAnswer = () =>
	Selector(itemBasedScoreScreenScore())
		.find('span')
		.withAttribute('class', /itemBasedScoreScreen_wrongText/);
export const itemBasedCoverScreenPrompt = () =>
	Selector(itemBasedCoverScreen())
		.find('div')
		.withAttribute('class', /player__itemBasedCoverScreen_promptContainer/);
export const itemBasedCoverScreenRule = () =>
	Selector(itemBasedCoverScreen())
		.find('div')
		.withAttribute('class', /player__itemBasedCoverScreen_rulesContainer/);
