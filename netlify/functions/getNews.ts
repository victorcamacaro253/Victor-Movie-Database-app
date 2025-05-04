// netlify/functions/getNews.ts
import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  // 1. Get parameters from frontend
  const { type = 'film', limit = '4' } = event.queryStringParameters || {};
  
  // 2. Configure API request based on type
  let query: string;
  let domains: string;
  
  switch(type) {
    case 'film':
      query = '"film industry" OR "movie production" OR "box office"';
      domains = 'variety.com,hollywoodreporter.com,deadline.com,thewrap.com';
      break;
    case 'tv':
      query = '"tv industry" OR streaming OR ratings';
      domains = 'deadline.com,thewrap.com,tvline.com';
      break;
    case 'celebrity':
      query = 'celebrity OR celebrities OR "red carpet"';
      domains = 'people.com,ew.com,eonline.com';
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid news type' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      };
  }

  // 3. Build NewsAPI URL
  const newsApiUrl = new URL('https://newsapi.org/v2/everything');
  newsApiUrl.searchParams.set('q', query);
  newsApiUrl.searchParams.set('domains', domains);
  newsApiUrl.searchParams.set('pageSize', limit);
  newsApiUrl.searchParams.set('sortBy', 'publishedAt');
  newsApiUrl.searchParams.set('language', 'en');

  try {
    // 4. Make server-to-server request
    const response = await fetch(newsApiUrl.toString(), {
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY || ''
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `NewsAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 5. Return clean response
    return {
      statusCode: 200,
      body: JSON.stringify(data.articles || []),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
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
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }
};

export { handler };