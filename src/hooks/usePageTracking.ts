import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    mixpanel: any;
    gtag?: (...args: unknown[]) => void;
    trackingFunctions?: {
      onLoad?: (opts: { appId: string }) => void;
      onPageChange?: () => void;
    };
  }
}

const APOLLO_APP_ID = "68126c940f7bed002180de07";
const GA_MEASUREMENT_ID = "G-L51HP20905";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;

    if (window.mixpanel) {
      window.mixpanel.track("page viewed", {
        "page name": document.title,
        url: location.pathname,
      });
    }

    if (window.gtag) {
      window.gtag("event", "page_view", {
        send_to: GA_MEASUREMENT_ID,
        page_path: pagePath,
        page_title: document.title,
      });
    }

    const tf = window.trackingFunctions;
    if (tf) {
      if (typeof tf.onPageChange === "function") {
        tf.onPageChange();
      } else if (typeof tf.onLoad === "function") {
        tf.onLoad({ appId: APOLLO_APP_ID });
      }
    }
  }, [location]);
};
