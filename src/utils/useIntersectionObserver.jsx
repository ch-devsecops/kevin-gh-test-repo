import { useRef, useState, useEffect } from 'react';

const useIntersectionObserver = options => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionObserverObj, setIntersectionObserverObj] = useState({});

  const callBackFunc = entries => {
    const [entry] = entries;

    setIntersectionObserverObj(entry);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunc, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [intersectionObserverObj, containerRef, isVisible];
};

export default useIntersectionObserver;
