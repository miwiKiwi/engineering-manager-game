import { clamp } from './utils.js';
import { INITIAL_STATS } from './constants.js';

export function createGameState() {
  return {
    ...INITIAL_STATS,
    gameOver: false,
    victory: false,
    gameOverReason: '',
    // Mystery layer - fragment tracking
    fragments: {
      fragment1: false, // ATLAS command in console
      fragment2: false, // 77.7% progress bar click
      fragment3: false, // Passphrase on victory screen
    },
  };
}

export function applyEffects(state, effects) {
  state.sanity = clamp(state.sanity + (effects.sanity || 0), 0, 100);
  state.morale = clamp(state.morale + (effects.morale || 0), 0, 100);
  state.codeQuality = clamp(state.codeQuality + (effects.codeQuality || 0), 0, 100);

  checkGameOver(state);
}

export function checkGameOver(state) {
  if (state.sanity <= 0) {
    state.gameOver = true;
    state.gameOverReason = 'Wypalenie zawodowe. Twoje Sanity spadło do zera.';
  } else if (state.morale <= 0) {
    state.gameOver = true;
    state.gameOverReason = 'Wszyscy odeszli z firmy. Morale zespołu spadło do zera.';
  }
}
