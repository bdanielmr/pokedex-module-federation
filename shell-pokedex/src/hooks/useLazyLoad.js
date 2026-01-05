import { useState, useEffect, useRef } from "react";

export function useLazyLoad(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const { rootMargin = "200px", threshold = 0.01 } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold]);

  return { ref, isVisible };
}