import { useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import LocalStorageContext from '../LocalStorageContext/LocalStorageContext';
import { getParamsFromUrl, updateSearchParams } from './utils';
import { MAX_COMPARE_ELEMENTS } from '../../utils/constants';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';

const useSyncUrlAndLocalStorage = (activeProducts, setProducts, urlProductParamName) => {
  const history = useHistory();
  const { toCompareProducts, setToCompareProducts, removeFromCompareProducts, replaceToCompareProducts } =
    useContext(LocalStorageContext);

  const onBackClick = () => {
    if (!isEditorActive()) history.goBack();
  };

  const onRemoveModel = id => {
    if (isEditorActive()) return;
    // sync URL and localStorage with component state
    if (Array.isArray(activeProducts) && activeProducts.length) {
      const update = activeProducts.filter(productId => productId !== id);
      updateSearchParams(urlProductParamName, history, update);
    }
    removeFromCompareProducts(id);
  };

  const onSelectModel = id => {
    if (isEditorActive()) return;
    // sync URL and localStorage with component state
    updateSearchParams(urlProductParamName, history, [...activeProducts, id]);
    setToCompareProducts(id);
  };

  const resetUrlAndLocalStorage = useCallback(ids => {
    if (isEditorActive()) return;
    updateSearchParams(urlProductParamName, history, ids.slice(0, MAX_COMPARE_ELEMENTS));
    replaceToCompareProducts(ids.slice(0, MAX_COMPARE_ELEMENTS));
  }, []);

  /**
   * First time load: Check if there are params set in the URL
   * and if so, use them to populate and compare the products.
   */
  useEffect(() => {
    /**
     * Check if there are params set in URL, if so, use them as they
     * have priority, otherwise, check if there are params in localStorage,
     * in case there are none, no operation is required.
     */
    const checkUrlAndLocalStorage = () => {
      const idsFromUrl = getParamsFromUrl(urlProductParamName);
      if (Array.isArray(idsFromUrl) && idsFromUrl.length) {
        setProducts(idsFromUrl.slice(0, MAX_COMPARE_ELEMENTS));
        if (JSON.stringify(idsFromUrl.slice(0, MAX_COMPARE_ELEMENTS)) !== JSON.stringify(toCompareProducts)) {
          replaceToCompareProducts(idsFromUrl.slice(0, MAX_COMPARE_ELEMENTS));
        }
      } else if (Array.isArray(toCompareProducts) && toCompareProducts.length) {
        setProducts(toCompareProducts);
        updateSearchParams(urlProductParamName, history, toCompareProducts);
      }
    };

    checkUrlAndLocalStorage();
  }, [safelyStringifyJSON(toCompareProducts)]);

  return { onRemoveModel, onSelectModel, onBackClick, resetUrlAndLocalStorage };
};

export default useSyncUrlAndLocalStorage;
