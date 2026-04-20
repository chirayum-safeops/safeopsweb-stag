import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; staggerChildren?: boolean; staggerDelay?: number }
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, staggerChildren = false, staggerDelay = 80 } = options || {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");

          if (staggerChildren) {
            const children = el.querySelectorAll(".reveal-child");
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add("revealed"), i * staggerDelay);
            });
          }

          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, staggerChildren, staggerDelay]);

  return ref;
}
