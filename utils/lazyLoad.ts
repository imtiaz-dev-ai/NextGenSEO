import React from 'react';

export const lazyLoadComponent = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(importFunc);
};

// Preload component on idle
export const preloadComponent = (importFunc: () => Promise<any>) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => importFunc());
  } else {
    setTimeout(() => importFunc(), 2000);
  }
};
