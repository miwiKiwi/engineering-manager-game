import { createGameState, applyEffects } from './GameState.js';
import { CHARACTERS, CHARACTER_TYPES } from '../data/characters.js';
import { EMPLOYEE_EVENTS } from '../data/employeeEvents.js';
import { INTERNAL_DIALOGUES } from '../data/dialogues.js';
import { render, renderRelease, renderGameOver, renderVictory, renderTitleScreen, renderIntroScreen } from '../components/Renderer.js';
import * as Timer from './Timer.js';
import { Phase } from './phases.js';
import { checkAndApplyRelease } from './Release.js';
import { randomEventManager } from './RandomEventManager.js';
import { TIMINGS, THRESHOLDS } from './constants.js';

let state;

// DEBUG: Temporary debug functions to test mystery layer
window.debug777 = () => {
  if (state && state.fragments) {
    state.fragments.fragment1 = true;
    state.fragments.fragment2 = true;
    console.log('Fragments 1 & 2 activated. Win the game to see the glitch!');
  } else {
    console.log('Start a game first.');
  }
};

window.debugWin = () => {
  if (state) {
    state.releaseNumber = 2;
    state.progress = 99;
    console.log('Almost there... progress will hit 100 soon.');
  } else {
    console.log('Start a game first.');
  }
};
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
  cleanupMysteryLayer();
  state = createGameState();
  currentScene = null;
  phase = Phase.IDLE;
  usedDialogues = [];
  initUsedEvents();
  randomEventManager.reset();
  renderScene(null);
  startProgressTimer();
  nextTurn();
}

function cleanupMysteryLayer() {
  // Remove hidden symbol if present
  const symbol = document.querySelector('.hidden-symbol');
  if (symbol) symbol.remove();

  // Remove final reveal overlay if present
  const overlays = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 1000"]');
  overlays.forEach((el) => el.remove());
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
    if (phase === Phase.RANDOM_EVENT) return;

    if (state.morale > THRESHOLDS.MORALE_FOR_PROGRESS) {
      state.progress = Math.min(state.progress + 1, 100);
      render(state, currentScene);

      if (checkAndApplyRelease(state)) {
        handleRelease();
      }
    }
  }, TIMINGS.PROGRESS_INTERVAL);
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
    Timer.delay(() => nextTurn(), TIMINGS.PAUSE_BETWEEN_TURNS);
  });
}

function nextTurn() {
  if (phase !== Phase.IDLE) return;

  phase = Phase.THOUGHT;
  const dialogue = pickRandom(INTERNAL_DIALOGUES, usedDialogues);
  renderScene({ type: 'dialogue', text: dialogue });

  Timer.delay(() => {
    if (phase !== Phase.THOUGHT) return;

    // Check for random event after thought
    const randomEvent = randomEventManager.checkForEvent(state);
    if (randomEvent) {
      showRandomEvent(randomEvent);
    } else {
      spawnEmployee(dialogue);
    }
  }, TIMINGS.DIALOGUE_DURATION);
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
  }, TIMINGS.CHARACTER_ANIM_DURATION);
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
    Timer.delay(() => nextTurn(), TIMINGS.PAUSE_BETWEEN_TURNS);
  }, TIMINGS.CHARACTER_ANIM_DURATION);
}

function showRandomEvent(event) {
  phase = Phase.RANDOM_EVENT;

  renderScene({
    type: 'randomEvent',
    event,
    onChoice: (optionIndex) => handleRandomChoice(event, optionIndex),
  });
}

function handleRandomChoice(event, optionIndex) {
  const option = event.options[optionIndex];
  applyEffects(state, option.effects);

  if (state.gameOver) {
    phase = Phase.GAME_OVER;
    renderGameOver(state, startGame);
    return;
  }

  phase = Phase.IDLE;
  renderScene(null);
  Timer.delay(() => nextTurn(), TIMINGS.PAUSE_BETWEEN_TURNS);
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
