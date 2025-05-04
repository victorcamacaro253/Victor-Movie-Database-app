import { cacheManager } from '../utils/cache';

const BASE_URL = 'https://box-office-scrape-api.onrender.com';

const fetchWithCache = async <T>(endpoint: string, cacheKey: string): Promise<T> => {
  // 1. Check cache first
  const cachedData = cacheManager.get<T>(cacheKey);
  if (cachedData) {
    console.log('Returning cached data for', cacheKey);
    return cachedData;
  }

  try {
    // 2. Fetch fresh data if no valid cache
    console.log('Fetching fresh data for', cacheKey);
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
    }

    const data = await response.json();

    // 3. Update cache
    cacheManager.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    // 4. If network fails but we have expired cache, use it
    const expiredCache = localStorage.getItem(cacheKey);
    if (expiredCache) {
      console.warn('Using expired cache as fallback');
      return JSON.parse(expiredCache).data;
    }
    throw error;
  }
};

// Public API
export const fetchWorldwideBoxOffice = () => 
  fetchWithCache('box-office/worldwide', 'worldwideBoxOffice');

export const fetchDomesticBoxOffice = () => 
  fetchWithCache('box-office/domestic', 'domesticBoxOffice');


export const fetchDailyBoxOffice = () =>
    fetchWithCache('box-office/daily', 'dailyBoxOffice');
  
  export const fetchWeekendBoxOffice = () =>
    fetchWithCache('box-office/weekend', 'weekendBoxOffice');

  
// Optional: Combined fetch for all box office data
export const fetchAllBoxOfficeData = async () => {
    const [worldwide, domestic, daily, weekend] = await Promise.all([
      fetchWorldwideBoxOffice(),
      fetchDomesticBoxOffice(),
      fetchDailyBoxOffice(),
      fetchWeekendBoxOffice()
    ]);
    
    return {
      worldwide,
      domestic,
      daily,
      weekend,
      lastUpdated: new Date()
    };
  };