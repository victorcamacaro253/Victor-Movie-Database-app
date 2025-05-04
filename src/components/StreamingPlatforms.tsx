// components/StreamingPlatforms.tsx
import { Link } from 'react-router-dom';

interface StreamingPlatformsProps {
  providers: any;
  themeClasses: any;
}

export default function StreamingPlatforms({ providers, themeClasses }: StreamingPlatformsProps) {
  if (!providers) return null;

  // Get providers for the user's country or default to US
  const countryProviders = providers.results?.US || providers.results?.[Object.keys(providers.results)[0]];

  if (!countryProviders) return null;

  return (
    <div className="mt-4">
      {countryProviders.flatrate && (
        <div className="mb-4">
          <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Streaming</h3>
          <div className="flex flex-wrap gap-3">
            {countryProviders.flatrate.map((provider: any) => (
              <Link
                to={countryProviders.link}
                target="_blank"
                rel="noopener noreferrer"
                key={provider.provider_id}
                className="flex flex-col items-center"
                title={`Watch on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 object-contain rounded-md bg-gray-100 dark:bg-gray-700 p-1"
                  loading="lazy"
                />
                <span className={`text-xs mt-1 ${themeClasses.secondaryText}`}>
                  {provider.provider_name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {countryProviders.rent && (
        <div className="mb-4">
          <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Rent</h3>
          <div className="flex flex-wrap gap-3">
            {countryProviders.rent.map((provider: any) => (
              <Link
                to={countryProviders.link}
                target="_blank"
                rel="noopener noreferrer"
                key={provider.provider_id}
                className="flex flex-col items-center"
                title={`Rent on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 object-contain rounded-md bg-gray-100 dark:bg-gray-700 p-1"
                  loading="lazy"
                />
                <span className={`text-xs mt-1 ${themeClasses.secondaryText}`}>
                  {provider.provider_name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {countryProviders.buy && (
        <div>
          <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text}`}>Buy</h3>
          <div className="flex flex-wrap gap-3">
            {countryProviders.buy.map((provider: any) => (
              <Link
                to={countryProviders.link}
                target="_blank"
                rel="noopener noreferrer"
                key={provider.provider_id}
                className="flex flex-col items-center"
                title={`Buy on ${provider.provider_name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="w-12 h-12 object-contain rounded-md bg-gray-100 dark:bg-gray-700 p-1"
                  loading="lazy"
                />
                <span className={`text-xs mt-1 ${themeClasses.secondaryText}`}>
                  {provider.provider_name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}