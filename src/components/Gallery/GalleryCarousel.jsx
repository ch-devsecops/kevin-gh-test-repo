import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CarouselContent,
  Box,
  Copy,
  Fade,
  Icon,
  IconWrapper,
  useMediaQueries,
} from '@honda-canada/design-system-react';
import themeStyles from './Gallery.styles';
import { ArrowContainer, ArrowButton } from './Arrows';

const MobileInfoLabel = themeStyles.apply(Box, 'MobileInfoLabel');
const CarouselContainer = themeStyles.apply(Box, 'CarouselContainer');
const ContentWrapper = themeStyles.apply(Box, 'ContentWrapper');

// TODO: functional ui tests!
const GalleryCarousel = ({
  slides = [],
  controls,
  strings,
  showControls = true,
  shouldAnimate = true,
  inFullScreen,
  gtmTags,
  isDark,
  isShort,
  ...otherProps
}) => {
  const [mobileInfoPosition, setMobileInfoPosition] = useState(0);
  const { isMobile } = useMediaQueries();

  const { prevSlide, nextSlide, currentSlide, bindDrag, carouselId } = controls;

  useEffect(() => {
    // positions the landscape info label below image element
    if (isMobile && inFullScreen) {
      const setPosition = () => {
        const fullscreenRef = document.getElementById(`${controls.carouselId}-fullscreen`);
        const currentImage = fullscreenRef?.querySelectorAll('img')[currentSlide];
        const rect = currentImage?.getBoundingClientRect();

        setMobileInfoPosition(`${rect?.bottom}px`);
      };

      setPosition();

      window.addEventListener('resize', setPosition);

      return () => window.removeEventListener('resize', setPosition);
    }
  }, [showControls]);

  return (
    <CarouselContainer
      position="relative"
      width="100%"
      maxHeight={isShort && '500px'}
      {...otherProps}
      backgroundColor={['black', isDark ? 'black' : 'white']}
    >
      <ContentWrapper>
        <CarouselContent
          items={slides}
          currentSlide={currentSlide}
          bindDrag={bindDrag}
          carouselId={`${carouselId}${inFullScreen ? '-fullscreen' : ''}`}
          height="100%"
        />
        {inFullScreen && (
          <Fade
            shouldAnimate={shouldAnimate}
            duration="t5"
            initialOpacity={!shouldAnimate || showControls ? 0 : 1}
            direction={showControls ? 'in' : 'out'}
          >
            <MobileInfoLabel position="fixed" width="100%" top={mobileInfoPosition}>
              <IconWrapper>
                <Icon name="reset" width="20px !important" />
              </IconWrapper>
              <Copy size="extraSmall">{strings.mobileLandscapeInfoLabel}</Copy>
            </MobileInfoLabel>
          </Fade>
        )}
      </ContentWrapper>

      <ArrowContainer left="0" ml={['zero', 'zero', 'm']} isDark={isDark}>
        <Fade
          shouldAnimate={shouldAnimate}
          duration="t5"
          initialOpacity={!shouldAnimate || showControls ? 0 : 1}
          direction={showControls ? 'in' : 'out'}
          id={inFullScreen ? 'gallery-fullscreen-left' : ''}
        >
          <ArrowButton
            name="arrowLeft"
            onClick={prevSlide}
            aria-controls={carouselId}
            aria-label={strings.prevImageAria}
            isDark={isDark}
            disabled={currentSlide === 0 || !showControls}
            gtmTags={{ ...gtmTags, interactionType: 'gallery - view previous' }}
          />
        </Fade>
      </ArrowContainer>
      <ArrowContainer right="0" mr={['zero', 'zero', 'm']} isDark={isDark}>
        <Fade
          shouldAnimate={shouldAnimate}
          duration="t5"
          initialOpacity={!shouldAnimate || showControls ? 0 : 1}
          direction={showControls ? 'in' : 'out'}
          id={inFullScreen ? 'gallery-fullscreen-right' : ''}
        >
          <ArrowButton
            name="arrowRight"
            onClick={nextSlide}
            aria-controls={carouselId}
            aria-label={strings.nextImageAria}
            isDark={isDark}
            disabled={currentSlide === slides.length - 1 || !showControls}
            gtmTags={{ ...gtmTags, interactionType: 'gallery - view next' }}
          />
        </Fade>
      </ArrowContainer>
    </CarouselContainer>
  );
};

GalleryCarousel.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element),
  controls: PropTypes.shape(),
  strings: PropTypes.shape(),
  gtmTags: PropTypes.shape(),
  showControls: PropTypes.bool,
  shouldAnimate: PropTypes.bool,
  inFullScreen: PropTypes.bool,
  isDark: PropTypes.bool,
  isShort: PropTypes.bool,
};

export default GalleryCarousel;
