import { useEffect, useRef } from "react";

const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(callback);

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback]);

  return { lastElementRef };
};

export default useIntersectionObserver;
