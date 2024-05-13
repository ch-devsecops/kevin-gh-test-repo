import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, Scale, Box, Fade } from '@honda-canada/design-system-react';

const Slide = styled(Box)(({ shouldSlide, theme }) => {
  if (!shouldSlide) {
    return {
      transform: 'translateX(0)',
    };
  }

  return {
    '@keyframes colorDisplaySlide': {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },
    animation: `colorDisplaySlide ${theme.transitionDuration.t3} ${theme.transitionTimingFunction.in}`,
  };
});

const PrimaryImages = ({
  images,
  activeImage,
  setIsAnimationActive,
  prevImage,
  setPrevImage,
  animation = 'slide',
  maximumWidth,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Scale
      shouldAnimate={hovered}
      startAt={1}
      endAt={1.03}
      transitionDuration="t6"
      height="100%"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      maxWidth={maximumWidth && `${maximumWidth}px`}
      mx="auto"
    >
      {images.map((image, i) => {
        const isActive = activeImage === i;
        const isPrev = prevImage === i;
        if (!isActive && !isPrev) return null;

        const imageProps = {
          ...image,
          key: image.src,
          position: 'absolute',
          top: 0,
          left: 0,
          onAnimationStart: () => {
            if (isActive) setIsAnimationActive(true);
          },
          onAnimationEnd: () => {
            if (isActive) {
              setPrevImage(activeImage);
              setIsAnimationActive(false);
            }
          },
          height: '100%',
          width: '100%',
          as: Image,
        };

        return animation === 'slide' ? (
          <Slide shouldSlide={isActive} zIndex={isActive ? 10 : 1} {...imageProps} />
        ) : (
          <Fade duration="t6" direction={isActive ? 'in' : 'out'} {...imageProps} />
        );
      })}
    </Scale>
  );
};

export default PrimaryImages;
