import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Box } from '@honda-canada/design-system-react';

const Container = styled(Box)(
  css({
    margin: '20px auto 0 auto',
    bg: 'grey.2',
    width: '3px',
    borderRadius: '0 0 1.5px 1.5px',
    '&:before': {
      content: '""',
      bg: 'primary',
      height: '20px',
      width: '3px',
      display: 'block',
      borderRadius: '1.5px 1.5px 0 0',
      top: '-20px',
      position: 'relative',
    },
  }),
);

const ProgressIndicator = styled(Box).attrs(props => ({
  style: {
    height: props.progress,
  },
}))`
  border-radius: 0 0 1.5px 1.5px;
  position: relative;
  width: 3px;
  top: -20px;
`;

const TOP_SPACER = 171;

const MenuItemScrollProgressIndicator = ({ activeElement }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(100);

  useEffect(() => {
    const scrollListener = () => {
      if (!activeElement || typeof window === 'undefined') {
        return undefined;
      }
      const distanceFromTop = window.pageYOffset;
      const elementTop = activeElement.getBoundingClientRect().top + distanceFromTop;
      const totalHeight = activeElement.offsetHeight;
      const scrollTop = TOP_SPACER + distanceFromTop;

      if (!scrollTop) {
        return setScrollProgress(0);
      }

      return scrollTop - elementTop > totalHeight
        ? (setContainerHeight(0), setScrollProgress(100))
        : (setScrollProgress(((scrollTop - elementTop) / totalHeight) * 100), setContainerHeight(100));
    };
    window.addEventListener('scroll', scrollListener);

    return () => window.removeEventListener('scroll', scrollListener);
  }, [activeElement]);

  return (
    <Container height={containerHeight} textAlign="center">
      <ProgressIndicator progress={`${scrollProgress}%`} bg="primary" />
    </Container>
  );
};

MenuItemScrollProgressIndicator.propTypes = {
  activeElement: PropTypes.shape({}),
};

export default MenuItemScrollProgressIndicator;
