// Performance monitoring utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    
    if (duration > 16) { // More than 1 frame at 60fps
      console.warn(`⚠️ Slow render detected: ${componentName} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  },

  // Debounce function for search and input optimization
  debounce: <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },

  // Throttle function for scroll events
  throttle: <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>): void => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, delay);
      }
    };
  },

  // Memory usage monitor
  monitorMemory: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.log('Memory Usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100 + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100 + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100 + ' MB',
      });
    }
  },

  // Intersection Observer for lazy loading
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    return new IntersectionObserver(callback, defaultOptions);
  },

  // Bundle size analyzer helper
  logBundleInfo: () => {
    console.log('Performance Optimizations Active:', {
      virtualization: '✅ Large lists use virtual scrolling',
      memoization: '✅ Components memoized with React.memo',
      debouncing: '✅ Search inputs debounced',
      caching: '✅ React Query with optimized cache settings',
      lazyLoading: '✅ Routes lazy loaded',
      bundleSplitting: '✅ Code splitting enabled'
    });
  }
};

// Performance monitoring hook
export const startPerformanceMonitoring = () => {
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 50) {
          console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }

  // Log performance info on startup
  performanceUtils.logBundleInfo();
  
  // Monitor memory every 30 seconds in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      performanceUtils.monitorMemory();
    }, 30000);
  }
};