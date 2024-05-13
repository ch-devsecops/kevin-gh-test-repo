import React, { useEffect, useRef, useState, useContext, useMemo, cloneElement } from 'react';

import { EqualHeightContext } from './context';
import safelyStringifyJSON from '../../safelyStringifyJSON';

const EqualHeightElement = props => {
  const { children, name, tag = 'div', placeholder = false, disable = false, inherit = false } = props;

  const {
    sizes = [],
    update = false,
    setTemporarySizes = () => null,
    setOriginalChildrenCount = () => null,
    setChildrenCount = () => null,
    animationSpeed = 0,
  } = useContext(EqualHeightContext);

  // States
  const [height, setHeight] = useState();

  // Refs to wrapper element
  const innerElement = useRef(null);

  // Calculate method
  const getHeight = () => {
    if (!innerElement.current || disable) {
      return;
    }
    const tempHeight = innerElement.current.style.getPropertyValue('height');
    innerElement.current.style.removeProperty('height');
    const newHeight = innerElement.current.offsetHeight;
    innerElement.current.style.setProperty('height', tempHeight);

    setTemporarySizes(values => [...values, { name, height: newHeight }]);

    if (!disable) {
      setChildrenCount(value => value + 1);
    }
  };

  // Init
  useEffect(() => {
    if (disable) {
      return;
    }

    // Report self to parent component (to calculate how many components exist)
    setOriginalChildrenCount(value => value + 1);
    return () => {
      setOriginalChildrenCount(value => value - 1);
    };
  }, [disable, placeholder]);

  // Call calculate method
  useEffect(() => {
    if (disable) {
      return;
    }

    getHeight();
  }, [update, disable, placeholder]);

  // Set sizes on elements in DOM
  useMemo(() => {
    if (disable) {
      return;
    }

    const elementIndex = sizes.findIndex(e => e.name === name);

    if (sizes?.[elementIndex]?.height) {
      setHeight(sizes[elementIndex].height);
    }
  }, [safelyStringifyJSON(sizes)]);

  // Styles for wrapper element
  const inlineStyles = {
    overflow: 'hidden',
    transitionProperty: 'height',
    display: 'block',
    height: `${height}px`,
    transitionDuration: animationSpeed === 0 ? '' : `${animationSpeed}s`,
  };

  if (!placeholder && !children) {
    return null;
  }

  if (disable) {
    return children;
  }

  return inherit
    ? cloneElement(children, {
        ref: innerElement,
        style: inlineStyles,
        ...children?.props,
      })
    : React.createElement(tag, { ref: innerElement, style: inlineStyles }, !placeholder && children);
};

export default EqualHeightElement;
