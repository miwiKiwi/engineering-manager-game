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
}

function renderStatsBar(state) {
  return `
    <div class="stats-bar">
      ${renderStat('Sanity', state.sanity, 'stat-sanity')}
      ${renderStat('Morale', state.morale, 'stat-morale')}
      ${renderStat('Code Quality', state.codeQuality, 'stat-code')}
      ${renderStat(`Progress (Release ${state.releaseNumber}/3)`, state.progress, 'stat-progress')}
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
