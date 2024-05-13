import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import NotImplemented from '../NotImplemented';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import {
  getEngineMappedCatalogData,
  getMarineMappedCatalogData,
  getPspMappedCatalogData,
  getUrlParamName,
} from './utils';
import ProductCompareUI from '../ProductCompare';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { variant1, variant2, variant3 } from '../ProductCard/utils';

const CompareProductsMap = ({ fields, rendering, ...rest }) => {
  const appName = useAppName();
  const { t } = useTranslation();
  const urlParamName = getUrlParamName(appName);

  let legalDisclaimer = '';
  let sectionHeadingTitle = '';
  let goBackButton = '';
  let viewDetailsButton = '';
  let selectProductsToCompare = '';
  let productLine = appName;
  let productCatalogDataTree = null;
  let gtmTags = {
    'data-gtm-component-type': rendering?.componentName,
  };
  let variant;

  switch (appName) {
    case ENGINE_SITE_NAME:
      goBackButton = t('Shared.Common.goBackButton');
      viewDetailsButton = t('Shared.Common.viewDetailsButton');
      sectionHeadingTitle = t('Shared.Common.compareSectionHeading');
      selectProductsToCompare = t('Shared.Common.selectProductsToCompareLabel');
      productCatalogDataTree = getEngineMappedCatalogData(fields?.data?.item?.series);
      variant = variant1;
      break;

    case MARINE_SITE_NAME:
      sectionHeadingTitle = t('Shared.Common.compareSectionHeading');
      goBackButton = t('Shared.Common.goBackButton');
      viewDetailsButton = t('Shared.Common.viewDetailsButton');
      selectProductsToCompare = t('Shared.Common.selectProductsToCompareLabel');
      productCatalogDataTree = getMarineMappedCatalogData(fields?.data?.item?.outboards);
      gtmTags = Object.freeze({
        ...gtmTags,
        'data-gtm-interaction-type': 'cta: explore',
        'data-gtm-title': 'view details',
      });
      variant = variant2;
      break;

    case PSP_SITE_NAME: {
      productLine = fields?.data?.value?.productLine?.fields?.name;
      legalDisclaimer = fields?.data?.value?.legalDisclaimer?.value;
      sectionHeadingTitle = fields?.data?.value?.compareTrimsTitle?.value;
      goBackButton = t('Shared.CompareTrims.goBackButton');
      viewDetailsButton = t('Shared.CompareTrims.viewModelDetailsButton');
      selectProductsToCompare = t('Shared.CompareTrims.selectProductsToCompareLabel');
      const vehicleTypesWithCategories = fields?.data?.value?.productLine?.fields?.vehicleTypes;
      productCatalogDataTree = getPspMappedCatalogData(vehicleTypesWithCategories);
      gtmTags = Object.freeze({
        ...gtmTags,
        'data-gtm-interaction-type': 'cta: explore',
        'data-gtm-title': 'view details',
      });
      variant = variant3;
      break;
    }

    default:
      return <NotImplemented name="CompareProducts" />;
  }

  return (
    <ProductCompareUI
      productCatalogDataTree={productCatalogDataTree}
      productLine={productLine}
      legalDisclaimer={legalDisclaimer}
      sectionHeadingTitle={sectionHeadingTitle}
      goBackButton={goBackButton}
      viewDetailsButton={viewDetailsButton}
      selectProductsToCompare={selectProductsToCompare}
      urlParamName={urlParamName}
      {...rest}
      gtmTags={gtmTags}
      variant={variant}
    />
  );
};

CompareProductsMap.propTypes = {
  fields: PropTypes.shape({}),
  rendering: PropTypes.shape({
    componentName: PropTypes.string,
  }),
};

export default CompareProductsMap;
