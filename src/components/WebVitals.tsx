'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

/**
 * Web Vitals Component
 * Reports Core Web Vitals metrics for performance monitoring
 *
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Loading performance
 * - LCP (Largest Contentful Paint): Loading performance
 * - TTFB (Time to First Byte): Server response time
 * - INP (Interaction to Next Paint): Responsiveness (replaces FID in web-vitals v4+)
 */

function sendToAnalytics(metric: Metric) {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // In production, send to your analytics service
  // Examples:

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    });
  }

  // Vercel Analytics
  if (typeof window.va !== 'undefined') {
    window.va('event', {
      name: metric.name,
      data: {
        value: metric.value,
        rating: metric.rating,
      },
    });
  }

  // Custom endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });

    // Use sendBeacon if available, fallback to fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, body);
    } else {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error);
    }
  }
}

export function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to reduce initial bundle size
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onINP(sendToAnalytics);
    });
  }, []);

  // This component doesn't render anything
  return null;
}

// TypeScript declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (...args: any[]) => void;
  }
}
