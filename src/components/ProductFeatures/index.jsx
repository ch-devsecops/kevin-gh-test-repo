import React from 'react';
import PropTypes from 'prop-types';

import FeaturesProvider from '../ProductFeaturesProvider';
import ProductFeaturesContainer from './ProductFeaturesContainer';
import featureStrToArray from './utils';

const ProductFeatures = ({ trimId, gtmTags }) => {
  if (!trimId) {
    return null;
  }

  return (
    <FeaturesProvider trimId={trimId}>
      {({ features, isFetching }) => {
        if (!features || isFetching) return null;
        const featuresList = featureStrToArray(features);
        return <ProductFeaturesContainer features={featuresList} gtmTags={gtmTags} />;
      }}
    </FeaturesProvider>
  );
};

ProductFeatures.propTypes = {
  trimId: PropTypes.string.isRequired,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default ProductFeatures;
