import { useEffect, useState } from 'react';

export const useContainerResize = (resizeAfter, scrollable) => {
  const [isResized, updateIsResized] = useState(false);
  const [areDelaysApplied, updateAreDelaysApplied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !scrollable) return undefined;

    const handleScroll = () => {
      const scrollTop = scrollable.scrollTop || scrollable.scrollY || scrollable.pageYOffset;

      if (scrollTop > resizeAfter) {
        updateIsResized(true);
        updateAreDelaysApplied(false);
      } else {
        updateAreDelaysApplied(true);
        updateIsResized(false);
      }
    };
    scrollable.addEventListener('scroll', handleScroll);

    return () => scrollable.removeEventListener('scroll', handleScroll);
  }, [isResized, resizeAfter, scrollable]);

  return { isResized, areDelaysApplied };
};

export default useContainerResize;
