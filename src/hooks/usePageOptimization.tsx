import { useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UsePageOptimizationOptions {
  pageName: string;
  preloadData?: boolean;
  cacheTime?: number;
  staleTime?: number;
  refetchInterval?: number | false;
}

export const usePageOptimization = ({
  pageName,
  preloadData = true,
  cacheTime = 10 * 60 * 1000, // 10 minutes
  staleTime = 5 * 60 * 1000,   // 5 minutes
  refetchInterval = false
}: UsePageOptimizationOptions) => {
  const queryClient = useQueryClient();

  // Prefetch related data on component mount
  const prefetchData = useCallback(() => {
    if (!preloadData) return;

    // Prefetch common data that might be needed
    const prefetchQueries = [
      'products-summary',
      'orders-summary', 
      'sales-summary',
      'customers-summary'
    ].filter(query => query !== `${pageName}-summary`);

    prefetchQueries.forEach(queryKey => {
      queryClient.prefetchQuery({
        queryKey: [queryKey],
        staleTime: staleTime * 2, // Longer stale time for prefetched data
      });
    });
  }, [queryClient, preloadData, pageName, staleTime]);

  // Optimize query defaults for this page
  const queryDefaults = useMemo(() => ({
    cacheTime,
    staleTime,
    refetchInterval,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always' as const,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  }), [cacheTime, staleTime, refetchInterval]);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log(`${pageName} page load time:`, navEntry.loadEventEnd - navEntry.loadEventStart, 'ms');
        }
      });
    });

    observer.observe({ type: 'navigation', buffered: true });

    return () => {
      const endTime = performance.now();
      console.log(`${pageName} component mount time:`, endTime - startTime, 'ms');
      observer.disconnect();
    };
  }, [pageName]);

  // Prefetch on mount
  useEffect(() => {
    const timer = setTimeout(prefetchData, 100); // Small delay to not block initial render
    return () => clearTimeout(timer);
  }, [prefetchData]);

  // Memory cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear less important queries when leaving the page
      const queriesToClear = [
        `${pageName}-details`,
        `${pageName}-filters`,
      ];
      
      queriesToClear.forEach(queryKey => {
        queryClient.removeQueries({ queryKey: [queryKey] });
      });
    };
  }, [queryClient, pageName]);

  return {
    queryDefaults,
    prefetchData,
  };
};