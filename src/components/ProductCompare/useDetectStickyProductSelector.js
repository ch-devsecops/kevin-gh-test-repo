import { useEffect, useRef, useState } from 'react';
import isSSR from '../../utils/isSSR';
import { DEFAULT_HEADER_HEIGHT } from '../../utils/constants';

const useDetectStickyProductSelector = targetRef => {
  const [isSticky, setIsSticky] = useState(false);
  const isStickyRef = useRef(isSticky);
  const STICKY_THRESHOLD = 20;

  const handleScroll = (element, headerHeight) => {
    const scrollData = element.getBoundingClientRect();

    // This resolves flickering on ios due to a rendering quirk
    const elementTopValue =
      scrollData.top === headerHeight - 0.328125 || scrollData.top === headerHeight + 0.328125
        ? headerHeight
        : scrollData.top;

    const shouldBeSticky = elementTopValue < headerHeight + STICKY_THRESHOLD;

    if (shouldBeSticky !== isStickyRef.current) {
      setIsSticky(shouldBeSticky);
    }
  };

  useEffect(() => {
    isStickyRef.current = isSticky;
  }, [isSticky]);

  useEffect(() => {
    if (!isSSR() && targetRef.current) {
      const header = document.querySelector('[data-testid="header-nav-container"]');
      const headerHeight = header ? header.offsetHeight : DEFAULT_HEADER_HEIGHT;
      const targetElement = targetRef.current;

      const scrollHandler = () => handleScroll(targetElement, headerHeight);

      window.addEventListener('scroll', scrollHandler);
      return () => window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return {
    isSticky,
  };
};

export default useDetectStickyProductSelector;
