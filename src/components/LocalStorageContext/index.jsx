import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import LocalStorageContext from './LocalStorageContext';
import LocalStorageUtils from '../../utils/Classes/LocalStorageUtils';
import { compareProducts, recentlyViewedProducts, isCompareDrawerOpen as isDrawerOpen } from '../../utils/constants';
import isSSR from '../../utils/isSSR';
import { removeLocalStorageKey, setLocalStorageKey } from './utils';

const LocalStorageProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toCompare, setToCompare] = useState([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  useEffect(() => {
    LocalStorageUtils.getArray(recentlyViewedProducts.storageKey)
      .then(productIds => setRecentlyViewed(productIds))
      .catch(() => {
        setRecentlyViewed([]);
      });

    LocalStorageUtils.getArray(compareProducts.storageKey)
      .then(productIds => setToCompare(productIds))
      .catch(() => {
        setToCompare([]);
      });

    setIsCompareDrawerOpen(!isSSR() ? localStorage.getItem(isDrawerOpen.storageKey) !== null : false);
  }, []);

  const setRecentlyViewedProducts = productId => {
    if (!productId) return;

    setRecentlyViewed(prevProductIds => {
      if (prevProductIds.includes(productId)) return prevProductIds;

      const updatedProductIds = [productId, ...prevProductIds].splice(0, recentlyViewedProducts.limit);

      if (LocalStorageUtils.isKeyInStorage(recentlyViewedProducts.storageKey))
        LocalStorageUtils.replaceArray(recentlyViewedProducts.storageKey, updatedProductIds);
      else LocalStorageUtils.createArray(recentlyViewedProducts.storageKey, updatedProductIds);

      return updatedProductIds;
    });
  };

  const setToCompareProducts = productId => {
    if (!productId) return;

    setToCompare(prevProductIds => {
      if (prevProductIds.includes(productId) || prevProductIds.length >= compareProducts.limit) return prevProductIds;

      const updatedProductIds = [...prevProductIds, productId];

      if (LocalStorageUtils.isKeyInStorage(compareProducts.storageKey))
        LocalStorageUtils.replaceArray(compareProducts.storageKey, updatedProductIds);
      else LocalStorageUtils.createArray(compareProducts.storageKey, updatedProductIds);

      setLocalStorageKey(isDrawerOpen.storageKey, setIsCompareDrawerOpen);

      return updatedProductIds;
    });
  };

  const removeFromCompareProducts = productId => {
    if (!productId) return;

    setToCompare(prevProductIds => {
      if (!prevProductIds.includes(productId)) return prevProductIds;

      const updatedProductIds = [...prevProductIds].filter(id => id !== productId);

      LocalStorageUtils.replaceArray(compareProducts.storageKey, updatedProductIds);

      if (updatedProductIds.length) setLocalStorageKey(isDrawerOpen.storageKey, setIsCompareDrawerOpen);
      else removeLocalStorageKey(isDrawerOpen.storageKey, setIsCompareDrawerOpen);

      return updatedProductIds;
    });
  };

  const replaceToCompareProducts = productIds => {
    if (!Array.isArray(productIds)) return;

    setToCompare(() => {
      if (LocalStorageUtils.isKeyInStorage(compareProducts.storageKey)) {
        LocalStorageUtils.replaceArray(compareProducts.storageKey, productIds);
      } else {
        LocalStorageUtils.createArray(compareProducts.storageKey, productIds);
      }

      return productIds;
    });
  };

  const toggleCompareDrawer = () => {
    if (isCompareDrawerOpen) {
      removeLocalStorageKey(isDrawerOpen.storageKey, setIsCompareDrawerOpen);
    } else {
      setLocalStorageKey(isDrawerOpen.storageKey, setIsCompareDrawerOpen);
    }
  };

  const deleteToCompareProducts = () => {
    LocalStorageUtils.deleteArray(compareProducts.storageKey)
      .then(() => {
        localStorage.removeItem(isDrawerOpen.storageKey);
        setToCompare([]);
        setIsCompareDrawerOpen(false);
      })
      .catch(() => {});
  };

  const state = useMemo(
    () => ({
      recentlyViewedProducts: recentlyViewed,
      isCompareDrawerOpen,
      toCompareProducts: toCompare,
      setRecentlyViewedProducts,
      setToCompareProducts,
      toggleCompareDrawer,
      removeFromCompareProducts,
      deleteToCompareProducts,
      replaceToCompareProducts,
    }),
    [recentlyViewed, toCompare, isCompareDrawerOpen],
  );

  return <LocalStorageContext.Provider value={state}>{children}</LocalStorageContext.Provider>;
};
LocalStorageProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LocalStorageProvider;
