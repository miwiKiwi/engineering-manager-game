import { DEPLOY_ANIMATION_DURATION, RELEASE_TOTAL_DURATION } from '../game/Release.js';
import * as Timer from '../game/Timer.js';
import { THRESHOLDS } from '../game/constants.js';

const app = document.getElementById('app');

export function render(state, scene = null) {
  app.innerHTML = `
    ${renderStatsBar(state)}
    ${renderGameScene(scene)}
  `;
  bindSceneEvents(scene);
  mysteryLayerBound = false; // Reset - DOM was replaced
  bindMysteryLayerEvents(state);
}

export function renderRelease(state, onDismiss) {
  app.innerHTML = `
    ${renderStatsBar(state)}
    <div class="game-scene">
      <div class="scene-background">
        <div class="release-notification">
          <div class="release-rocket">&#x1F680;</div>
          <h2>DEPLOYING RELEASE #${state.releaseNumber}...</h2>
          <div class="deploy-progress-bg">
            <div class="deploy-progress-fill"></div>
          </div>
          <p class="deploy-status">Pushing to production...</p>
        </div>
      </div>
    </div>
  `;

  Timer.delay(() => {
    const status = document.querySelector('.deploy-status');
    const title = document.querySelector('.release-notification h2');
    if (status) status.textContent = 'Deploy successful!';
    if (title) title.textContent = `RELEASE #${state.releaseNumber} LIVE!`;
    const notification = document.querySelector('.release-notification');
    if (notification) notification.classList.add('deploy-success');
  }, DEPLOY_ANIMATION_DURATION);

  Timer.delay(() => {
    onDismiss();
  }, RELEASE_TOTAL_DURATION);
}

export function renderTitleScreen(onStart) {
  app.innerHTML = `
    <div class="title-screen">
      <div class="title-background"></div>
      <div class="title-content">
        <h1 class="game-title">The Manager's Paradox</h1>
        <p class="game-subtitle">Dowieź projekt do produkcji. Nie zwariuj.</p>
        <button class="start-btn" id="start-btn">Start</button>
      </div>
    </div>
  `;
  document.getElementById('start-btn').addEventListener('click', onStart);
}

export function renderIntroScreen(onContinue) {
  app.innerHTML = `
    <div class="intro-screen">
      <div class="intro-content">
        <h2>Twoja misja</h2>
        <p>Jesteś Engineering Managerem w firmie technologicznej. Twój zespół pracuje nad nowym serwisem, który musi trafić na produkcję.</p>
        <p>Pracownicy będą przychodzić z problemami. Każda decyzja wpływa na:</p>
        <ul>
          <li><strong>Sanity</strong> — Twoje zdrowie psychiczne</li>
          <li><strong>Morale</strong> — zadowolenie zespołu</li>
          <li><strong>Code Quality</strong> — jakość kodu</li>
        </ul>
        <p>Jeśli <strong>Morale spadnie poniżej 30%</strong>, zespół przestaje pracować.</p>
        <p>Dowieź <strong>3 release'y</strong> zanim stracisz rozum lub cały zespół odejdzie.</p>
        <button class="start-btn" id="continue-btn">Zaczynamy!</button>
      </div>
    </div>
  `;
  document.getElementById('continue-btn').addEventListener('click', onContinue);
}

export function renderGameOver(state, onRestart) {
  app.innerHTML = `
    <div class="end-screen game-over-screen">
      <h1 class="game-over-title">GAME OVER</h1>
      <p class="game-over-reason">${state.gameOverReason}</p>
      <div class="end-stats">
        <p>Release: ${state.releaseNumber}/3</p>
        <p>Progress: ${state.progress}%</p>
      </div>
      <button class="restart-btn" id="restart-btn">Restart</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', onRestart);
}

export function renderVictory(state, onRestart) {
  app.innerHTML = `
    <div class="end-screen victory-screen">
      <h1 class="victory-title">GRATULACJE!</h1>
      <p class="victory-message">Dowieźliście serwis do produkcji!</p>
      <div class="end-stats">
        <p>Sanity: ${state.sanity}%</p>
        <p>Morale: ${state.morale}%</p>
        <p>Code Quality: ${state.codeQuality}%</p>
      </div>
      <button class="restart-btn" id="restart-btn">Zagraj ponownie</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', onRestart);

  // Mystery layer: glitch + hidden symbol for Path C players
  if (state.fragments && state.fragments.fragment1 && state.fragments.fragment2) {
    Timer.delay(() => {
      const victoryScreen = document.querySelector('.victory-screen');
      if (victoryScreen) {
        victoryScreen.classList.add('glitching');
        startTextScramble(victoryScreen);

        Timer.delay(() => {
          victoryScreen.classList.remove('glitching');
          stopTextScramble(victoryScreen);
          showHiddenSymbol(state);
        }, 1400); // glitch duration - 7 flips at 200ms
      }
    }, 1500); // delay before glitch
  }
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let scrambleInterval = null;
let originalTexts = new Map();
let scrambledTexts = new Map();
let showGlitched = false;

function startTextScramble(container) {
  const textElements = container.querySelectorAll('h1, p, button');

  // Store original texts and generate ONE scrambled version
  textElements.forEach((el) => {
    originalTexts.set(el, el.textContent);
    scrambledTexts.set(el, scrambleText(el.textContent, 0.5));
  });

  // Flip between normal and glitched state
  scrambleInterval = setInterval(() => {
    showGlitched = !showGlitched;
    textElements.forEach((el) => {
      el.textContent = showGlitched ? scrambledTexts.get(el) : originalTexts.get(el);
    });
  }, 200);
}

function stopTextScramble(container) {
  if (scrambleInterval) {
    clearInterval(scrambleInterval);
    scrambleInterval = null;
  }

  // Restore original texts
  originalTexts.forEach((text, el) => {
    el.textContent = text;
  });
  originalTexts.clear();
  scrambledTexts.clear();
  showGlitched = false;
}

function scrambleText(text, intensity) {
  return text.split('').map((char) => {
    if (char === ' ') return ' ';
    if (Math.random() < intensity) {
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    }
    return char;
  }).join('');
}

function showHiddenSymbol(state) {
  const symbol = document.createElement('div');
  symbol.className = 'hidden-symbol pulsing';
  symbol.textContent = '\u2318'; // ⌘ symbol
  symbol.title = '';

  symbol.addEventListener('click', () => {
    showPassphrasePrompt(state);
  });

  document.body.appendChild(symbol);
}

function showPassphrasePrompt(state) {
  const motto = prompt('Enter the motto:');
  if (!motto) return;

  const normalized = motto.toLowerCase().replace(/[^a-z]/g, '');

  // Accept variations: "it's a feature", "it's not a bug, it's a feature", etc.
  if (normalized.endsWith('itsafeature')) {
    state.fragments.fragment3 = true;
    showFinalReveal();
  } else {
    console.log('That\'s not the motto. Keep looking.');
  }
}

function showFinalReveal() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.5s ease-out;
  `;

  overlay.innerHTML = `
    <div style="
      max-width: 500px;
      padding: 40px;
      text-align: center;
      font-family: 'Courier New', monospace;
      color: #00adb5;
    ">
      <h2 style="font-size: 24px; margin-bottom: 20px; color: #45e0e8;">
        ADAPTATION
      </h2>
      <br>
      <p style="font-size: 14px; line-height: 1.8; color: #ccc; margin-bottom: 20px;">
        1. PATTERNS exist in chaos<br>
        2. FOCUS reveals those patterns<br>
        3. ADAPTATION - while fixing, we shape.<br><br>
        We can't build utopia, but we can leave things<br>
        a little better than we found them.
      </p>
      <p style="font-size: 13px; color: #888; margin-bottom: 30px;">
        Reality needs maintenance.<br>
        Not everyone notices. But anyone could.
      </p>
      <p style="font-size: 18px; color: #00adb5; margin-bottom: 30px;">
        Congratulations
      </p>
      <a href="https://maintainers-collective.org/welcome" target="_blank"
         style="color: #45e0e8; text-decoration: underline; font-size: 12px;">
        → Welcome
      </a>
      <br><br>
      <button id="close-reveal" style="
        margin-top: 20px;
        padding: 10px 30px;
        background: transparent;
        border: 1px solid #00adb5;
        color: #00adb5;
        font-family: 'Courier New', monospace;
        cursor: pointer;
      ">Close</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('close-reveal').addEventListener('click', () => {
    overlay.remove();
  });
}

function renderStatsBar(state) {
  const progressInRange = state.progress >= THRESHOLDS.FRAGMENT2_PROGRESS_MIN && state.progress <= THRESHOLDS.FRAGMENT2_PROGRESS_MAX && !state.fragments.fragment2;
  const progressClass = progressInRange ? 'stat-progress mystery-active' : 'stat-progress';

  return `
    <div class="stats-bar">
      ${renderStat('Sanity', state.sanity, 'stat-sanity')}
      ${renderStat('Morale', state.morale, 'stat-morale')}
      ${renderStat('Code Quality', state.codeQuality, 'stat-code')}
      ${renderProgressStat(`Progress (Release ${state.releaseNumber}/3)`, state.progress, progressClass, state.fragments.fragment2)}
    </div>
  `;
}

function renderStat(label, value, className) {
  const lowClass = value <= THRESHOLDS.LOW_STAT_WARNING ? 'stat-low' : '';
  return `
    <div class="stat ${className} ${lowClass}">
      <span class="stat-label">${label}</span>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill" style="width: ${value}%"></div>
        <span class="stat-value">${value}%</span>
      </div>
    </div>
  `;
}

function renderProgressStat(label, value, className, fragmentFound) {
  const lowClass = value <= THRESHOLDS.LOW_STAT_WARNING ? 'stat-low' : '';
  const mysteryHint = !fragmentFound ? '<span class="mystery-hint">?</span>' : '';
  return `
    <div class="stat ${className} ${lowClass}">
      <span class="stat-label">${label}</span>
      <div class="stat-bar-bg">
        <div class="stat-bar-fill" style="width: ${value}%"></div>
        <span class="stat-value">${value}%</span>
        ${mysteryHint}
      </div>
    </div>
  `;
}

function renderGameScene(scene) {
  if (!scene) {
    return `
      <div class="game-scene">
        <div class="scene-background">
        </div>
      </div>
    `;
  }

  if (scene.type === 'dialogue') {
    return `
      <div class="game-scene">
        <div class="scene-background">
          <div class="dialog-box thought-bubble">
            <p class="dialog-text internal-thought">${scene.text}</p>
          </div>
        </div>
      </div>
    `;
  }

  if (scene.type === 'randomEvent') {
    const optionsHtml = scene.onChoice ? `
      <div class="dialog-options">
        ${scene.event.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">${opt.text}</button>
        `).join('')}
      </div>
    ` : '';

    return `
      <div class="game-scene">
        <div class="scene-background">
          <div class="dialog-box random-event random-event-${scene.event.category}">
            <p class="dialog-text">
              <span class="event-title">${scene.event.title}</span>
              ${scene.event.text}
            </p>
            ${optionsHtml}
          </div>
        </div>
      </div>
    `;
  }

  if (scene.type === 'employee') {
    const animClass = scene.animating === 'enter' ? `character-enter-${scene.enterDirection || 'left'}` :
                      scene.animating === 'exit' ? 'character-exit' : 'character-idle';

    const optionsHtml = (!scene.animating && scene.onChoice) ? `
      <div class="dialog-options">
        ${scene.event.options.map((opt, i) => `
          <button class="option-btn" data-index="${i}">${opt.text}</button>
        `).join('')}
      </div>
    ` : '';

    const showSpeechBubble = scene.animating !== 'enter' && scene.animating !== 'exit';
    const showThought = scene.animating === 'enter' && scene.thoughtText;

    return `
      <div class="game-scene">
        <div class="scene-background">
          ${showThought ? `
            <div class="dialog-box thought-bubble">
              <p class="dialog-text internal-thought">${scene.thoughtText}</p>
            </div>
          ` : ''}
          <div class="character ${animClass}">
            <img class="character-img" src="${scene.character.image}" alt="${scene.character.name}">
          </div>
          ${showSpeechBubble ? `
            <div class="dialog-box">
              <p class="dialog-text">
                <span class="character-name" style="color: ${scene.character.color}">${scene.character.name}:</span>
                ${scene.event.text}
              </p>
              ${optionsHtml}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  return '';
}

function bindSceneEvents(scene) {
  if (!scene || !scene.onChoice) return;

  // Handle both employee (not animating) and randomEvent scenes
  const isEmployeeReady = scene.type === 'employee' && !scene.animating;
  const isRandomEvent = scene.type === 'randomEvent';

  if (isEmployeeReady || isRandomEvent) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        scene.onChoice(index);
      });
    });
  }
}

// Mystery layer: 73.12% progress bar click
let mysteryLayerBound = false;

function bindMysteryLayerEvents(state) {
  if (!state || !state.fragments) return;
  if (state.fragments.fragment2) return; // Already found
  if (mysteryLayerBound) return; // Already bound

  const progressBar = document.querySelector('.stat-progress');
  if (!progressBar) return;

  mysteryLayerBound = true;
  progressBar.style.cursor = 'pointer';
  progressBar.addEventListener('click', () => {
    // Check if progress is around 73.12%
    if (state.progress >= THRESHOLDS.FRAGMENT2_PROGRESS_MIN && state.progress <= THRESHOLDS.FRAGMENT2_PROGRESS_MAX && !state.fragments.fragment2) {
      state.fragments.fragment2 = true;
      state.sanity = Math.min(state.sanity + 10, 100);
      showFragment2Message();
    }
  });
}

export function resetMysteryLayerBinding() {
  mysteryLayerBound = false;
}

function showFragment2Message() {
  const overlay = document.createElement('div');
  overlay.className = 'fragment-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  `;

  overlay.innerHTML = `
    <div style="
      max-width: 500px;
      padding: 40px;
      text-align: center;
      font-family: 'Courier New', monospace;
      color: #00adb5;
      border: 1px solid #00adb5;
      background: rgba(0, 20, 30, 0.9);
    ">
      <h2 style="font-size: 20px; margin-bottom: 20px; color: #45e0e8;">
        FOCUS
      </h2>
      <p style="font-size: 12px; color: #888; margin-bottom: 20px;">
        You clicked at exactly right moment.<br>
      </p>
      <p style="font-size: 11px; color: #555;">
        Truth is in the code nobody reads.<br>
        Engineers know to look at the source.
      </p>
      <button id="close-fragment2" style="
        margin-top: 20px;
        padding: 10px 30px;
        background: transparent;
        border: 1px solid #00adb5;
        color: #00adb5;
        font-family: 'Courier New', monospace;
        cursor: pointer;
      ">Continue</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('close-fragment2').addEventListener('click', () => {
    overlay.remove();
  });
}
