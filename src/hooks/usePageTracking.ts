import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    mixpanel: any;
    trackingFunctions?: {
      onLoad?: (opts: { appId: string }) => void;
      onPageChange?: () => void;
    };
  }
}

const APOLLO_APP_ID = "68126c940f7bed002180de07";

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.mixpanel) {
      window.mixpanel.track("page viewed", {
        "page name": document.title,
        url: location.pathname,
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
