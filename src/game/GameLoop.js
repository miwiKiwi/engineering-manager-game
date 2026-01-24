import { createGameState, applyEffects, checkRelease } from './GameState.js';
import { CHARACTERS } from '../data/characters.js';
import { EMPLOYEE_EVENTS } from '../data/employeeEvents.js';
import { INTERNAL_DIALOGUES } from '../data/dialogues.js';
import { render, renderRelease, renderGameOver, renderVictory } from '../components/Renderer.js';

const PROGRESS_INTERVAL = 2000;
const DIALOGUE_DURATION = 2500;
const PAUSE_BETWEEN_TURNS = 1000;
const CHARACTER_ANIM_DURATION = 500;

let state;
let progressTimer = null;
let usedDialogues = [];
let usedEvents = { backend: [], frontend: [] };

export function startGame() {
  state = createGameState();
  usedDialogues = [];
  usedEvents = { backend: [], frontend: [] };
  render(state);
  startProgressTimer();
  nextTurn();
}

function startProgressTimer() {
  stopProgressTimer();
  progressTimer = setInterval(() => {
    if (state.gameOver || state.victory) {
      stopProgressTimer();
      return;
    }
    if (!state.waitingForDecision && state.morale > 30) {
      state.progress = Math.min(state.progress + 1, 100);
      render(state);

      if (checkRelease(state)) {
        stopProgressTimer();
        handleRelease();
      }
    }
  }, PROGRESS_INTERVAL);
}

function stopProgressTimer() {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

function handleRelease() {
  if (state.victory) {
    renderVictory(state);
    return;
  }

  state.waitingForDecision = true;
  renderRelease(state, () => {
    state.waitingForDecision = false;
    render(state);
    startProgressTimer();
    setTimeout(() => nextTurn(), PAUSE_BETWEEN_TURNS);
  });
}

function nextTurn() {
  if (state.gameOver || state.victory) return;

  showInternalDialogue(() => {
    if (state.gameOver || state.victory) return;
    spawnEmployee();
  });
}

function showInternalDialogue(callback) {
  const dialogue = pickRandom(INTERNAL_DIALOGUES, usedDialogues);
  render(state, { type: 'dialogue', text: dialogue });

  setTimeout(() => {
    callback();
  }, DIALOGUE_DURATION);
}

function spawnEmployee() {
  const characterType = Math.random() < 0.5 ? 'backend' : 'frontend';
  const character = CHARACTERS[characterType];
  const event = pickRandomEvent(characterType);

  if (!event) {
    usedEvents[characterType] = [];
    spawnEmployee();
    return;
  }

  const enterDirection = Math.random() < 0.5 ? 'left' : 'right';
  state.waitingForDecision = true;

  render(state, {
    type: 'employee',
    character,
    event,
    animating: 'enter',
    enterDirection,
  });

  setTimeout(() => {
    render(state, {
      type: 'employee',
      character,
      event,
      animating: null,
      enterDirection,
      onChoice: (optionIndex) => handleChoice(character, event, optionIndex),
    });
  }, CHARACTER_ANIM_DURATION);
}

function handleChoice(character, event, optionIndex) {
  const option = event.options[optionIndex];
  applyEffects(state, option.effects);
  state.waitingForDecision = false;

  render(state, {
    type: 'employee',
    character,
    event,
    animating: 'exit',
  });

  setTimeout(() => {
    if (state.gameOver) {
      stopProgressTimer();
      renderGameOver(state);
      return;
    }

    render(state);

    setTimeout(() => {
      nextTurn();
    }, PAUSE_BETWEEN_TURNS);
  }, CHARACTER_ANIM_DURATION);
}

function pickRandom(pool, usedPool) {
  if (usedPool.length >= pool.length) {
    usedPool.length = 0;
  }
  const available = pool.filter((item) => !usedPool.includes(item));
  const picked = available[Math.floor(Math.random() * available.length)];
  usedPool.push(picked);
  return picked;
}

function pickRandomEvent(characterType) {
  const events = EMPLOYEE_EVENTS[characterType];
  const used = usedEvents[characterType];
  if (used.length >= events.length) {
    return null;
  }
  const available = events.filter((e) => !used.includes(e.id));
  const picked = available[Math.floor(Math.random() * available.length)];
  used.push(picked.id);
  return picked;
}
