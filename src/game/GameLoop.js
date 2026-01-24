import { createGameState, applyEffects, checkRelease } from './GameState.js';
import { CHARACTERS } from '../data/characters.js';
import { EMPLOYEE_EVENTS } from '../data/employeeEvents.js';
import { INTERNAL_DIALOGUES } from '../data/dialogues.js';
import { render, renderRelease, renderGameOver, renderVictory } from '../components/Renderer.js';

const PROGRESS_INTERVAL = 1500;
const DIALOGUE_DURATION = 4000;
const PAUSE_BETWEEN_TURNS = 500;
const CHARACTER_ANIM_DURATION = 500;

let state;
let currentScene = null;
let progressTimer = null;
let turnTimer = null;
let releaseInProgress = false;
let usedDialogues = [];
let usedEvents = { backend: [], frontend: [] };

export function startGame() {
  state = createGameState();
  currentScene = null;
  releaseInProgress = false;
  if (turnTimer) clearTimeout(turnTimer);
  turnTimer = null;
  usedDialogues = [];
  usedEvents = { backend: [], frontend: [] };
  renderScene(null);
  startProgressTimer();
  nextTurn();
}

function renderScene(scene) {
  currentScene = scene;
  render(state, scene);
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
      render(state, currentScene);

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

  releaseInProgress = true;
  if (turnTimer) clearTimeout(turnTimer);
  turnTimer = null;
  state.waitingForDecision = true;

  renderRelease(state, () => {
    releaseInProgress = false;
    state.waitingForDecision = false;
    renderScene(null);
    startProgressTimer();
    turnTimer = setTimeout(() => nextTurn(), PAUSE_BETWEEN_TURNS);
  });
}

function nextTurn() {
  if (state.gameOver || state.victory || releaseInProgress) return;

  const dialogue = pickRandom(INTERNAL_DIALOGUES, usedDialogues);
  renderScene({ type: 'dialogue', text: dialogue });

  setTimeout(() => {
    if (state.gameOver || state.victory || releaseInProgress) return;
    spawnEmployee(dialogue);
  }, DIALOGUE_DURATION);
}

function spawnEmployee(thoughtText) {
  const characterType = Math.random() < 0.5 ? 'backend' : 'frontend';
  const character = CHARACTERS[characterType];
  let event = pickRandomEvent(characterType);

  if (!event) {
    usedEvents[characterType] = [];
    event = pickRandomEvent(characterType);
  }

  const enterDirection = Math.random() < 0.5 ? 'left' : 'right';
  state.waitingForDecision = true;

  renderScene({
    type: 'employee',
    character,
    event,
    animating: 'enter',
    enterDirection,
    thoughtText,
  });

  setTimeout(() => {
    if (state.gameOver || state.victory || releaseInProgress) return;
    renderScene({
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

  renderScene({
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
    if (releaseInProgress) return;

    renderScene(null);

    turnTimer = setTimeout(() => {
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
