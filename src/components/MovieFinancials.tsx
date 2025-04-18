// src/components/MovieFinancials.tsx
interface MovieFinancialsProps {
    budget: number;
    revenue: number;
  }
  
  export function MovieFinancials({ budget, revenue }: MovieFinancialsProps) {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(amount);
    };
  
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Box Office</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Budget:</span>
            <span>{budget ? formatCurrency(budget) : 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span>Revenue:</span>
            <span>{revenue ? formatCurrency(revenue) : 'Unknown'}</span>
          </div>
          {budget && revenue && (
            <div className="flex justify-between">
              <span>Profit:</span>
              <span className={revenue > budget ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(revenue - budget)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }