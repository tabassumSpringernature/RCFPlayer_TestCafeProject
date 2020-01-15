//@flow
import { answerKeyActivitySetId } from '../../lib/data/exampleActivitySet';
import { playerWindowToggleButton, playlistNavigationCloseButton } from '../../pageModels/buttonsPageModel';
import { playerWindowedMode, playerMaximizedMode, playerFullScreenMode } from '../../pageModels/componentsPageModel';
import openRcfPlayerActivitiesInPlaylist from '../../lib/openRcfPlayerActivitiesInPlaylist';

fixture('Answer Key Hotspot Teacher, single activity set in playlist, windowed').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({
		activitySetIds: [answerKeyActivitySetId],
		origin: 'hotspot',
		role: 'teacher',
		displayType: 'windowed'
	});
});

test('player starts in windowed mode', async (t) => {
	await t.expect(playerWindowedMode().exists).ok();
});

test('clicking window toggle switches to maximized mode', async (t) => {
	await t.click(playerWindowToggleButton());
	await t.expect(playerMaximizedMode().exists).ok();
});

test('clicking window toggle again switches back to windowed mode', async (t) => {
	await t.click(playerWindowToggleButton());
	await t.expect(playerMaximizedMode().exists).ok();
	await t.click(playerWindowToggleButton());
	await t.expect(playerWindowedMode().exists).ok();
});

fixture('Answer Key Hotspot Teacher, single activity set in playlist, maximized').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({
		activitySetIds: [answerKeyActivitySetId],
		origin: 'hotspot',
		role: 'teacher',
		displayType: 'maximized'
	});
});

test('player starts in maximized mode', async (t) => {
	await t.expect(playerMaximizedMode().exists).ok();
});

test('clicking window toggle switches to windowed mode', async (t) => {
	await t.click(playerWindowToggleButton());
	await t.expect(playerWindowedMode().exists).ok();
});

test('clicking window toggle again switches back to maximized mode', async (t) => {
	await t.click(playerWindowToggleButton());
	await t.expect(playerWindowedMode().exists).ok();
	await t.click(playerWindowToggleButton());
	await t.expect(playerMaximizedMode().exists).ok();
});

fixture('Answer Key Hotspot Teacher, single activity set in playlist, full-screen').beforeEach(async () => {
	await openRcfPlayerActivitiesInPlaylist({
		activitySetIds: [answerKeyActivitySetId],
		origin: 'hotspot',
		role: 'teacher',
		displayType: 'full-screen'
	});
});

test('player starts in full-screen mode', async (t) => {
	await t.expect(playerFullScreenMode().exists).ok();
});

test('activity set navigation close button shown', async (t) => {
	await t.expect(playlistNavigationCloseButton().exists).ok();
});
