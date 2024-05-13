import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Row, Box, Column } from '@honda-canada/design-system-react';
import themeStyles from './Gallery.styles';
import { getScrollBehaviour } from '../../utils/common';

const ThumbnailContainer = themeStyles.apply(Column, 'ThumbnailContainer');

const Thumbnails = ({
  images = [],
  setActiveImageIndex,
  activeImageIndex,
  currentPage,
  thumbnailPages,
  isDark,
  isFullScreenMobile,
  ...otherProps
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scrollOffset = containerRef.current.clientWidth * (currentPage - 1);

    if (currentPage === thumbnailPages) {
      scrollOffset = containerRef.current.scrollWidth; // if last thumbnail page is active
    }

    if (currentPage === 1) {
      scrollOffset = 0; // if first thumbnail page is active
    }

    containerRef.current.scrollTo({
      top: 0,
      left: scrollOffset,
      behavior: getScrollBehaviour(navigator),
    });
  }, [currentPage, thumbnailPages]);

  return (
    <Row display="flex" width="100%" flexWrap="no-wrap" overflow="hidden" ref={containerRef} {...otherProps}>
      {images?.map((image, i) => (
        // add aria label
        <ThumbnailContainer
          key={i.props?.src}
          as="button"
          onClick={() => setActiveImageIndex(i)}
          isActive={activeImageIndex === i}
          width={[1 / 4, 1 / 4, 1 / 6]}
          backgroundColor={isDark && !isFullScreenMobile ? 'black' : 'white'}
        >
          {image}
          <Box className="thumbnail-border" height="4px" backgroundColor="red" />
        </ThumbnailContainer>
      ))}
    </Row>
  );
};

Thumbnails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.element),
  setActiveImageIndex: PropTypes.func,
  activeImageIndex: PropTypes.number,
  strings: PropTypes.shape(),
  currentPage: PropTypes.number,
  thumbnailPages: PropTypes.number,
  isDark: PropTypes.bool,
};

export default Thumbnails;
