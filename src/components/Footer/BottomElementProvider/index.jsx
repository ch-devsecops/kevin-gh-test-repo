/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import BottomElementContext from './BottomElementContext';
import getElementHeight from './utils';
import isSSR from '../../../utils/isSSR';

const BottomElementProvider = ({ children }) => {
  if (isSSR()) return children;

  const [bottomElementHeight, setBottomElementHeight] = useState(0);
  const [inPage, setInPage] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [headerHiddenOnScroll, setHeaderHiddenOnScroll] = useState(false);
  const [shouldUpdateIntersectingElement, setShouldUpdateIntersectingElement] = useState(false);
  const ref = useRef();

  // TODO: move data used for Disclaimers into separate context / store
  const [payment, setPayment] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // combine refs to use inView and ref styles
  const setRef = useCallback(node => {
    ref.current = node;
    if (node) {
      setInPage(true);
    } else {
      setInPage(false);
    }
  }, []);

  // setup scroll event handler
  const handleScroll = useCallback(() => {
    if (inPage) {
      const isBottom = document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 1;
      setShouldUpdateIntersectingElement(isBottom && inPage);
    }
  }, [inPage]);

  // attach onscroll event handler
  window.addEventListener('scroll', handleScroll);

  // get element height dynamically
  useEffect(() => {
    if (ref.current) {
      const eleHeight = getElementHeight(ref.current);
      setBottomElementHeight(eleHeight);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref.current]);

  // isHidden changes between pages, this keeps the compare drawer's position consistent between them
  useEffect(() => {
    setShouldUpdateIntersectingElement(false);
  }, [isHidden]);

  const value = useMemo(
    () => ({
      bottomElementHeight,
      shouldUpdateIntersectingElement,
      isHidden,
      headerHiddenOnScroll,
      setIsHidden,
      setHeaderHiddenOnScroll,
      setRef,
      // TODO: move data used for Disclaimers into separate context / store
      payment,
      isFetching,
      setPayment,
      setIsFetching,
    }),
    [
      bottomElementHeight,
      shouldUpdateIntersectingElement,
      isHidden,
      headerHiddenOnScroll,
      payment,
      isFetching,
      setIsHidden,
      setRef,
    ],
  );

  return <BottomElementContext.Provider value={value}>{children}</BottomElementContext.Provider>;
};

BottomElementProvider.propTypes = {
  children: PropTypes.node,
};
export default BottomElementProvider;
