import { useState, useRef, useEffect } from 'react';
import { useMediaQueries } from '@honda-canada/design-system-react';
import { SWATCH_GAP } from './constants';
import { getScrollBehaviour } from '../../../utils/common';

const useCarouselSwatch = pages => {
  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef({});
  const { isSmallDesktop, isDesktop } = useMediaQueries();

  useEffect(() => {
    const element = containerRef.current;
    const gap = isSmallDesktop || isDesktop ? SWATCH_GAP.desktop * 2 : SWATCH_GAP.mobile * 2;
    let scrollOffset = element.clientWidth * (currentPage - 1) + gap / 2;

    if (currentPage === pages) {
      scrollOffset = element.scrollWidth; // if last page is active
    }

    if (currentPage === 1) {
      scrollOffset = 0; // if first page is active
    }

    if (element && element.scrollTo) {
      element.scrollTo({
        top: 0,
        left: scrollOffset,
        behavior: getScrollBehaviour(navigator),
      });
    }
  }, [currentPage, pages]);

  return {
    currentPage,
    setCurrentPage,
    containerRef,
  };
};

export default useCarouselSwatch;
