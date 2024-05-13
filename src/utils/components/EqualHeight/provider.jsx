import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { EqualHeightProvider } from './context';
import safelyStringifyJSON from '../../safelyStringifyJSON';

const EqualHeight = props => {
  const { children, timeout = 200, animationSpeed = 0.25, updateOnChange = undefined } = props;

  // States
  const [sizes, setSizes] = useState([]);
  const [temporarySizes, setTemporarySizes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [originalChildrenCount, setOriginalChildrenCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  const handleUpdate = useCallback(() => setUpdate(value => !value), []);

  // Observe [resize, orientationchange] event
  useEffect(() => {
    let resizeTimer;
    let orientationChangeTimer;
    const browser = typeof window === 'object' && typeof window.document === 'object';

    if (browser) {
      window.addEventListener(
        'resize',
        timeout
          ? () => {
              clearTimeout(resizeTimer);
              resizeTimer = window.setTimeout(handleUpdate, timeout);
            }
          : handleUpdate,
      );

      window.addEventListener(
        'orientationchange',
        timeout
          ? () => {
              clearTimeout(orientationChangeTimer);
              orientationChangeTimer = window.setTimeout(handleUpdate, timeout);
            }
          : handleUpdate,
      );

      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('orientationchange', handleUpdate);
      };
    }
  }, []);

  // Force calculate heights
  // Force calculate height when children count changed
  useMemo(() => {
    handleUpdate();
  }, [forceUpdate, originalChildrenCount, updateOnChange]);

  // Choose only highest heights when all children calculated
  // Set right sizes
  // Reset temp values
  useMemo(() => {
    // statement (<= instead ===) in case when new children will be add
    if (originalChildrenCount <= childrenCount) {
      let filteredSizes = [];

      temporarySizes.forEach(filteredSize => {
        const { name } = filteredSize;
        const { height } = filteredSize;
        const elementIndex = filteredSizes.findIndex(e => e.name === name);
        if (elementIndex > -1) {
          const savedHeight = filteredSizes[elementIndex].height;
          if (savedHeight < height) {
            filteredSizes[elementIndex].height = height;
          }
        } else {
          filteredSizes = [
            ...filteredSizes,
            {
              name,
              height,
            },
          ];
        }
      });
      setSizes(filteredSizes);

      // Reset
      setTemporarySizes([]);
      setChildrenCount(0);
    }
  }, [childrenCount]);

  const contextValue = useMemo(
    () => ({
      sizes,
      temporarySizes,
      update,
      animationSpeed,
      forceUpdate,
      originalChildrenCount,
      childrenCount,
      setTemporarySizes,
      setOriginalChildrenCount,
      setChildrenCount,
      setForceUpdate,
      updateOnChange,
    }),
    [
      safelyStringifyJSON(sizes),
      safelyStringifyJSON(temporarySizes),
      update,
      forceUpdate,
      originalChildrenCount,
      childrenCount,
    ],
  );
  return <EqualHeightProvider value={contextValue}>{children}</EqualHeightProvider>;
};

export default EqualHeight;
