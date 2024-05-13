import React from 'react';
import PropTypes from 'prop-types';
import ProductSpecifications from '../ProductSpecifications';
import getValueByKey from '../../utils/getValueByKey';

const EngineSpecifications = ({ fields, rendering }) => {
  if (!fields) return null;

  const gtmTags = {
    type: rendering?.componentName,
  };

  const trimId = getValueByKey(fields, 'model')[0]?.fields?.detIdentifier?.value;
  if (!trimId) return null;

  return <ProductSpecifications trimId={[trimId]} gtmTags={gtmTags} />;
};

EngineSpecifications.propTypes = {
  fields: PropTypes.shape({
    detIdentifier: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default EngineSpecifications;
