import usePrevious from '../../utils/hooks/usePrevious';

const AnimationController = ({ isActive, isReversing, children, inView, index }) => {
  const slideDirection = isReversing ? 'down' : 'up';
  const slideDistance = '180px';
  const prevIsReversing = usePrevious(isReversing);
  // When the user reverses scrolling direction, keep animations simple
  const simplifyAnimations = typeof prevIsReversing !== 'undefined' && isReversing !== prevIsReversing;

  if (simplifyAnimations) {
    // If scrolling down, ensure first item is visible (i.e. not animated)
    if (!isReversing && index === 0 && inView && isActive) {
      return children({
        shouldSlide: false,
        slideDistance: 0,
        shouldFade: false,
        initialOpacity: 1,
      });
    }

    // Simply fade in or out based on inView
    return children({
      shouldSlide: false,
      slideDistance: 0,
      shouldFade: true,
      fadeDirection: inView ? 'out' : 'in',
      initialOpacity: inView ? 1 : 0,
    });
  }

  // An active item should slide and fade in when inView
  if (isActive) {
    return children({
      shouldSlide: inView,
      slideDirection,
      slideDistance,
      slideIn: true,
      shouldFade: inView,
      fadeDirection: 'in',
      initialOpacity: 0,
      delay: 0.2,
      shouldAnimateBorders: (index === 1 && !isReversing) || (index === 0 && isReversing),
    });
  }

  // An inactive item should just fade out
  return children({
    shouldSlide: false,
    slideDirection,
    slideDistance,
    slideIn: false,
    shouldFade: true,
    fadeDirection: 'out',
    initialOpacity: 1,
    shouldAnimateBorders: false,
  });
};

export default AnimationController;
