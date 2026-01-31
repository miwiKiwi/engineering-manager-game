import { clamp } from './utils.js';
import { RELEASE_CONFIG, TIMINGS } from './constants.js';

export const DEPLOY_ANIMATION_DURATION = TIMINGS.DEPLOY_ANIMATION_DURATION;
export const RELEASE_TOTAL_DURATION = TIMINGS.RELEASE_TOTAL_DURATION;

export function checkAndApplyRelease(state) {
  const nextMilestone = RELEASE_CONFIG.MILESTONES[state.releaseNumber];

  if (nextMilestone && state.progress >= nextMilestone) {
    state.releaseNumber++;

    if (state.releaseNumber >= RELEASE_CONFIG.RELEASES_TO_WIN) {
      state.victory = true;
    } else {
      state.codeQuality = clamp(state.codeQuality - RELEASE_CONFIG.CODE_QUALITY_PENALTY, 0, 100);
      state.sanity = clamp(state.sanity + RELEASE_CONFIG.SANITY_BOOST, 0, 100);
    }

    return true;
  }
  return false;
}
