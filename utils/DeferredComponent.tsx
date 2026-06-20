import React, { useState, useEffect } from 'react';

interface DeferredComponentProps {
  component: React.ComponentType<any>;
  delay?: number;
  fallback?: React.ReactNode;
}

export const DeferredComponent: React.FC<DeferredComponentProps> = ({ 
  component: Component, 
  delay = 2000,
  fallback = null 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setIsVisible(true), { timeout: delay });
    } else {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return isVisible ? <Component /> : fallback;
};

export default DeferredComponent;
