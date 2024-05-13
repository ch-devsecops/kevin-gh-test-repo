import React from 'react';
import { variant2 } from './constants';
import { useAppName } from '../../utils/sitecoreContext';
import { PSP_SITE_NAME, HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import AcuraZindexWorkaround from '../../utils/AcuraZindexWorkaround';
import HondaZindexWorkaround from '../../utils/HondaZindexWorkaround';
import PspZindexWorkaround from '../../utils/PspZindexWorkaround';
import HondaCssOverride from '../../utils/HondaCssOverride';

export const getModelNavPageBodyStyle = (variant, defaultModelYear, vehicleType) => {
  let bodyStyle = vehicleType;

  switch (variant) {
    case variant2:
      bodyStyle = defaultModelYear
        ? defaultModelYear.defaultTrim?.fields?.bodyType?.item
            ?.map(item => item.name)
            ?.toString()
            ?.toLowerCase()
        : '';
      break;
    default:
      break;
  }
  return {
    bodyStyle,
  };
};

export const useZindexWorkaround = () => {
  const appName = useAppName();

  switch (appName) {
    case ACURA_SITE_NAME:
      return <AcuraZindexWorkaround />;
    case HONDA_SITE_NAME:
      return (
        <>
          <HondaCssOverride />
          <HondaZindexWorkaround />
        </>
      );
    case PSP_SITE_NAME:
      return <PspZindexWorkaround />;
    default:
      break;
  }
};

export const useOffersQueryParam = param => {
  const appName = useAppName();
  let queryParam = '';

  switch (appName) {
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
      queryParam = param;
      break;

    case PSP_SITE_NAME:
      break;
    default:
      break;
  }
  return {
    queryParam,
  };
};
