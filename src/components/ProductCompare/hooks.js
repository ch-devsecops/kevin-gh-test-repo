import { useEffect, useState } from 'react';
import isSSR from '../../utils/isSSR';

function offset(el) {
  if (!el || isSSR()) {
    return null;
  }
  const rect = el.getBoundingClientRect();
  const scrollTop = (window?.pageYOffset || document.documentElement.offsetTop) - 75;
  return rect.top + scrollTop;
}

export const useDesktopTransitionState = ({ isDesktop, refProductCompareRow }) => {
  const [showDesktopSticky, setShowDesktopSticky] = useState(false);
  const [hideDesktopSticky, setHideDesktopSticky] = useState(false);
  const offsetHeight = offset(refProductCompareRow?.current);
  useEffect(() => {
    if (typeof window !== 'undefined' && isDesktop) {
      const handleMobileScroll = () => {
        const scrollTop = window.pageYOffset;

        const specTable = document.querySelector('.specifications-table');
        const tableBottom = specTable?.getBoundingClientRect().bottom;
        const isTableOut = tableBottom <= 500;

        if (scrollTop >= offsetHeight) {
          setShowDesktopSticky(true);
        } else if (!isTableOut) {
          setShowDesktopSticky(false);
        }

        if (isTableOut) {
          setHideDesktopSticky(true);
        } else {
          setHideDesktopSticky(false);
        }
      };

      handleMobileScroll();
      window.addEventListener('scroll', handleMobileScroll);

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    }

    return () => {};
  }, [isDesktop, showDesktopSticky, offsetHeight]);

  return {
    showDesktopSticky,
    hideDesktopSticky,
  };
};

export const useMobileTransitionState = ({ isMobile, isTablet }) => {
  const [showTitleSticky, setShowTitleSticky] = useState(false);
  const [showFooterPagination, setShowFooterPagination] = useState(false);
  const [hideSticky, setHideSticky] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (isMobile || isTablet)) {
      const handleMobileScroll = () => {
        const specTable = document.querySelector('.specifications-table');
        const tableBottom = specTable?.getBoundingClientRect().bottom;
        const isTableOut = (isTablet && tableBottom <= 800) || tableBottom <= 600;
        const scrollTop = window.scrollY;

        if (isTableOut && showFooterPagination) {
          setShowFooterPagination(false);
        } else if (!isTableOut && !showFooterPagination) {
          setShowFooterPagination(true);
        }

        if (scrollTop >= 150) {
          setShowTitleSticky(true);
        } else {
          setShowTitleSticky(false);
        }

        if (isTableOut) {
          setHideSticky(true);
        } else {
          setHideSticky(false);
        }
      };

      handleMobileScroll();
      window.addEventListener('scroll', handleMobileScroll);

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    }

    return () => {};
  }, [isMobile, isTablet, showTitleSticky, showFooterPagination, hideSticky]);

  return {
    showTitleSticky,
    showFooterPagination,
    hideSticky,
  };
};
