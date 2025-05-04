export interface Article {
    source: { name: string };
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
  }
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  
 // Enhanced fetch function with proper headers
async function fetchNews(params: string): Promise<Article[]> {
    const url = `https://newsapi.org/v2/${params}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'News fetch failed');
    }
  
    const data = await response.json();
    return data.articles || [];
  }
  
  // Dedicated endpoints
  export const newsAPI = {


    // Film Industry (Studios, Production, Box Office)
    fetchFilmNews: (limit = 8) => fetchNews(
      `everything?q=("film industry" OR "movie production" OR "box office")&domains=variety.com,hollywoodreporter.com,deadline.com,thewrap.com&sortBy=publishedAt&pageSize=${limit}`
    ),
  
    // TV Industry (Streaming, Ratings, Renewals)
    fetchTVNews: (limit = 8) => fetchNews(
      `everything?q=("tv industry" OR "streaming" OR "ratings")&domains=deadline.com,thewrap.com,tvline.com&sortBy=publishedAt&pageSize=${limit}`
    ),
  
    // General Entertainment (Celebrities, Events)
    fetchEntertainmentNews: (limit = 8) => fetchNews(
      `everything?q=entertainment&domains=ew.com,people.com,eonline.com&sortBy=publishedAt&pageSize=${limit}`
    ),

      // Celebrity News (Enhanced Version)
  fetchCelebrityNews: (
    limit = 8,
    options: {
      category?: 'gossip' | 'awards' | 'relationships' | 'all';
      timeFrame?: '24h' | 'week' | 'month';
      excludeTabloids?: boolean;
      celebrityNames?: string[];
    } = {}
  ) => {
    const {
      category = 'all',
      timeFrame = 'week',
      excludeTabloids = true,
      celebrityNames = []
    } = options;

    // Base query
    let query = '(celebrity OR celebrities OR "red carpet" OR Hollywood)';

    // Add celebrity names if specified
    if (celebrityNames.length > 0) {
      query += ` AND (${celebrityNames.join(' OR ')})`;
    }

    // Category filters
    switch (category) {
      case 'gossip':
        query += ' AND (gossip OR rumor OR scandal OR feud)';
        break;
      case 'awards':
        query += ' AND (Oscars OR Emmys OR Golden Globes OR "award show")';
        break;
      case 'relationships':
        query += ' AND (dating OR married OR breakup OR divorce)';
        break;
    }

    // Time frame calculation
    const fromDate = new Date();
    if (timeFrame === '24h') fromDate.setDate(fromDate.getDate() - 1);
    if (timeFrame === 'week') fromDate.setDate(fromDate.getDate() - 7);
    if (timeFrame === 'month') fromDate.setMonth(fromDate.getMonth() - 1);

    // Source management
    const trustedSources = [
      'people.com',
      'ew.com',
      'eonline.com',
      'vanityfair.com',
      'hollywoodreporter.com',
      'variety.com'
    ];

    const tabloids = [
      'tmz.com',
      'dailymail.co.uk',
      'pagesix.com',
      'usmagazine.com'
    ];

    const domains = excludeTabloids
      ? trustedSources.join(',')
      : [...trustedSources, ...tabloids].join(',');

    return fetchNews(
      `everything?` +
      `q=${encodeURIComponent(query)}` +
      `&domains=${domains}` +
      `&from=${fromDate.toISOString()}` +
      `&sortBy=publishedAt` +
      `&pageSize=${limit}` +
      `&language=en`
    );
  },

  };