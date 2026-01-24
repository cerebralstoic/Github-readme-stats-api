const store = new Map();

const DEFAULT_TTL = 1000 * 60 * 10;

export function getCache(key) {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiry) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

export function setCache(key, value, ttl = DEFAULT_TTL) {
  store.set(key, {
    value,
    expiry: Date.now() + ttl,
  });
}

export function clearCache() {
  store.clear();
}
