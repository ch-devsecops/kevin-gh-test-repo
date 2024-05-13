import React from 'react';

import Accessories from './Accessories';
import NotImplemented from '../NotImplemented';

import { HONDA_SITE_NAME, ACURA_SITE_NAME, MC_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { createObjectFromProps, isEmpty } from '../../utils/object';
import { mapPSPFields } from './service/utils';
import { variant1, variant2, variant3 } from './service/constants';

const AccessoriesMap = ({ variant: propVariant, fields, rendering }) => {
  const appName = useAppName();

  if (!fields || isEmpty(fields) || !fields?.data?.value) {
    return null;
  }

  let variant;
  let vehicleType;
  let mappedFields = fields?.data?.value || {};
  switch (appName) {
    case ACURA_SITE_NAME:
      variant = variant1;
      break;
    case HONDA_SITE_NAME:
      variant = variant3;
      break;
    case PSP_SITE_NAME:
    case MC_SITE_NAME:
      variant = variant2;
      mappedFields = mapPSPFields(mappedFields);
      vehicleType = mappedFields?.modelYear?.fields?.category?.vehicleType?.name;
      break;
    default:
      return <NotImplemented name={rendering?.componentName} />;
  }

  return (
    <Accessories
      fields={createObjectFromProps(mappedFields)}
      componentName={rendering?.componentName}
      variant={propVariant ?? variant}
      vehicleType={vehicleType}
    />
  );
};

export default AccessoriesMap;
