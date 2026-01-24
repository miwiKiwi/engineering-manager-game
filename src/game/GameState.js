export function createGameState() {
  return {
    sanity: 100,
    morale: 100,
    codeQuality: 80,
    progress: 0,
    releaseNumber: 0,
    gameOver: false,
    victory: false,
    waitingForDecision: false,
    gameOverReason: '',
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

export function checkRelease(state) {
  const milestones = [25, 50, 75, 100];
  const nextMilestone = milestones[state.releaseNumber];

  if (nextMilestone && state.progress >= nextMilestone) {
    state.releaseNumber++;

    if (state.releaseNumber >= 4) {
      state.victory = true;
    } else {
      state.codeQuality = clamp(state.codeQuality - 15, 0, 100);
      state.sanity = clamp(state.sanity + 15, 0, 100);
    }

    return true;
  }
  return false;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
