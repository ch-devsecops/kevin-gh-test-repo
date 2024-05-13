import React, { createContext, useContext, useMemo } from 'react';

const DataTreeContext = createContext(null);
const GlobalDataContext = createContext({});

// hook for exposing productCatalogDataTree
export const useProductCatalogDataTree = () => {
  const productCatalogDataTree = useContext(DataTreeContext);

  return productCatalogDataTree;
};

// hook for exposing other non-object global data
export const useProductCompareData = () => {
  const globalData = useContext(GlobalDataContext);

  return globalData;
};

const ProductCompareDataContextProvider = ({
  productCatalogDataTree,
  productLine,
  urlParamName,
  legalDisclaimer,
  viewDetailsButton,
  selectProductsToCompare,
  children,
}) => {
  const globalData = useMemo(
    () => ({
      productLine,
      legalDisclaimer,
      viewDetailsButton,
      selectProductsToCompare,
      urlParamName,
    }),
    [productLine, legalDisclaimer, viewDetailsButton, selectProductsToCompare, urlParamName],
  );
  return (
    <DataTreeContext.Provider value={productCatalogDataTree}>
      <GlobalDataContext.Provider value={globalData}>{children}</GlobalDataContext.Provider>
    </DataTreeContext.Provider>
  );
};

export default ProductCompareDataContextProvider;
