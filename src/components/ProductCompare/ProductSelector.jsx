import React from 'react';
import PropTypes from 'prop-types';
import { nodeData, nodesData } from '@lukeaus/plain-tree';
import useAppName from '../../utils/sitecoreContext/useAppName';
import CascadingDropdown from './CascadingDropdown';
import NotImplemented from '../NotImplemented';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME, PRODUCT_COMPARE_ID_KEY } from '../../utils/constants';
import { variant1, variant3 } from '../ProductCard/utils';

const ENGINE_DROPDOWN_SCHEMA = [
  {
    name: 'series',
    label: 'Shared.Common.productCategoryLabel',
    ariaLabel: 'Shared.Common.productCategoryAria',
  },
  {
    name: 'name',
    label: 'Shared.Common.productName',
    ariaLabel: 'Shared.Common.productNameAria',
  },
];

const PSP_DROPDOWN_SCHEMA = [
  {
    name: 'category',
    label: 'Shared.CompareTrims.categoryLabel',
    ariaLabel: 'category-aria',
  },
  {
    name: 'year',
    label: 'Shared.CompareTrims.yearLabel',
    ariaLabel: 'year-aria',
  },
  {
    name: 'model',
    label: 'Shared.CompareTrims.modelLabel',
    ariaLabel: 'model-aria',
  },
  {
    name: 'transmission',
    label: 'Shared.CompareTrims.transmissionLabel',
    ariaLabel: 'transmission-aria',
  },
];

const getEngineFilterOptions = (activeProducts, dropdownTotalLevels) => (optionNodes, currentLevel) => {
  const options = nodesData(optionNodes);
  if (!Array.isArray(options) || !options.length) return [];

  if (currentLevel === dropdownTotalLevels) {
    // filter out options already in activeProducts in the last level of dropdown
    return options.filter(option => !activeProducts.includes(option?.[PRODUCT_COMPARE_ID_KEY]));
  }
  return options;
};

const getPspFilterOptions = (activeProducts, dropdownTotalLevels) => (optionNodes, currentLevel) => {
  const options = nodesData(optionNodes);
  if (!Array.isArray(options) || !options.length) return [];

  if (currentLevel === dropdownTotalLevels - 1) {
    // filter out models that only have one transmission and that one also has already been selected
    const availableOptionNodes = optionNodes.filter(optionNode => {
      const childrenNodes = optionNode?.children || [];
      // if still any transmissions left unselected, keep it in options
      return childrenNodes?.some(childNode => !activeProducts.includes(nodeData(childNode)?.[PRODUCT_COMPARE_ID_KEY]));
    });
    return nodesData(availableOptionNodes);
  }

  if (currentLevel === dropdownTotalLevels) {
    // filter out options already in activeProducts in the last level of dropdown
    return options.filter(option => !activeProducts.includes(option?.[PRODUCT_COMPARE_ID_KEY]));
  }
  return options;
};

const ProductSelector = ({ productCatalogDataTree, onProductSelected, activeProducts, indexId }) => {
  const appName = useAppName();

  let variant;
  let dropdownSchema = [];
  let filterOptions = f => f;
  switch (appName) {
    case ENGINE_SITE_NAME:
    case MARINE_SITE_NAME:
      variant = variant1;
      dropdownSchema = ENGINE_DROPDOWN_SCHEMA;
      filterOptions = getEngineFilterOptions(activeProducts, dropdownSchema.length);
      break;

    case PSP_SITE_NAME:
      dropdownSchema = PSP_DROPDOWN_SCHEMA;
      filterOptions = getPspFilterOptions(activeProducts, dropdownSchema.length);
      variant = variant3;
      break;

    default:
      return <NotImplemented name="Product Compare: Product Selector" />;
  }

  return (
    <CascadingDropdown
      optionsTree={productCatalogDataTree}
      dropdownSchema={dropdownSchema}
      onCompleteSelection={onProductSelected}
      filterOptions={filterOptions}
      nameId={indexId}
      variant={variant}
    />
  );
};

ProductSelector.defaultProps = {
  indexId: 0,
};

ProductSelector.propTypes = {
  productCatalogDataTree: PropTypes.shape({}),
  activeProducts: PropTypes.arrayOf(PropTypes.string),
  onProductSelected: PropTypes.func,
  indexId: PropTypes.number,
};

export default ProductSelector;
