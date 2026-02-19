const cache = new Map();

export const getCachedData = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  // 5 minute expiration (300,000ms)
  if (Date.now() - entry.timestamp > 300000) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

export const setCachedData = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};
