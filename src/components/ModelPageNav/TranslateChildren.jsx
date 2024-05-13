import React, { useState, useEffect } from 'react';
import { Box, useMediaQueries } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import css from '@styled-system/css';

/**
 * The sticky ModelPageNav not cover other sticky or fixed components that are
 * below it on the page.
 *
 * Use this component to translate those components up and down, based on the window
 * scroll position, to ensure they're always visible.
 *
 * Mobile and Small Desktop only.
 */

const StyledBox = styled(Box)(({ translate }) =>
  css({
    transform: [`translateY(${translate}px)`, `translateY(${translate}px)`, 'none'],
    transition: 'transform 0.1s',
  }),
);

const TranslateChildren = ({ children }) => {
  const [translate, setTranslate] = useState(0);
  const { isMobile, isSmallDesktop } = useMediaQueries();
  // eslint-disable-next-line no-nested-ternary
  const modelPageNavHeight = isMobile && !isSmallDesktop ? 70 : isSmallDesktop ? 85 : 0;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleScrollPosition = () => {
      if (window.scrollY > modelPageNavHeight) {
        setTranslate(0);
      } else {
        setTranslate(modelPageNavHeight);
      }
    };

    handleScrollPosition();
    window.addEventListener('scroll', handleScrollPosition);

    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  return <StyledBox translate={translate}>{children}</StyledBox>;
};

export default TranslateChildren;
