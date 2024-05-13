import React, { useState, useRef } from 'react';
import { useMediaQueries, Fade } from '@honda-canada/design-system-react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import AnimationController from './AnimationController';
import HeroText from './HeroText';
import Features from './Features';
import Borders from './Borders';

export const RowContainer = ({ children, isFirst, isLast, stickyThreshold }) => {
  const [fadeDirection, setFadeDirection] = useState(null);
  const ref = useRef();

  // fade out the last row when it unsticks, so it doesn't scroll behind the image
  useScrollPosition(
    ({ currPos, prevPos }) => {
      if (!isLast) return;
      if (prevPos.y === stickyThreshold && currPos.y < stickyThreshold) {
        setFadeDirection('out');
      }
      if (prevPos.y < stickyThreshold && currPos.y === stickyThreshold) {
        setFadeDirection('in');
      }
    },
    [],
    ref,
  );

  return (
    <Fade
      shouldAnimate={!!fadeDirection}
      direction={fadeDirection}
      duration="0.1s"
      ref={ref}
      width="100%"
      height={`calc(100vh - ${stickyThreshold}px)`}
      mt={isFirst ? 'zero' : `${stickyThreshold / 2}px`}
      textAlign="center"
      maxWidth={isFirst ? '842px' : '1166px'}
      mx="auto"
      px={[isFirst ? 'default' : 'xl', isFirst ? 'default' : 0]}
      position="relative"
      display={['flex', isFirst ? 'block' : 'flex']}
      justifyContent="center"
      flexDirection={['column', 'row']}
    >
      {children}
    </Fade>
  );
};

const Row = ({ isActive, isReversing, inView, index, title, bodyText, items, isLast, stickyThreshold, isDark }) => {
  const { isSmallDesktop, isDesktop } = useMediaQueries();

  return (
    <AnimationController isActive={isActive} isReversing={isReversing} inView={inView} index={index}>
      {props => {
        if (index === 0) {
          return (
            <RowContainer stickyThreshold={stickyThreshold} isFirst>
              <HeroText title={title} bodyText={bodyText} {...props} isDark={isDark} />
            </RowContainer>
          );
        }
        return (
          <RowContainer isLast={isLast} stickyThreshold={stickyThreshold}>
            <Features {...props} items={items} isDark={isDark} />
            {isActive && !isLast && (isSmallDesktop || isDesktop) && (
              <Borders shouldAnimate={props.shouldAnimateBorders} isReversing={isReversing} />
            )}
          </RowContainer>
        );
      }}
    </AnimationController>
  );
};

export default Row;
