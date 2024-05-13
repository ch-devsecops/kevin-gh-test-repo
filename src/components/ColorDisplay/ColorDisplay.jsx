import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, H5, Markdown, Fade, useMediaQueries } from '@honda-canada/design-system-react';

import CTA from '../CTA';
import ColorDisplaySwatches from './ColorDisplaySwatches';
import PrimaryImages from './PrimaryImages';
import SecondaryImages from './SecondaryImages';
import { SWATCH_GAP, SWATCH_WIDTH } from './CarouselSwatch/constants';

const ColorDisplay = ({
  title,
  primaryImages = [],
  secondaryImages = [],
  swatches,
  ctaLink,
  ctaType,
  onSelectSwatch,
  selectedSwatch,
  isDark,
  isShort,
  imageAnimation,
  imageMaximumWidth,
  gtmTags,
}) => {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [swatchLength, setSwatchLength] = useState(7);
  const [primaryImageHeight, setPrimaryImageHeight] = useState('100%');
  const [prevSelectedSwatch, setPrevSelectedSwatch] = useState(0);

  const secondaryImageRef = useRef(null);
  const primaryImageRef = useRef(null);
  const { isDesktop } = useMediaQueries();

  useEffect(() => {
    if (secondaryImageRef?.current && isDesktop) {
      const swatchRange = SWATCH_WIDTH.desktop + SWATCH_GAP.desktop;
      const carouselRange = swatchLength * swatchRange + SWATCH_WIDTH.desktop;

      const handleSwatchCarouselWidth = () => {
        const shouldReduce = secondaryImageRef.current.offsetLeft <= carouselRange;
        const shouldAdd = secondaryImageRef.current.offsetLeft > carouselRange + swatchRange;

        if (shouldReduce && swatchLength > 3) setSwatchLength(swatchLength - 1);
        else if (shouldAdd && swatchLength < 7) setSwatchLength(swatchLength + 1);
      };

      handleSwatchCarouselWidth(); // on initial load
      window.addEventListener('resize', handleSwatchCarouselWidth);

      return () => {
        window.removeEventListener('resize', handleSwatchCarouselWidth);
      };
    }
    setSwatchLength(7); // on tablet switch from desktop
  }, [secondaryImageRef, swatchLength, isDesktop]);

  useEffect(() => {
    if (primaryImageRef?.current) {
      const handlePrimaryImageHeight = () => {
        setPrimaryImageHeight(primaryImageRef.current.clientWidth * 0.5625);
      };

      handlePrimaryImageHeight();
      window.addEventListener('resize', handlePrimaryImageHeight);
      return () => window.removeEventListener('resize', handlePrimaryImageHeight);
    }
  }, [primaryImageRef]);

  if (selectedSwatch > swatches.length - 1) return null;

  const selectSwatch = selected => {
    if (!isAnimationActive) {
      onSelectSwatch(selected);
    }
  };

  return (
    <Fade
      position="relative"
      display={['flex', 'flex', 'block']}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      duration="t2"
    >
      <Box
        display={['flex', 'flex', 'block']}
        position="relative"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={['100%', '100%', primaryImageHeight]}
        width="100%"
        maxHeight={isShort ? '400px' : 'none'}
      >
        <Box
          ref={primaryImageRef}
          position="relative"
          overflow="hidden"
          height={[primaryImageHeight, primaryImageHeight, '100%']}
          width="100%"
        >
          <PrimaryImages
            setIsAnimationActive={setIsAnimationActive}
            activeImage={selectedSwatch}
            prevImage={prevSelectedSwatch}
            setPrevImage={setPrevSelectedSwatch}
            images={primaryImages}
            animation={imageAnimation}
            maximumWidth={imageMaximumWidth}
          />
        </Box>

        <Box
          display={['block', 'none', 'block']}
          zIndex={2}
          position={['relative', 'relative', 'absolute']}
          top={isShort ? ['-12px', '-95px', 'initial'] : ['-42px', '-95px', 'initial']}
          left={[0, 0, '50%']}
          bottom={[0, 0, '-210px']}
          width={isShort ? ['172px', '390px'] : ['222px', '506px']}
          height={['125px', isShort ? '240px' : '285px']}
          overflow="hidden"
          ref={secondaryImageRef}
        >
          <SecondaryImages images={secondaryImages} activeImage={selectedSwatch} />
        </Box>
      </Box>

      <Box
        mt={['-34px', 'default', 'l']}
        display={['flex', 'flex', 'block']}
        flexDirection="column"
        alignItems="center"
      >
        <Markdown size="small" fontFamily="heading" mb="xxs" color={isDark ? 'white' : 'typographyDefault'}>
          {title}
        </Markdown>
        <H5 mb="s" color={isDark ? 'white' : 'typographyDefault'}>
          {swatches[selectedSwatch]?.name}
        </H5>
        <Box mb={swatches.length <= swatchLength && 'default'}>
          <ColorDisplaySwatches
            swatches={swatches}
            selected={selectedSwatch}
            setSelected={selectSwatch}
            maxLength={swatchLength}
            gtmTags={gtmTags}
            isDark={isDark}
          />
        </Box>
        {ctaLink && (
          <CTA
            typeField={ctaType}
            linkField={ctaLink}
            icon="arrowRight"
            gtmTags={{
              'data-gtm-model': gtmTags.modelName,
              'data-gtm-body-style': gtmTags.bodyStyle,
              'data-gtm-title': 'explore all trims',
              'data-gtm-interaction-type': 'cta: click',
            }}
          />
        )}
      </Box>
      <Box />
    </Fade>
  );
};

ColorDisplay.propTypes = {
  params: PropTypes.shape({
    styleType: PropTypes.oneOf(['Short']),
    imageMaxWidth: PropTypes.oneOf([900, 1000, 1100, 1200, 1300]),
    imageAnimation: PropTypes.oneOf(['Fade', 'Slide']),
  }),
};

export default ColorDisplay;
