import React, { memo, useCallback, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VirtualizedTable } from "@/components/ui/virtualized-table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, Eye, FileText, User } from "lucide-react";
import { formatQuantity } from "@/lib/utils";
import { usePerformanceMonitor } from "@/hooks/usePerformanceOptimization";

interface Sale {
  id: number;
  orderNumber: string;
  customerId: number | null;
  customerName: string | null;
  date: string;
  time: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdBy: string;
  createdAt: string;
}

interface OrdersTableProps {
  orders: Sale[];
  currentPage: number;
  totalPages: number;
  onViewOrder: (order: Sale) => void;
  onOrderPDF: (order: Sale) => void;
  onPageChange: (page: number) => void;
}

const OrdersTableComponent = ({ 
  orders, 
  currentPage, 
  totalPages, 
  onViewOrder, 
  onOrderPDF, 
  onPageChange 
}: OrdersTableProps) => {
  usePerformanceMonitor('OrdersTable');

  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>;
    }
  }, []);

  const getPaymentMethodBadge = useCallback((method: string) => {
    switch (method) {
      case "cash":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Cash</Badge>;
      case "credit":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Credit</Badge>;
      case "card":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Card</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  }, []);

  // Memoize columns for virtualized table
  const columns = useMemo(() => [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (order: Sale) => (
        <span className="font-medium">{order.orderNumber}</span>
      ),
      width: 150
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order: Sale) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-slate-400" />
          {order.customerName || "Walk-in"}
        </div>
      ),
      width: 200
    },
    {
      key: 'date',
      header: 'Date',
      render: (order: Sale) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          {new Date(order.date).toLocaleDateString()}
        </div>
      ),
      width: 150
    },
    {
      key: 'items',
      header: 'Items',
      render: (order: Sale) => (
        <div className="text-sm">
          {order.items.length} item{order.items.length > 1 ? 's' : ''}
          <div className="text-xs text-slate-500">
            {order.items.slice(0, 2).map((item, index) => (
              <span key={index}>
                {item.productName} x {formatQuantity(item.quantity)}
                {index < Math.min(1, order.items.length - 1) && ', '}
              </span>
            ))}
            {order.items.length > 2 && '...'}
          </div>
        </div>
      ),
      width: 250
    },
    {
      key: 'total',
      header: 'Total',
      render: (order: Sale) => {
        const finalTotal = order.subtotal - order.discount;
        return <span className="font-medium">Rs. {finalTotal.toLocaleString()}</span>;
      },
      width: 120
    },
    {
      key: 'payment',
      header: 'Payment',
      render: (order: Sale) => getPaymentMethodBadge(order.paymentMethod),
      width: 120
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: Sale) => getStatusBadge(order.status),
      width: 120
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (order: Sale) => (
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => onViewOrder(order)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50"
            onClick={() => onOrderPDF(order)}
          >
            <FileText className="h-3 w-3 mr-1" />
            PDF
          </Button>
        </div>
      ),
      width: 180
    }
  ], [getStatusBadge, getPaymentMethodBadge, onViewOrder, onOrderPDF]);

  return (
    <>
      {/* Use virtualized table for large datasets */}
      {orders.length > 50 ? (
        <VirtualizedTable
          data={orders}
          columns={columns}
          height={600}
          itemSize={60}
          className="border rounded-lg"
        />
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-2 text-left font-medium text-sm">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="border-t hover:bg-muted/30">
          {columns.map((column) => (
            <td key={column.key} className="px-4 py-2">
              {column.render(order)}
            </td>
          ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          No orders found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => onPageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export const OrdersTable = memo(OrdersTableComponent);
OrdersTable.displayName = 'OrdersTable';
