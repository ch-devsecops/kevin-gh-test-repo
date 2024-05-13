import React from 'react';
import { Box, BaseCarousel, useCarouselControl, Optional } from '@honda-canada/design-system-react';
import PropTypes from 'prop-types';
import BottomPaginator from '../BottomPaginator';
import themeStyles from './ProductDetailsCard.styles';

const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');
const BaseCarouselContainer = themeStyles.apply(BaseCarousel, 'BaseCarouselContainer');

const EmbeddedCarousel = ({
  items = [],
  behavior,
  gridBase = 8,
  showPagination = items.length > 1,
  crossFade = true,
  ...rest
}) => {
  const behaviorFallback = useCarouselControl(items.length) || {};
  const behaviorSource = behavior || behaviorFallback;
  const { prevSlide, nextSlide, setCurrentSlide, currentSlide, pages } = behaviorSource;

  return (
    <CarouselContainer {...rest}>
      <BaseCarouselContainer
        display="flex"
        justifyContent="center"
        items={items}
        behavior={behaviorSource}
        gridBase={gridBase}
        crossFade={crossFade}
      />
      <Optional when={showPagination}>
        <BottomPaginator
          pages={pages}
          currentSlide={currentSlide}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          setCurrentSlide={setCurrentSlide}
          arrowStyles={{ mx: [0, 0, 'big'] }}
          containerStyles={{ justifyContent: ['space-between', 'space-between', 'center'], mt: '20px' }}
          iconColor="typographyDefault"
        />
      </Optional>
    </CarouselContainer>
  );
};

EmbeddedCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  gridBase: PropTypes.number,
  behavior: PropTypes.func,
  showPagination: PropTypes.bool,
  crossFade: PropTypes.bool,
};

export default EmbeddedCarousel;
