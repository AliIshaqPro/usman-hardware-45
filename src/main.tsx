import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { startPerformanceMonitoring } from "@/utils/performanceUtils";
import { Preloader } from "@/components/Preloader";
import App from "./App.tsx";
import "./index.css";

// Start performance monitoring
startPerformanceMonitoring();

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Hide preloader after app is ready
  useEffect(() => {
    // Ensure minimum loading time for smooth experience
    const minLoadTime = 1500;
    const startTime = Date.now();
    
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remaining);
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <StrictMode>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <App />
      )}
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
