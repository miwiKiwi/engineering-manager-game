// Game balance constants - all magic numbers in one place

export const INITIAL_STATS = {
  sanity: 100,
  morale: 100,
  codeQuality: 65,
  progress: 0,
  releaseNumber: 0,
};

export const THRESHOLDS = {
  MORALE_FOR_PROGRESS: 30,      // progress stops below this
  LOW_STAT_WARNING: 30,         // stat bar pulses below this
  ONCALL_CODE_QUALITY: 50,      // oncall events trigger below this
  FRAGMENT2_PROGRESS_MIN: 71.5, // mystery layer: clickable range start
  FRAGMENT2_PROGRESS_MAX: 74.5, // mystery layer: clickable range end
};

export const RELEASE_CONFIG = {
  MILESTONES: [33, 66, 100],
  RELEASES_TO_WIN: 3,
  SANITY_BOOST: 30,
  CODE_QUALITY_PENALTY: 20,
};

export const TIMINGS = {
  PROGRESS_INTERVAL: 1500,
  DIALOGUE_DURATION: 4000,
  PAUSE_BETWEEN_TURNS: 500,
  CHARACTER_ANIM_DURATION: 500,
  DEPLOY_ANIMATION_DURATION: 3000,
  RELEASE_TOTAL_DURATION: 5500,
};

export const RANDOM_EVENT_CONFIG = {
  GLOBAL_COOLDOWN: 10000,
  CATEGORIES: {
    chaos: {
      probability: 0.25,
      interval: 30000,
    },
    oncall: {
      probabilityMin: 0.15,
      probabilityMax: 0.50,
      interval: 20000,
    },
    absurd: {
      probability: 0.15,
      interval: 40000,
    },
  },
};
