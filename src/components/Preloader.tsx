import React, { useEffect, useState } from 'react';
import { Package, Wrench, Zap, CheckCircle } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { icon: Package, label: 'Loading Inventory', delay: 800 },
    { icon: Wrench, label: 'Setting up Tools', delay: 600 },
    { icon: Zap, label: 'Connecting Systems', delay: 500 },
    { icon: CheckCircle, label: 'Almost Ready', delay: 400 }
  ];

  useEffect(() => {
    const totalDuration = 2200; // Total loading time
    const stepDuration = totalDuration / steps.length;
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);

    // Step progression
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, index * stepDuration);
    });

    // Completion
    setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 600);
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-lg rotate-45" />
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-accent rounded-full" />
        <div className="absolute bottom-20 left-32 w-24 h-24 border-2 border-muted-foreground rounded-lg rotate-12" />
        <div className="absolute bottom-40 right-10 w-12 h-12 border-2 border-primary rounded-full" />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo Section */}
        <div className="space-y-4">
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 rounded-2xl animate-pulse" />
            <div className="absolute inset-2 bg-background rounded-xl flex items-center justify-center">
              <Package className="w-8 h-8 text-primary" />
            </div>
            {/* Rotating rings */}
            <div className="absolute -inset-2 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 border border-accent/20 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Usman Hardware
            </h1>
            <p className="text-sm text-muted-foreground">
              Management System
            </p>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep || isComplete;
              
              return (
                <div
                  key={index}
                  className={`
                    relative transition-all duration-500 transform
                    ${isActive ? 'scale-110' : 'scale-100'}
                    ${isCompleted ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  <div 
                    className={`
                      w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
                      ${isActive ? 'border-primary bg-primary/10 shadow-lg shadow-primary/25' : ''}
                      ${isCompleted && !isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-muted'}
                    `}
                  >
                    <Icon 
                      className={`
                        w-5 h-5 transition-all duration-300
                        ${isActive ? 'animate-pulse' : ''}
                      `} 
                    />
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -inset-1 border-2 border-primary/30 rounded-full animate-ping" />
                  )}
                  
                  {/* Completed checkmark */}
                  {isCompleted && !isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current Step Label */}
          <div className="h-6">
            <p className="text-sm text-foreground font-medium animate-fade-in">
              {steps[currentStep]?.label}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Progress bar glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Initializing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground/60">
          Hafizabad • Professional Hardware Management
        </div>
      </div>

      {/* Completion Animation */}
      {isComplete && (
        <div className="absolute inset-0 bg-background/90 flex items-center justify-center animate-fade-in">
          <div className="text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">Ready!</p>
          </div>
        </div>
      )}
    </div>
  );
};