import React from 'react';
import PropTypes from 'prop-types';
import isSSR from '../../utils/isSSR';

import ProductCompareContextProvider from './ProductCompareContextProvider';
import ProductCompareDataContextProvider from './ProductCompareDataContextProvider';
import MainContainer from './MainContainer';

const ProductCompareUI = ({
  productCatalogDataTree,
  productLine,
  legalDisclaimer,
  gtmTags,
  viewDetailsButton,
  selectProductsToCompare,
  urlParamName,
  ...rest
}) => {
  if (isSSR() || !productCatalogDataTree) return null;

  return (
    <ProductCompareContextProvider>
      <ProductCompareDataContextProvider
        productLine={productLine}
        legalDisclaimer={legalDisclaimer}
        urlParamName={urlParamName}
        productCatalogDataTree={productCatalogDataTree}
        viewDetailsButton={viewDetailsButton}
        selectProductsToCompare={selectProductsToCompare}
      >
        <MainContainer gtmTags={gtmTags} {...rest} />
      </ProductCompareDataContextProvider>
    </ProductCompareContextProvider>
  );
};

ProductCompareUI.propTypes = {
  productLine: PropTypes.string,
  legalDisclaimer: PropTypes.string,
  viewDetailsButton: PropTypes.string,
  urlParamName: PropTypes.string,
  selectProductsToCompare: PropTypes.string,
  productCatalogDataTree: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
  gtmTags: PropTypes.shape({
    'data-gtm-component-type': PropTypes.string,
    'data-gtm-interaction-type': PropTypes.string,
    'data-gtm-title': PropTypes.string,
  }),
};

export default ProductCompareUI;
