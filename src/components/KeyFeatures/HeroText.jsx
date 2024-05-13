import React from 'react';
import { Fade, Slide, H2, Copy } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledCopy = styled(Copy)(
  css({
    a: {
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'bold',
      pointerEvents: 'auto',
    },
  }),
);

const Hero = ({
  title,
  bodyText,
  shouldSlide,
  slideDirection,
  slideDistance,
  slideIn,
  shouldFade,
  fadeDirection,
  initialOpacity,
  delay,
  isDark,
  isActive,
}) => (
  <>
    <Slide
      shouldAnimate={shouldSlide}
      direction={slideDirection}
      distance={slideDistance}
      delay={delay && `${delay}s`}
      slideIn={slideIn}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      <Fade
        shouldAnimate={shouldFade}
        direction={fadeDirection}
        initialOpacity={initialOpacity}
        delay={delay && `${delay}s`}
        pointerEvents={isActive ? 'auto' : 'none'}
      >
        <H2 style={{ textTransform: 'none' }} color={isDark ? 'white' : 'black'} pointerEvents="auto">
          {title}
        </H2>
      </Fade>
    </Slide>
    <Slide
      shouldAnimate={shouldSlide}
      direction={slideDirection}
      distance={slideDistance}
      delay={delay && `${delay + 0.2}s`}
      slideIn={slideIn}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      <Fade
        shouldAnimate={shouldFade}
        direction={fadeDirection}
        initialOpacity={initialOpacity}
        delay={delay && `${delay + 0.2}s`}
        pointerEvents={isActive && 'auto'}
      >
        <StyledCopy fontSize={['14px', '16px']} lineHeight={['22px', '26px']} mt="m" color={isDark ? 'white' : 'black'}>
          {bodyText}
        </StyledCopy>
      </Fade>
    </Slide>
  </>
);

export default Hero;
