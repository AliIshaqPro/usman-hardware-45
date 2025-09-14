import React from 'react';
import { Loader2, Package } from 'lucide-react';

interface PageTransitionPreloaderProps {
  pageName: string;
  isVisible: boolean;
}

export const PageTransitionPreloader: React.FC<PageTransitionPreloaderProps> = ({ 
  pageName, 
  isVisible 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute top-20 left-20 w-16 h-16 border border-primary/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute top-40 right-32 w-12 h-12 border border-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-40 w-20 h-20 border border-muted-foreground/20 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-14 h-14 border border-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-sm mx-auto px-6">
        {/* Logo */}
        <div className="relative mx-auto w-16 h-16 mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl animate-pulse" />
          <div className="absolute inset-2 bg-background/80 rounded-lg border border-primary/20 flex items-center justify-center backdrop-blur-sm">
            <Package className="w-6 h-6 text-primary animate-pulse" />
          </div>
          {/* Subtle rotating ring */}
          <div className="absolute -inset-1 border border-primary/10 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Loading Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <h3 className="text-lg font-medium text-foreground">
              Loading {pageName}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Please wait while we prepare your data...
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-3">
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full animate-pulse">
              <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};