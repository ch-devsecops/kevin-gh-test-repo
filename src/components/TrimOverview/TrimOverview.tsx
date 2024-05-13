import React, { useEffect, useState } from 'react';
import { Row, Box } from '@honda-canada/design-system-react';
import { useSelector } from 'react-redux';

import PriceComponent from './PriceComponent';
import ConfigurationProvider from './service/Provider';
import type { TrimOverviewProps, TrimOverviewUIProps } from './types';
import TrimCarousel from './TrimCarousel';
import { getTrimDetails } from '../../core/reducers/inventoryVehicleDetails';
import TrimDetails from './TrimDetails';
import BackButton from './BackButton';
import themeStyles from './TrimOverview.styles';

const TrimInfoWrapper = themeStyles.apply(Row, 'TrimInfoWrapper');

export const TrimOverviewUI = ({ componentName, fields }: TrimOverviewUIProps) => {
  const { transmissionKey } = useSelector(getTrimDetails);
  const [backUrl, setBackUrl] = useState(fields?.backStepBaseUrl?.item?.href);
  const backText = fields?.backStepBaseUrl?.item?.text;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const modelYear = searchParams.get('modelYear');
    const modelKey = searchParams.get('modelKey');

    const paramsToKeep = new URLSearchParams();
    if (modelYear) paramsToKeep.append('modelYear', modelYear);
    if (modelKey) paramsToKeep.append('modelKey', modelKey);

    if (paramsToKeep.toString()) {
      setBackUrl((currentBackUrl: string) => `${currentBackUrl}?${paramsToKeep.toString()}`);
    }
  }, []);

  const backButtonField = {
    text: backText,
    href: backUrl,
  };

  return (
    <Box data-component-name={componentName} data-testid="cy-trim-overview">
      <BackButton backStepUrlField={backButtonField} />
      <TrimInfoWrapper>
        <TrimDetails transmissionKey={transmissionKey} models={fields?.catalog?.models} />
        <PriceComponent />
      </TrimInfoWrapper>
      <TrimCarousel transmissionKey={transmissionKey} models={fields?.catalog?.models} />
    </Box>
  );
};

const TrimOverview = ({ appNameConfig, ...restProps }: TrimOverviewProps) => (
  <ConfigurationProvider appNameConfig={appNameConfig}>
    <TrimOverviewUI {...restProps} />
  </ConfigurationProvider>
);

export default TrimOverview;
