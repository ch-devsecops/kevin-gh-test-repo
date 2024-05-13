import React from 'react';
import NotImplemented from '../NotImplemented';
import { ENGINE_SITE_NAME, MARINE_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import CompareProductsDrawerUI from './CompareProductsDrawer';
import {
  getEngineMappedCatalogData,
  getMarineMappedCatalogData,
  getPspMappedCatalogData,
  getEngineModels,
  getPspModels,
} from './service/utils';
import useAppName from '../../utils/sitecoreContext/useAppName';
import { variant1, variant2, variant3 } from './service/constants';
import ConfigurationProvider from './service/ConfigurationProvider';

const CompareProductsDrawerMap = ({ fields, ...props }) => {
  const appName = useAppName();
  let productCatalogData = [];
  let getModels = f => f;
  let variant;

  switch (appName) {
    case ENGINE_SITE_NAME:
      productCatalogData = getEngineMappedCatalogData(fields?.data?.item?.series);
      getModels = getEngineModels;
      variant = variant1;
      break;
    case MARINE_SITE_NAME:
      productCatalogData = getMarineMappedCatalogData(fields?.data?.item?.outboards);
      getModels = getEngineModels;
      variant = variant2;
      break;
    case PSP_SITE_NAME:
      productCatalogData = getPspMappedCatalogData(fields?.data);
      getModels = getPspModels;
      variant = variant3;
      break;
    default:
      return <NotImplemented name="CompareProductsDrawer" />;
  }

  return (
    <ConfigurationProvider variant={variant}>
      <CompareProductsDrawerUI productCatalogData={productCatalogData} getModels={getModels} {...props} />
    </ConfigurationProvider>
  );
};

export default CompareProductsDrawerMap;
