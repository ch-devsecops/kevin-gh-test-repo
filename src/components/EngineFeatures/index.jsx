import React from 'react';
import PropTypes from 'prop-types';
import ProductFeatures from '../ProductFeatures';
import getValueByKey from '../../utils/getValueByKey';

const EngineFeatures = ({ fields, rendering }) => {
  if (!fields) return null;

  const gtmTags = {
    type: rendering?.componentName,
  };

  const trimId = getValueByKey(fields, 'model')[0]?.fields?.detIdentifier?.value;
  if (!trimId) return null;

  return <ProductFeatures trimId={trimId} gtmTags={gtmTags} />;
};

EngineFeatures.propTypes = {
  fields: PropTypes.shape({
    detIdentifier: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};

export default EngineFeatures;
