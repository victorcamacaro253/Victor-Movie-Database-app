export interface Article {
    source: { name: string };
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
  }
  
  const API_KEY = 'a3d4b8d40df94f6d8ece0fed37766488';
  
  // Base fetch function
  async function fetchNews(params: string): Promise<Article[]> {
    const response = await fetch(`https://newsapi.org/v2/${params}&apiKey=${API_KEY}`);
    if (!response.ok) throw new Error('News fetch failed');
    return (await response.json()).articles;
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
    )
  };