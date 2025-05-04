//src/netlify/functions/getNews.ts
import { Handler } from '@netlify/functions';

interface NewsRequest {
  type: 'film' | 'tv' | 'entertainment' | 'celebrity';
  limit?: number;
  category?: 'gossip' | 'awards' | 'relationships' | 'all';
  timeFrame?: '24h' | 'week' | 'month';
  excludeTabloids?: boolean;
  celebrityNames?: string[];
}

const API_KEY = process.env.NEWS_API_KEY;

async function fetchNews(params: string): Promise<any> {
  const url = `https://newsapi.org/v2/${params}`;
  
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY || '',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'News fetch failed');
  }

  return response.json();
}

const handler: Handler = async (event): Promise<any> => {  try {
    // Parse query parameters
    const params: NewsRequest = {
      type: event.queryStringParameters?.type as any || 'film',
      limit: parseInt(event.queryStringParameters?.limit || '8'),
      category: event.queryStringParameters?.category as any,
      timeFrame: event.queryStringParameters?.timeFrame as any,
      excludeTabloids: event.queryStringParameters?.excludeTabloids !== 'false',
      celebrityNames: event.queryStringParameters?.celebrityNames?.split(',') || []
    };

    let query: string;
    let domains: string;
    let fromDate: string | undefined;

    // Configure based on type
    switch(params.type) {
      case 'film':
        query = '"film industry" OR "movie production" OR "box office"';
        domains = 'variety.com,hollywoodreporter.com,deadline.com,thewrap.com';
        break;
      
      case 'tv':
        query = '"tv industry" OR streaming OR ratings';
        domains = 'deadline.com,thewrap.com,tvline.com';
        break;
      
      case 'entertainment':
        query = 'entertainment';
        domains = 'ew.com,people.com,eonline.com';
        break;
      
      case 'celebrity':
        query = '(celebrity OR celebrities OR "red carpet" OR Hollywood)';
        
        // Add celebrity names if specified
        if ((params.celebrityNames ?? []).length > 0) {
          if (params.celebrityNames && params.celebrityNames.length > 0) {
            query += ` AND (${params.celebrityNames.join(' OR ')})`;
          }
        }

        // Category filters
        switch(params.category) {
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
        const date = new Date();
        if (params.timeFrame === '24h') date.setDate(date.getDate() - 1);
        if (params.timeFrame === 'week') date.setDate(date.getDate() - 7);
        if (params.timeFrame === 'month') date.setMonth(date.getMonth() - 1);
        fromDate = date.toISOString();

        // Source management
        const trustedSources = [
          'people.com', 'ew.com', 'eonline.com', 
          'vanityfair.com', 'hollywoodreporter.com', 'variety.com'
        ];
        const tabloids = [
          'tmz.com', 'dailymail.co.uk', 'pagesix.com', 'usmagazine.com'
        ];
        domains = params.excludeTabloids
          ? trustedSources.join(',')
          : [...trustedSources, ...tabloids].join(',');
        break;
      
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid news type' }),
          headers: { 'Content-Type': 'application/json' }
        };
    }

    // Build API URL
    const apiUrl = new URL('https://newsapi.org/v2/everything');
    apiUrl.searchParams.set('q', query);
    apiUrl.searchParams.set('domains', domains);
    apiUrl.searchParams.set('pageSize', (params.limit ?? 8).toString());
    apiUrl.searchParams.set('sortBy', 'publishedAt');
    apiUrl.searchParams.set('language', 'en');
    if (fromDate) apiUrl.searchParams.set('from', fromDate);

    // Fetch from NewsAPI
    const data = await fetchNews(apiUrl.toString().replace('https://newsapi.org/v2/', ''));

    return {
      statusCode: 200,
      body: JSON.stringify(data.articles || []),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       
      }
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch news',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};

export { handler };