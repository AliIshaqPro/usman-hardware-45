import React, { memo, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface OptimizedCardListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  height?: number;
  itemSize?: number;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
}

export const OptimizedCardList = memo(<T,>({
  data,
  renderItem,
  height = 600,
  itemSize = 120,
  className = "",
  getItemKey = (item: any, index: number) => item.id || index
}: OptimizedCardListProps<T>) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = useMemo(() => virtualizer.getTotalSize(), [virtualizer]);

  if (!data.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items found
      </div>
    );
  }

  return (
    <div 
      className={`overflow-auto ${className}`} 
      style={{ height }} 
      ref={parentRef}
    >
      <div 
        style={{ 
          height: totalSize, 
          width: '100%', 
          position: 'relative' 
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = data[virtualItem.index];
          return (
            <div
              key={getItemKey(item, virtualItem.index)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}) as <T>(props: OptimizedCardListProps<T>) => JSX.Element;

(OptimizedCardList as any).displayName = 'OptimizedCardList';