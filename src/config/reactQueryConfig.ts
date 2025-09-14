import { QueryClient } from '@tanstack/react-query';

// Optimized React Query configuration for large datasets
export const createOptimizedQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache for 5 minutes by default
        staleTime: 5 * 60 * 1000,
        // Keep in cache for 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry failed requests 2 times
        retry: 2,
        // Don't refetch on window focus for performance
        refetchOnWindowFocus: false,
        // Don't refetch on reconnect unless data is stale
        refetchOnReconnect: 'always',
        // Refetch interval for real-time data (30 seconds)
        refetchInterval: 30 * 1000,
        // Don't refetch if offline
        refetchIntervalInBackground: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};

// Query keys factory for better organization and cache invalidation
export const queryKeys = {
  // Dashboard queries
  dashboard: {
    all: ['dashboard'] as const,
    stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
    sales: () => [...queryKeys.dashboard.all, 'sales'] as const,
    inventory: () => [...queryKeys.dashboard.all, 'inventory'] as const,
    category: () => [...queryKeys.dashboard.all, 'category'] as const,
  },
  
  // Products queries
  products: {
    all: ['products'] as const,
    lists: () => [...queryKeys.products.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.products.lists(), { filters }] as const,
    details: () => [...queryKeys.products.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.products.details(), id] as const,
  },
  
  // Customers queries
  customers: {
    all: ['customers'] as const,
    lists: () => [...queryKeys.customers.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.customers.lists(), { filters }] as const,
    details: () => [...queryKeys.customers.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.customers.details(), id] as const,
    orders: (id: string | number) => [...queryKeys.customers.detail(id), 'orders'] as const,
  },
  
  // Orders queries
  orders: {
    all: ['orders'] as const,
    lists: () => [...queryKeys.orders.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.orders.lists(), { filters }] as const,
    details: () => [...queryKeys.orders.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.orders.details(), id] as const,
  },
  
  // Reports queries
  reports: {
    all: ['reports'] as const,
    financial: (params: Record<string, any>) => [...queryKeys.reports.all, 'financial', params] as const,
    inventory: () => [...queryKeys.reports.all, 'inventory'] as const,
    sales: (params: Record<string, any>) => [...queryKeys.reports.all, 'sales', params] as const,
  },
} as const;

// Cache invalidation helpers
export const cacheUtils = {
  invalidateProducts: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
  },
  
  invalidateCustomers: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.customers.all });
  },
  
  invalidateOrders: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
  },
  
  invalidateDashboard: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
  },
  
  // Prefetch common data
  prefetchCommonData: async (queryClient: QueryClient) => {
    // Prefetch dashboard stats
    queryClient.prefetchQuery({
      queryKey: queryKeys.dashboard.stats(),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  },
};
