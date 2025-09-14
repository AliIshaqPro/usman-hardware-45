import React, { Suspense, memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyPageWrapperProps {
  children: React.ReactNode;
  pageName: string;
  fallback?: React.ReactNode;
}

const DefaultFallback = memo(({ pageName }: { pageName: string }) => (
  <div className="flex-1 p-6 space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-32" />
    </div>
    
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 border rounded-lg space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24" />
      ))}
    </div>

    {/* Table skeleton */}
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <Skeleton className="h-4 w-64" />
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-4 border-b flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
          <div className="ml-auto">
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>

    <div className="text-center text-muted-foreground">
      <p className="text-sm">Loading {pageName}...</p>
    </div>
  </div>
));

const ErrorFallback = memo(({ error, resetErrorBoundary, pageName }: { 
  error: Error; 
  resetErrorBoundary: () => void;
  pageName: string;
}) => (
  <div className="flex-1 flex items-center justify-center min-h-[400px]">
    <div className="text-center space-y-4 max-w-md">
      <h2 className="text-xl font-semibold text-destructive">
        Failed to load {pageName}
      </h2>
      <p className="text-sm text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
));

export const LazyPageWrapper: React.FC<LazyPageWrapperProps> = memo(({ 
  children, 
  pageName,
  fallback 
}) => {
  return (
    <ErrorBoundary 
      FallbackComponent={(props) => (
        <ErrorFallback {...props} pageName={pageName} />
      )}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={fallback || <DefaultFallback pageName={pageName} />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
});

LazyPageWrapper.displayName = 'LazyPageWrapper';