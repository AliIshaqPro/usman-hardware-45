import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontProvider } from "@/components/FontProvider";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { createOptimizedQueryClient } from "@/config/reactQueryConfig";
import { LazyPageWrapper } from "@/components/LazyPageWrapper";
import {
  LazyOrders,
  LazyProducts,
  LazySales,
  LazyDashboard,
  LazyCustomers,
  LazyInventory,
  LazyFinance,
  LazyReports,
  LazySuppliers,
  LazyPurchaseOrders,
  LazyQuotations,
  LazyExpenseTracking,
  LazyCustomerInsights,
  LazyNotifications,
  LazySettings,
  LazyBackupSync,
  LazyCalendar,
  LazyAccountsReceivable,
  LazyOutsourcedOrders,
  LazyProfit,
  LazyNotFound
} from "@/utils/lazyImports";
import {
  OrdersLoadingSkeleton,
  ProductsLoadingSkeleton,
  SalesLoadingSkeleton
} from "@/components/LoadingStates";

const queryClient = createOptimizedQueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="hardware-store-theme">
      <FontProvider defaultFont="inter" storageKey="hardware-store-font">
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto custom-scrollbar">
                  <Routes>
                    <Route 
                      path="/" 
                      element={
                        <LazyPageWrapper pageName="Dashboard">
                          <LazyDashboard />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/orders" 
                      element={
                        <LazyPageWrapper pageName="Orders" fallback={<OrdersLoadingSkeleton />}>
                          <LazyOrders />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/products" 
                      element={
                        <LazyPageWrapper pageName="Products" fallback={<ProductsLoadingSkeleton />}>
                          <LazyProducts />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/sales" 
                      element={
                        <LazyPageWrapper pageName="Sales" fallback={<SalesLoadingSkeleton />}>
                          <LazySales />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/profit" 
                      element={
                        <LazyPageWrapper pageName="Profit">
                          <LazyProfit />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/customers" 
                      element={
                        <LazyPageWrapper pageName="Customers">
                          <LazyCustomers />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/inventory" 
                      element={
                        <LazyPageWrapper pageName="Inventory">
                          <LazyInventory />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/suppliers" 
                      element={
                        <LazyPageWrapper pageName="Suppliers">
                          <LazySuppliers />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/purchase-orders" 
                      element={
                        <LazyPageWrapper pageName="Purchase Orders">
                          <LazyPurchaseOrders />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/quotations" 
                      element={
                        <LazyPageWrapper pageName="Quotations">
                          <LazyQuotations />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/expense-tracking" 
                      element={
                        <LazyPageWrapper pageName="Expense Tracking">
                          <LazyExpenseTracking />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/customer-insights" 
                      element={
                        <LazyPageWrapper pageName="Customer Insights">
                          <LazyCustomerInsights />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/notifications" 
                      element={
                        <LazyPageWrapper pageName="Notifications">
                          <LazyNotifications />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/settings" 
                      element={
                        <LazyPageWrapper pageName="Settings">
                          <LazySettings />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/backup" 
                      element={
                        <LazyPageWrapper pageName="Backup & Sync">
                          <LazyBackupSync />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/calendar" 
                      element={
                        <LazyPageWrapper pageName="Calendar">
                          <LazyCalendar />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/accounts-receivable" 
                      element={
                        <LazyPageWrapper pageName="Accounts Receivable">
                          <LazyAccountsReceivable />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/outsourced-orders" 
                      element={
                        <LazyPageWrapper pageName="Outsourced Orders">
                          <LazyOutsourcedOrders />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/finance" 
                      element={
                        <LazyPageWrapper pageName="Finance">
                          <LazyFinance />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="/reports" 
                      element={
                        <LazyPageWrapper pageName="Reports">
                          <LazyReports />
                        </LazyPageWrapper>
                      } 
                    />
                    <Route 
                      path="*" 
                      element={
                        <LazyPageWrapper pageName="Not Found">
                          <LazyNotFound />
                        </LazyPageWrapper>
                      } 
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
        </TooltipProvider>
      </FontProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
