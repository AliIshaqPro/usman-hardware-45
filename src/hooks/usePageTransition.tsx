import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPageName, setCurrentPageName] = useState('');
  const location = useLocation();

  // Map routes to page names
  const getPageName = (pathname: string): string => {
    const routeMap: Record<string, string> = {
      '/': 'Dashboard',
      '/orders': 'Orders',
      '/products': 'Products',
      '/sales': 'Sales',
      '/profit': 'Profit',
      '/customers': 'Customers',
      '/inventory': 'Inventory',
      '/suppliers': 'Suppliers',
      '/purchase-orders': 'Purchase Orders',
      '/quotations': 'Quotations',
      '/expense-tracking': 'Expense Tracking',
      '/customer-insights': 'Customer Insights',
      '/notifications': 'Notifications',
      '/settings': 'Settings',
      '/backup': 'Backup & Sync',
      '/calendar': 'Calendar',
      '/accounts-receivable': 'Accounts Receivable',
      '/outsourced-orders': 'Outsourced Orders',
      '/finance': 'Finance',
      '/reports': 'Reports'
    };
    
    return routeMap[pathname] || 'Page';
  };

  useEffect(() => {
    const newPageName = getPageName(location.pathname);
    
    // Start transition
    setIsTransitioning(true);
    setCurrentPageName(newPageName);

    // End transition after a short delay to allow for smooth loading
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Short duration for page transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return {
    isTransitioning,
    currentPageName,
    startTransition: () => setIsTransitioning(true),
    endTransition: () => setIsTransitioning(false)
  };
};