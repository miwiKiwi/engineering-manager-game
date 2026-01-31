import { RANDOM_EVENTS, EVENT_CATEGORIES } from '../data/randomEvents.js';

// Konfiguracja kategorii eventów
const CATEGORY_CONFIG = {
  chaos: {
    probability: 0.25,    // 25% szansy
    interval: 30000,      // co 30 sekund
    condition: () => true, // zawsze dostępne
  },
  oncall: {
    probability: 0.35,    // 35% szansy
    interval: 20000,      // co 20 sekund
    condition: (state) => state.codeQuality < 40, // tylko przy niskiej jakości kodu
  },
  absurd: {
    probability: 0.08,    // 8% szansy
    interval: 60000,      // co 60 sekund
    condition: () => true,
  },
};

const GLOBAL_COOLDOWN = 10000; // 10 sekund między jakimikolwiek random eventami

class RandomEventManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.lastEventTime = {};
    this.usedEvents = {};
    this.lastGlobalEvent = 0;

    // Inicjalizacja per kategoria
    EVENT_CATEGORIES.forEach((category) => {
      this.lastEventTime[category] = 0;
      this.usedEvents[category] = [];
    });
  }

  checkForEvent(state) {
    const now = Date.now();

    // Sprawdź global cooldown
    if (now - this.lastGlobalEvent < GLOBAL_COOLDOWN) {
      return null;
    }

    // Sprawdź każdą kategorię
    for (const category of EVENT_CATEGORIES) {
      const config = CATEGORY_CONFIG[category];

      // Sprawdź warunek kategorii (np. oncall tylko przy niskim code quality)
      if (!config.condition(state)) {
        continue;
      }

      // Sprawdź interwał kategorii
      if (now - this.lastEventTime[category] < config.interval) {
        continue;
      }

      // Losuj czy event się pojawi
      if (Math.random() < config.probability) {
        const event = this.getRandomEvent(category);
        if (event) {
          this.lastEventTime[category] = now;
          this.lastGlobalEvent = now;
          return event;
        }
      }
    }

    return null;
  }

  getRandomEvent(category) {
    const events = RANDOM_EVENTS[category];
    const used = this.usedEvents[category];

    // Reset jeśli wszystkie eventy zostały użyte
    if (used.length >= events.length) {
      this.usedEvents[category] = [];
    }

    // Znajdź nieużyte eventy
    const available = events.filter((e) => !this.usedEvents[category].includes(e.id));

    if (available.length === 0) {
      return null;
    }

    // Losuj event
    const event = available[Math.floor(Math.random() * available.length)];
    this.usedEvents[category].push(event.id);

    return event;
  }
}

// Singleton instance
export const randomEventManager = new RandomEventManager();
