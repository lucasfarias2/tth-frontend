import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && analytics) {
    logEvent(analytics, eventName, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      ...eventParams,
    });
  }
};

export default trackEvent;
