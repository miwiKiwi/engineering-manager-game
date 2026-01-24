let nextId = 1;
const timers = new Map();

export function delay(callback, ms) {
  const id = nextId++;
  const handle = setTimeout(() => {
    timers.delete(id);
    callback();
  }, ms);
  timers.set(id, { handle, type: 'timeout' });
  return id;
}

export function repeat(callback, ms) {
  const id = nextId++;
  const handle = setInterval(callback, ms);
  timers.set(id, { handle, type: 'interval' });
  return id;
}

export function cancel(id) {
  const entry = timers.get(id);
  if (!entry) return;
  if (entry.type === 'timeout') {
    clearTimeout(entry.handle);
  } else {
    clearInterval(entry.handle);
  }
  timers.delete(id);
}

export function clearAll() {
  for (const [id, entry] of timers) {
    if (entry.type === 'timeout') {
      clearTimeout(entry.handle);
    } else {
      clearInterval(entry.handle);
    }
  }
  timers.clear();
}
