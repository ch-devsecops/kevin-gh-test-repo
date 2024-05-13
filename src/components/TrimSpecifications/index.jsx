import React from 'react';

import TrimSpecifications from './TrimSpecifications';
import NotImplemented from '../NotImplemented';
import { variant1, variant2, variant3 } from './service/constants';

import { HONDA_SITE_NAME, ACURA_SITE_NAME, MC_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import { useAppName } from '../../utils/sitecoreContext';
import { isEmpty } from '../../utils/object';
import { mapPSPFields } from './service/utils';

const TrimSpecificationsMap = ({ tabsParams = {}, variant: propVariant, fields, rendering }) => {
  const appName = useAppName();

  if (!fields || isEmpty(fields) || !fields?.data?.value) {
    return null;
  }
  let variant;
  let vehicleType;
  let mappedFields = fields?.data?.value || {};
  const paymentOptions = {
    paymentMethod: fields?.data?.value?.paymentMethod?.value?.toLowerCase() || 'finance',
    paymentFrequency: fields?.data?.value?.paymentFrequency?.value?.toLowerCase() || 'weekly',
  };

  switch (appName) {
    case ACURA_SITE_NAME:
      variant = variant2;
      break;
    case HONDA_SITE_NAME:
      variant = variant1;
      break;
    case PSP_SITE_NAME:
    case MC_SITE_NAME:
      mappedFields = mapPSPFields(mappedFields);
      vehicleType = mappedFields?.modelYear?.fields?.category?.vehicleType?.name;
      variant = variant3;
      break;
    default:
      return <NotImplemented name="TrimSpecification" />;
  }

  return (
    <TrimSpecifications
      appNameConfig={{ paymentOptions }}
      componentName={rendering?.componentName}
      fields={mappedFields}
      tabsParams={tabsParams}
      variant={propVariant ?? variant}
      vehicleType={vehicleType}
    />
  );
};

export default TrimSpecificationsMap;
