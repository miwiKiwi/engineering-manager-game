import { createGameState, applyEffects } from './GameState.js';
import { CHARACTERS, CHARACTER_TYPES } from '../data/characters.js';
import { EMPLOYEE_EVENTS } from '../data/employeeEvents.js';
import { INTERNAL_DIALOGUES } from '../data/dialogues.js';
import { render, renderRelease, renderGameOver, renderVictory, renderTitleScreen, renderIntroScreen } from '../components/Renderer.js';
import * as Timer from './Timer.js';
import { Phase } from './phases.js';
import { checkAndApplyRelease } from './Release.js';

const PROGRESS_INTERVAL = 1500;
const DIALOGUE_DURATION = 4000;
const PAUSE_BETWEEN_TURNS = 500;
const CHARACTER_ANIM_DURATION = 500;

let state;
let currentScene = null;
let phase = Phase.TITLE;
let usedDialogues = [];
let usedEvents = {};

function initUsedEvents() {
  usedEvents = {};
  CHARACTER_TYPES.forEach((type) => {
    usedEvents[type] = [];
  });
}

export function showTitleScreen() {
  Timer.clearAll();
  phase = Phase.TITLE;
  renderTitleScreen(showIntroScreen);
}

function showIntroScreen() {
  phase = Phase.INTRO;
  renderIntroScreen(startGame);
}

export function startGame() {
  Timer.clearAll();
  state = createGameState();
  currentScene = null;
  phase = Phase.IDLE;
  usedDialogues = [];
  initUsedEvents();
  renderScene(null);
  startProgressTimer();
  nextTurn();
}

function renderScene(scene) {
  currentScene = scene;
  render(state, scene);
}

function startProgressTimer() {
  Timer.repeat(() => {
    if (phase === Phase.GAME_OVER || phase === Phase.VICTORY) return;
    if (phase === Phase.RELEASING) return;
    if (phase === Phase.EMPLOYEE_ENTER || phase === Phase.EMPLOYEE_DIALOG) return;

    if (state.morale > 30) {
      state.progress = Math.min(state.progress + 1, 100);
      render(state, currentScene);

      if (checkAndApplyRelease(state)) {
        handleRelease();
      }
    }
  }, PROGRESS_INTERVAL);
}

function handleRelease() {
  if (state.victory) {
    phase = Phase.VICTORY;
    renderVictory(state, startGame);
    return;
  }

  phase = Phase.RELEASING;

  renderRelease(state, () => {
    if (phase !== Phase.RELEASING) return;
    phase = Phase.IDLE;
    renderScene(null);
    Timer.delay(() => nextTurn(), PAUSE_BETWEEN_TURNS);
  });
}

function nextTurn() {
  if (phase !== Phase.IDLE) return;

  phase = Phase.THOUGHT;
  const dialogue = pickRandom(INTERNAL_DIALOGUES, usedDialogues);
  renderScene({ type: 'dialogue', text: dialogue });

  Timer.delay(() => {
    if (phase !== Phase.THOUGHT) return;
    spawnEmployee(dialogue);
  }, DIALOGUE_DURATION);
}

function spawnEmployee(thoughtText) {
  const characterType = CHARACTER_TYPES[Math.floor(Math.random() * CHARACTER_TYPES.length)];
  const characterBase = CHARACTERS[characterType];
  const character = {
    ...characterBase,
    image: characterBase.images[Math.floor(Math.random() * characterBase.images.length)],
  };
  let event = pickRandomEvent(characterType);

  if (!event) {
    usedEvents[characterType] = [];
    event = pickRandomEvent(characterType);
  }

  const enterDirection = Math.random() < 0.5 ? 'left' : 'right';
  phase = Phase.EMPLOYEE_ENTER;

  renderScene({
    type: 'employee',
    character,
    event,
    animating: 'enter',
    enterDirection,
    thoughtText,
  });

  Timer.delay(() => {
    if (phase !== Phase.EMPLOYEE_ENTER) return;
    phase = Phase.EMPLOYEE_DIALOG;
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

  phase = Phase.EMPLOYEE_EXIT;

  renderScene({
    type: 'employee',
    character,
    event,
    animating: 'exit',
  });

  Timer.delay(() => {
    if (phase !== Phase.EMPLOYEE_EXIT) return;

    if (state.gameOver) {
      phase = Phase.GAME_OVER;
      renderGameOver(state, startGame);
      return;
    }

    phase = Phase.IDLE;
    renderScene(null);
    Timer.delay(() => nextTurn(), PAUSE_BETWEEN_TURNS);
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
