import { createGameState, applyEffects } from './GameState.js';
import { CHARACTERS, CHARACTER_TYPES } from '../data/characters.js';
import { EMPLOYEE_EVENTS } from '../data/employeeEvents.js';
import { INTERNAL_DIALOGUES } from '../data/dialogues.js';
import { render, renderRelease, renderGameOver, renderVictory, renderTitleScreen, renderIntroScreen, resetMysteryLayerBinding } from '../components/Renderer.js';
import * as Timer from './Timer.js';
import { Phase } from './phases.js';
import { checkAndApplyRelease } from './Release.js';
import { randomEventManager } from './RandomEventManager.js';
import { TIMINGS, THRESHOLDS } from './constants.js';

let state;

// DEBUG: Temporary debug functions to test mystery layer
window.debugFragment2 = () => {
  if (state && state.fragments) {
    state.fragments.fragment1 = true;
    state.progress = 69;
    render(state, currentScene);
    console.log('Fragment 1 activated. Progress set to 69%. Wait for 71.5% to test fragment 2.');
  } else {
    console.log('Start a game first.');
  }
};

window.debugVictoryGlitch = () => {
  if (state && state.fragments) {
    state.fragments.fragment1 = true;
    state.fragments.fragment2 = true;
    state.releaseNumber = 2;
    state.progress = 96;
    render(state, currentScene);
    console.log('Both fragments activated. Progress at 96%. Win the game to see the glitch!');
  } else {
    console.log('Start a game first.');
  }
};

// Mystery layer: ATLAS command
window.ATLAS = () => {
  if (!state) {
    console.log('...');
    return;
  }
  if (state.fragments.fragment1) {
    console.log('You already know the way.');
    return;
  }
  state.fragments.fragment1 = true;
  state.sanity = Math.min(state.sanity + 10, 100);
  render(state, currentScene);
  console.log(`
%c╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   WELCOME, OBSERVER                                        ║
║                                                            ║
║   You found the first key.                                 ║
║                                                            ║
║   PATTERNS                                                 ║
║                                                            ║
║   "Patterns exist in chaos.                                ║
║    Most people are too distracted to see them.             ║
║    You noticed. That's all it takes."                      ║
║                                                            ║
║   → observer-notes.net/fragment-1                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`, 'color: #00adb5; font-family: monospace;');
};

let currentScene = null;
let phase = Phase.TITLE;
let usedDialogues = [[], [], [], [], []]; // Per chunk
let usedEvents = {};
let triggeredMilestones = [];

// Milestone events - guaranteed to appear at specific progress points
const MILESTONE_EVENTS = [
  { progressRange: [48, 55], characterType: 'backend', eventId: 'be6' },
];

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
  usedDialogues = [[], [], [], [], []];
  initUsedEvents();
  triggeredMilestones = [];
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

  // Reset mystery layer event binding
  resetMysteryLayerBinding();
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
  const dialogue = pickDialogue(state.progress);
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

function checkMilestoneEvent(progress) {
  for (const milestone of MILESTONE_EVENTS) {
    // Skip if already triggered as milestone
    if (triggeredMilestones.includes(milestone.eventId)) continue;
    // Skip if already shown via random events
    if (usedEvents[milestone.characterType]?.includes(milestone.eventId)) continue;

    if (progress >= milestone.progressRange[0] && progress <= milestone.progressRange[1]) {
      triggeredMilestones.push(milestone.eventId);
      return milestone;
    }
  }
  return null;
}

function spawnEmployee(thoughtText) {
  const milestone = checkMilestoneEvent(state.progress);

  let characterType;
  let event;

  if (milestone) {
    // Forced milestone event
    characterType = milestone.characterType;
    event = EMPLOYEE_EVENTS[characterType].find((e) => e.id === milestone.eventId);
    usedEvents[characterType].push(milestone.eventId);
  } else {
    // Random event
    characterType = CHARACTER_TYPES[Math.floor(Math.random() * CHARACTER_TYPES.length)];
    event = pickRandomEvent(characterType);

    if (!event) {
      usedEvents[characterType] = [];
      event = pickRandomEvent(characterType);
    }
  }

  const characterBase = CHARACTERS[characterType];
  const character = {
    ...characterBase,
    image: characterBase.images[Math.floor(Math.random() * characterBase.images.length)],
  };

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

function pickDialogue(progress) {
  const chunkIndex = Math.min(Math.floor(progress / 20), 4);
  const chunk = INTERNAL_DIALOGUES[chunkIndex];
  const used = usedDialogues[chunkIndex];

  // Reset if all dialogues in chunk used
  if (used.length >= chunk.length) {
    usedDialogues[chunkIndex] = [];
  }

  const available = chunk.filter((_, i) => !usedDialogues[chunkIndex].includes(i));
  const pickedIndex = Math.floor(Math.random() * available.length);
  const originalIndex = chunk.indexOf(available[pickedIndex]);

  usedDialogues[chunkIndex].push(originalIndex);
  return available[pickedIndex];
}
