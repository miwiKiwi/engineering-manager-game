import { clamp } from './utils.js';

export const DEPLOY_ANIMATION_DURATION = 3000;
export const RELEASE_TOTAL_DURATION = 5500;

const MILESTONES = [33, 66, 100];
const RELEASES_TO_WIN = 3;

export function checkAndApplyRelease(state) {
  const nextMilestone = MILESTONES[state.releaseNumber];

  if (nextMilestone && state.progress >= nextMilestone) {
    state.releaseNumber++;

    if (state.releaseNumber >= RELEASES_TO_WIN) {
      state.victory = true;
    } else {
      state.codeQuality = clamp(state.codeQuality - 15, 0, 100);
      state.sanity = clamp(state.sanity + 25, 0, 100);
    }

    return true;
  }
  return false;
}
