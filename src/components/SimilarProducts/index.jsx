import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import SimilarProducts from './SimilarProductsUI';
import NotImplemented from '../NotImplemented';
import { PSP_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { variant1 } from './service/constants';

const SimilarRecentlyViewedMap = ({ fields, rendering, ...rest }) => {
  const appName = useAppName();

  if (!fields) return null;

  const mappedFields = fields?.data?.value;
  let relatedItems = [];
  let paymentOptions;
  let fetchFinancial;
  let variant;
  let vehicleType;
  let gtmTags;

  switch (appName) {
    case PSP_SITE_NAME:
      variant = variant1;
      fetchFinancial = false;
      paymentOptions = {
        paymentMethod: 'finance',
        paymentFrequency: 'weekly',
      };

      relatedItems = get(mappedFields, 'relatedTrims.items');
      vehicleType = mappedFields?.relatedTrims?.items?.[0]?.model?.year?.category?.vehicleType?.name;
      gtmTags = {
        gtmTitle: mappedFields.gtmTitle,
        gtmCategory: mappedFields.gtmCategory,
        gtmModelName: mappedFields.gtmModelName,
        gtmTrimName: mappedFields.gtmTrimName,
        gtmBodyStyle: mappedFields.gtmBodyStyle,
        gtmInteractionType: mappedFields.gtmInteractionType,
      };
      break;

    default:
      return <NotImplemented name="SimilarProducts" />;
  }

  return (
    <SimilarProducts
      componentName={rendering?.componentName}
      appNameConfig={{ variant, vehicleType, fetchFinancial, paymentOptions, ...rest }}
      relatedItems={relatedItems}
      gtmTags={gtmTags}
    />
  );
};

SimilarRecentlyViewedMap.propTypes = {
  fields: PropTypes.shape({}),
  rendering: PropTypes.shape({}),
};

export default SimilarRecentlyViewedMap;
