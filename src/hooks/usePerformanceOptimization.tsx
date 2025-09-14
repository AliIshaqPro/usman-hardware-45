import { useCallback, useMemo, useRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderStart = useRef<number>();
  
  useEffect(() => {
    renderStart.current = performance.now();
  });
  
  useEffect(() => {
    if (renderStart.current) {
      const renderTime = performance.now() - renderStart.current;
      if (renderTime > 16) { // More than 1 frame (60fps)
        console.warn(`${componentName} slow render: ${renderTime.toFixed(2)}ms`);
      }
    }
  });
};

// Optimized search hook with debouncing
export const useOptimizedSearch = (initialValue = '', delay = 300) => {
  const [debouncedValue] = useDebounce(initialValue, delay);
  
  const clearSearch = useCallback(() => {
    // Implementation would depend on state management
  }, []);
  
  return {
    debouncedValue,
    clearSearch
  };
};

// Memoized filter hook for large datasets
export const useOptimizedFilter = <T,>(
  data: T[],
  filters: Record<string, any>,
  filterFunctions: Record<string, (item: T, value: any) => boolean>
) => {
  return useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        const filterFn = filterFunctions[key];
        return filterFn ? filterFn(item, value) : true;
      });
    });
  }, [data, filters, filterFunctions]);
};

// Pagination optimization
export const useOptimizedPagination = (totalItems: number, itemsPerPage: number = 20) => {
  return useMemo(() => ({
    totalPages: Math.ceil(totalItems / itemsPerPage),
    itemsPerPage,
    getPageItems: (items: any[], currentPage: number) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.slice(startIndex, endIndex);
    }
  }), [totalItems, itemsPerPage]);
};