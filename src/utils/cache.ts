const CACHE_EXPIRY_HOURS = 6; // Data refreshes every 6 hours

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const cacheManager = {
  get: <T>(key: string): T | null => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry = JSON.parse(cached) as CacheEntry<T>;
    const cacheAgeHours = (Date.now() - entry.timestamp) / (1000 * 60 * 60);
    
    return cacheAgeHours < CACHE_EXPIRY_HOURS ? entry.data : null;
  },

  set: <T>(key: string, data: T): void => {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(entry));
  }
};