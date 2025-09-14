
import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api";
import { reportsApi } from "@/services/reportsApi";
import { queryKeys } from "@/config/reactQueryConfig";

export function useDashboardData() {
  // Optimized dashboard data queries with proper caching
  const { data: enhancedStats, isLoading: statsLoading } = useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: dashboardApi.getEnhancedStats,
    staleTime: 2 * 60 * 1000, // 2 minutes - dashboard data changes frequently
    gcTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const { data: categoryPerformance, isLoading: categoryLoading } = useQuery({
    queryKey: queryKeys.dashboard.category(),
    queryFn: dashboardApi.getCategoryPerformance,
    staleTime: 5 * 60 * 1000, // 5 minutes - categories change less frequently
  });

  const { data: dailySales, isLoading: salesLoading } = useQuery({
    queryKey: queryKeys.dashboard.sales(),
    queryFn: dashboardApi.getDailySales,
    staleTime: 1 * 60 * 1000, // 1 minute - sales data should be fresh
  });

  const { data: inventoryStatus, isLoading: inventoryLoading } = useQuery({
    queryKey: queryKeys.dashboard.inventory(),
    queryFn: dashboardApi.getInventoryStatus,
    staleTime: 3 * 60 * 1000, // 3 minutes - inventory changes moderately
  });

  // Fetch reports data for Analytics and Reports tabs
  const { data: salesReport, isLoading: salesReportLoading } = useQuery({
    queryKey: queryKeys.reports.sales({ period: 'daily' }),
    queryFn: () => reportsApi.getSalesReport({ period: 'daily' }),
    staleTime: 5 * 60 * 1000,
  });

  const { data: inventoryReport, isLoading: inventoryReportLoading } = useQuery({
    queryKey: queryKeys.reports.inventory(),
    queryFn: reportsApi.getInventoryReport,
    staleTime: 10 * 60 * 1000, // 10 minutes - inventory reports change slowly
  });

  const { data: financialReport, isLoading: financialReportLoading } = useQuery({
    queryKey: queryKeys.reports.financial({ period: 'monthly', year: 2025 }),
    queryFn: () => reportsApi.getFinancialReport({ period: 'monthly', year: 2025 }),
    staleTime: 15 * 60 * 1000, // 15 minutes - financial reports are less time-sensitive
  });

  const isLoading = statsLoading || categoryLoading || salesLoading || inventoryLoading;

  return {
    enhancedStats,
    categoryPerformance,
    dailySales,
    inventoryStatus,
    salesReport,
    inventoryReport,
    financialReport,
    isLoading,
    statsLoading,
    categoryLoading,
    salesLoading,
    inventoryLoading,
    salesReportLoading,
    inventoryReportLoading,
    financialReportLoading,
  };
}
