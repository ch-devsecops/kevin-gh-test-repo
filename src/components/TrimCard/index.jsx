import React from 'react';
import { PSP_SITE_NAME } from '../../utils/constants';
import { variant1, variant2 } from './constants';
import useAppName from '../../utils/sitecoreContext/useAppName';
import TrimCardUI from './TrimCard';

const getAddToCompareId = trim => trim?.detIdentifier?.value;

const getPspAddToCompareId = trim =>
  // add default transmission ID to product compare drawer
  trim?.defaultTransmission?.item?.fields?.detIdentifier?.value;

const TrimCardMap = props => {
  const appName = useAppName();
  switch (appName) {
    case PSP_SITE_NAME:
      return <TrimCardUI variant={variant1} getAddToCompareId={getPspAddToCompareId} {...props} />;
    default:
      return <TrimCardUI variant={variant2} getAddToCompareId={getAddToCompareId} {...props} />;
  }
};

export default TrimCardMap;
