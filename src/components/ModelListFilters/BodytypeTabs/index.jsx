import React, { useContext } from 'react';
import { ModelFiltersContext } from '../../ModelFiltersContext';
import {
  getFilterableComponentsFromSitecoreRoute,
  getModelDataFromSitecoreRoute,
  getModelNamesFromModelData,
} from '../service/utils';
import BodyTypeTabsUI from './BodyTypeTabsUI';
import { useAppName, useRoute } from '../../../utils/sitecoreContext';
import { HONDA_SITE_NAME, PSP_SITE_NAME } from '../../../utils/constants';

const BodyTypeTabs = () => {
  const { allBodyTypes } = useContext(ModelFiltersContext) || {};
  const appName = useAppName();
  const route = useRoute();

  const modelData = getModelDataFromSitecoreRoute(route, 'ModelListFilters');
  const modelNames = getModelNamesFromModelData(modelData);
  // format modelName array to key value pairs
  const formattedModelName = modelNames?.map(item => ({ key: item, value: item }));

  let bodyTypes;
  let showFutureVehicle;
  let dispatchType;
  let hasReducedSpacing;

  switch (appName) {
    case HONDA_SITE_NAME:
      bodyTypes = allBodyTypes;
      showFutureVehicle = getFilterableComponentsFromSitecoreRoute(route, 'FutureVehicleCard');
      dispatchType = 'bodyType';
      hasReducedSpacing = true;
      break;
    case PSP_SITE_NAME:
      bodyTypes = formattedModelName;
      dispatchType = 'model';
      hasReducedSpacing = false;
      break;
    default:
      return null;
  }

  return (
    <BodyTypeTabsUI
      bodyTypes={bodyTypes}
      showFutureVehicle={showFutureVehicle}
      dispatchType={dispatchType}
      hasReducedSpacing={hasReducedSpacing}
    />
  );
};

export default BodyTypeTabs;
