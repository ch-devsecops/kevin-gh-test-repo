import React from 'react';

import ProductCardUI from './ProductCard';
import { gtmEngineMap, gtmMarineMap, variant1, variant2, variant3 } from './utils';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME } from '../../utils/constants';
import useAppName from '../../utils/sitecoreContext/useAppName';

const ProductCardMap = props => {
  const appName = useAppName();
  const SIMILAR_RECENTLY_VIEWED_COMPONENT_NAME = 'SimilarRecentlyViewedProducts';

  const { fields, gtmTags } = props || {};

  let gtmProps;
  let variant;
  switch (appName) {
    case MARINE_SITE_NAME:
      gtmProps = gtmMarineMap(fields, gtmTags);
      variant = gtmTags?.componentName === SIMILAR_RECENTLY_VIEWED_COMPONENT_NAME ? variant3 : variant2;
      break;

    case ENGINE_SITE_NAME:
    default:
      gtmProps = gtmEngineMap(fields, gtmTags);
      variant = variant1;
      break;
  }

  return <ProductCardUI {...props} variant={variant} {...gtmProps} />;
};

export default ProductCardMap;
