import React, { memo, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T, index: number) => React.ReactNode;
  width?: number;
}

interface VirtualizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  height?: number;
  itemSize?: number;
  className?: string;
}

export const VirtualizedTable = memo(<T extends { id: string | number }>({
  data,
  columns,
  height = 400,
  itemSize = 50,
  className = ""
}: VirtualizedTableProps<T>) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan: 10, // Render 10 extra items for smooth scrolling
  });

  const virtualItems = virtualizer.getVirtualItems();

  const totalSize = useMemo(() => virtualizer.getTotalSize(), [virtualizer]);

  if (!data.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className={`overflow-auto ${className}`} style={{ height }} ref={parentRef}>
      <div style={{ height: totalSize, width: '100%', position: 'relative' }}>
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} style={{ width: column.width }}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {virtualItems.map((virtualItem) => {
              const item = data[virtualItem.index];
              return (
                <TableRow
                  key={item.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} style={{ width: column.width }}>
                      {column.render(item, virtualItem.index)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}) as <T extends { id: string | number }>(props: VirtualizedTableProps<T>) => JSX.Element;

(VirtualizedTable as any).displayName = 'VirtualizedTable';