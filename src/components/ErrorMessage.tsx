// src/components/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  // Changed from default export to named export
  export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <div className="flex justify-between">
          <p className="font-bold">Error</p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="text-red-700 hover:text-red-900 font-bold"
            >
              Retry
            </button>
          )}
        </div>
        <p>{message}</p>
      </div>
    );
  }