import React, { useMemo } from 'react';

import VehicleListFilters from './VehicleListFilters';
import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { createObjectFromProps, isEmpty } from '../../utils/object';
import { variant1, variant2 } from './service/constants';
import { mappedAutoFields } from './service/utils';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';

const VehicleListFiltersMap = ({ variant: propVariant, fields, rendering, params }) => {
  const appName = useAppName();
  let variant;
  let vehicleType;
  let mappedFields = fields?.data?.value || {};

  switch (appName) {
    case ACURA_SITE_NAME:
      variant = variant2;
      mappedFields = mappedAutoFields(mappedFields);
      break;

    case HONDA_SITE_NAME:
    default:
      variant = variant1;
      mappedFields = mappedAutoFields(mappedFields);
  }

  const appNameConfig = useMemo(
    () => ({ params, variant: propVariant ?? variant, vehicleType }),
    [propVariant, variant, vehicleType, safelyStringifyJSON(params)],
  );
  mappedFields = useMemo(() => createObjectFromProps(mappedFields), [safelyStringifyJSON(mappedFields)]);

  if (!fields || isEmpty(fields) || !Object.keys(mappedFields).length) {
    return null;
  }

  return (
    <VehicleListFilters appNameConfig={appNameConfig} componentName={rendering?.componentName} fields={mappedFields} />
  );
};

export default VehicleListFiltersMap;
