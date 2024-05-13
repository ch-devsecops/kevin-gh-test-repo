import React from 'react';
import PropTypes from 'prop-types';

import SpecificationsAccordion from './SpecificationsAccordion';
import SpecificationsTable from './SpecificationsTable';

import useAppName from '../../utils/sitecoreContext/useAppName';
import NotImplemented from '../NotImplemented';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { variant1, variant3 } from '../ProductCard/utils';

const ProductSpecifications = ({ selectedModels, isSticky }) => {
  const appName = useAppName();

  if (!Array.isArray(selectedModels) || !selectedModels.length) return null;

  let variant
  switch (appName) {
    case ENGINE_SITE_NAME:
    case MARINE_SITE_NAME:
      variant = variant1;
      return <SpecificationsTable selectedModels={selectedModels} isSticky={isSticky} />;
    case PSP_SITE_NAME:
      variant = variant3;
      return <SpecificationsAccordion selectedModels={selectedModels} variant={variant} />;
    default:
      return <NotImplemented name="Product Specifications Accordion/Table" />;
  }
};

ProductSpecifications.propTypes = {
  selectedModels: PropTypes.arrayOf(PropTypes.shape({})),
  isSticky: PropTypes.bool,
};

export default ProductSpecifications;
