import React from 'react';
import NotImplemented from '../NotImplemented';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, PSP_SITE_NAME } from '../../utils/constants';
import useAppName from '../../utils/sitecoreContext/useAppName';
import TrimPackages from './TrimPackages';
import { PAYMENT_FREQUENCY, PAYMENT_METHOD, variant1, variant2 } from './service/constants';
import { mapPSPFields } from './utils';
import { isEmpty } from '../../utils/object';

const TrimPackagesMap = ({ variant: propVariant, fields, rendering, ...rest }) => {
  const appName = useAppName();

  if (!fields || isEmpty(fields) || !fields?.data?.value) {
    return null;
  }

  let paymentOptions = {};
  let mappedFields = fields || {};
  let variant;
  let vehicleType;
  let packageSelectorContainerStylesTop = ['70px', '70px', '84px'];

  switch (appName) {
    case ACURA_SITE_NAME:
      variant = variant1;
      paymentOptions = {
        paymentMethod: fields?.data?.value?.paymentMethod?.value?.toLowerCase(),
        paymentFrequency: fields?.data?.value?.paymentFrequency?.value?.toLowerCase() || 'weekly',
      };
      packageSelectorContainerStylesTop = '70px';
      break;
    case HONDA_SITE_NAME:
      variant = variant1;
      paymentOptions = {
        paymentMethod: fields?.data?.value?.paymentMethod?.value?.toLowerCase(),
        paymentFrequency: fields?.data?.value?.paymentFrequency?.value?.toLowerCase() || 'weekly',
      };
      break;
    case PSP_SITE_NAME:
      variant = variant2;
      mappedFields = mapPSPFields(mappedFields);
      vehicleType = mappedFields?.data?.value?.modelYear?.fields?.category?.vehicleType?.name;
      paymentOptions = {
        paymentMethod: PAYMENT_METHOD, // by default for psp || 'finance'
        paymentFrequency: PAYMENT_FREQUENCY, // by default for psp || 'weekly'
      };
      packageSelectorContainerStylesTop = ['70px', '70px', '75px'];
      break;
    default:
      return <NotImplemented name="TrimPackages" />;
  }

  return (
    <TrimPackages
      appNameConfig={{ ...rest, paymentOptions, packageSelectorContainerStylesTop }}
      componentName={rendering?.componentName}
      fields={mappedFields}
      paymentOptions={paymentOptions}
      variant={propVariant ?? variant}
      vehicleType={vehicleType}
    />
  );
};

export default TrimPackagesMap;
