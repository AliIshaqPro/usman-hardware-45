import { lazy } from 'react';

// Lazy load heavy pages with prefetching
export const LazyOrders = lazy(() => 
  import('../pages/Orders').then(module => {
    // Preload related components after main component loads
    setTimeout(() => {
      import('../components/orders/OrdersTable');
      import('../components/orders/OrdersFilters');
      import('../components/orders/OrdersSummaryCards');
    }, 100);
    
    return module;
  })
);

export const LazyProducts = lazy(() => 
  import('../pages/Products').then(module => {
    // Preload related components
    setTimeout(() => {
      import('../components/products/EnhancedExportModal');
    }, 100);
    
    return module;
  })
);

export const LazySales = lazy(() => 
  import('../pages/Sales').then(module => {
    // Preload related components
    setTimeout(() => {
      import('../components/sales/CartSidebar');
      import('../components/sales/ProductCard');
      import('../components/sales/ProductDetailsModal');
    }, 100);
    
    return module;
  })
);

// Other lazy pages
export const LazyDashboard = lazy(() => import('../pages/Dashboard'));
export const LazyCustomers = lazy(() => import('../pages/Customers'));
export const LazyInventory = lazy(() => import('../pages/Inventory'));
export const LazyFinance = lazy(() => import('../pages/Finance'));
export const LazyReports = lazy(() => import('../pages/Reports'));
export const LazySuppliers = lazy(() => import('../pages/Suppliers'));
export const LazyPurchaseOrders = lazy(() => import('../pages/PurchaseOrders'));
export const LazyQuotations = lazy(() => import('../pages/Quotations'));
export const LazyExpenseTracking = lazy(() => import('../pages/ExpenseTracking'));
export const LazyCustomerInsights = lazy(() => import('../pages/CustomerInsights'));
export const LazyNotifications = lazy(() => import('../pages/Notifications'));
export const LazySettings = lazy(() => import('../pages/Settings'));
export const LazyBackupSync = lazy(() => import('../pages/BackupSync'));
export const LazyCalendar = lazy(() => import('../pages/Calendar'));
export const LazyAccountsReceivable = lazy(() => import('../pages/AccountsReceivable'));
export const LazyOutsourcedOrders = lazy(() => import('../pages/OutsourcedOrders'));
export const LazyProfit = lazy(() => import('../pages/Profit'));
export const LazyNotFound = lazy(() => import('../pages/NotFound'));
