/* eslint-disable react/display-name */
import React from 'react';
import { Fade, Slide } from '@honda-canada/design-system-react';
import { InView } from 'react-intersection-observer';
import TwoCardUpLayout from '../TwoCardUpLayout';
import ThreeCellLayout from '../ThreeCellLayout';
import FiveCellLayout from '../FiveCellLayout';

const withAnimations = BaseComponent =>
  function (baseProps) {
    return (
      <InView triggerOnce>
        {({ inView, ref }) => (
          <Slide ref={ref} shouldAnimate={inView} direction="up" distance="75px" duration="t4">
            <Fade shouldAnimate={inView} initialOpacity={0}>
              <BaseComponent {...baseProps} />
            </Fade>
          </Slide>
        )}
      </InView>
    );
  };

const getCustomLayout = name => {
  switch (name) {
    case 'TwoCardUpLayout':
      return withAnimations(TwoCardUpLayout);
    case 'ThreeCellLayout':
      // No need to add animation to ThreeCellLayout; it is always
      // rendered inside other components that are already animated.
      return ThreeCellLayout;
    case 'FiveCellLayout':
      return withAnimations(FiveCellLayout);
    case 'SixCellLayout':
      return withAnimations(ThreeCellLayout);
    default:
      return withAnimations(TwoCardUpLayout);
  }
};

const CustomLayoutFactory = ({ fields, rendering }) => {
  const LayoutComponent = getCustomLayout(rendering.componentName);

  return <LayoutComponent fields={fields} rendering={rendering} />;
};

export default CustomLayoutFactory;
