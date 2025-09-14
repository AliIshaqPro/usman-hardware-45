import React, { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const OrdersLoadingSkeleton = memo(() => (
  <div className="flex-1 space-y-6 p-6 animate-in fade-in-0 duration-300">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 border rounded-lg space-y-3 bg-card">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>

    {/* Filters */}
    <div className="flex flex-wrap gap-3 p-4 bg-muted/50 rounded-lg">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-28" />
      ))}
    </div>

    {/* Table */}
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted/50 border-b">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-4 border-b last:border-b-0">
          <div className="grid grid-cols-6 gap-4 items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

export const ProductsLoadingSkeleton = memo(() => (
  <div className="flex-1 space-y-6 p-6 animate-in fade-in-0 duration-300">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>

    {/* Search and Filters */}
    <div className="flex flex-col sm:flex-row gap-4">
      <Skeleton className="h-10 flex-1" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24" />
        ))}
      </div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-3 bg-card">
          <Skeleton className="h-32 w-full rounded" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
));

export const SalesLoadingSkeleton = memo(() => (
  <div className="flex h-full animate-in fade-in-0 duration-300">
    {/* Products Section */}
    <div className="flex-1 p-6 space-y-6">
      {/* Search */}
      <Skeleton className="h-10 w-full max-w-md" />
      
      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24" />
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-3 bg-card">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Cart Sidebar */}
    <div className="w-80 border-l bg-muted/30 p-6 space-y-4">
      <Skeleton className="h-6 w-24" />
      
      {/* Cart Items */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-3 border rounded space-y-2 bg-card">
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
));

OrdersLoadingSkeleton.displayName = 'OrdersLoadingSkeleton';
ProductsLoadingSkeleton.displayName = 'ProductsLoadingSkeleton';
SalesLoadingSkeleton.displayName = 'SalesLoadingSkeleton';