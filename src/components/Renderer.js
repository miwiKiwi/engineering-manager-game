import { startGame } from '../game/GameLoop.js';

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

  setTimeout(() => {
    const status = document.querySelector('.deploy-status');
    const title = document.querySelector('.release-notification h2');
    if (status) status.textContent = 'Deploy successful!';
    if (title) title.textContent = `RELEASE #${state.releaseNumber} LIVE!`;
    const notification = document.querySelector('.release-notification');
    if (notification) notification.classList.add('deploy-success');
  }, 3000);

  setTimeout(() => {
    onDismiss();
  }, 5500);
}

export function renderGameOver(state) {
  app.innerHTML = `
    <div class="end-screen game-over-screen">
      <h1 class="game-over-title">GAME OVER</h1>
      <p class="game-over-reason">${state.gameOverReason}</p>
      <div class="end-stats">
        <p>Release: ${state.releaseNumber}/4</p>
        <p>Progress: ${state.progress}%</p>
      </div>
      <button class="restart-btn" id="restart-btn">Restart</button>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', startGame);
}

export function renderVictory(state) {
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
  document.getElementById('restart-btn').addEventListener('click', startGame);
}

function renderStatsBar(state) {
  return `
    <div class="stats-bar">
      ${renderStat('Sanity', state.sanity, 'stat-sanity')}
      ${renderStat('Morale', state.morale, 'stat-morale')}
      ${renderStat('Code Quality', state.codeQuality, 'stat-code')}
      ${renderStat(`Progress (Release ${state.releaseNumber}/4)`, state.progress, 'stat-progress')}
    </div>
  `;
}

function renderStat(label, value, className) {
  const lowClass = value <= 30 ? 'stat-low' : '';
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
  if (scene && scene.type === 'employee' && !scene.animating && scene.onChoice) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        scene.onChoice(index);
      });
    });
  }
}
