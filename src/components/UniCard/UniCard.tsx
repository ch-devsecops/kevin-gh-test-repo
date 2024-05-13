import React, { useContext } from 'react';
import { Box } from '@honda-canada/design-system-react';

import ConfigurationProvider from './service/Provider';

import themeStyles from './styles/Card.styles';
import type { UniCardProps, UniCardUIProps } from './types';
import Context from './service/Context';

const CardContainer = themeStyles.apply(Box, 'ProductCardContainer');

const UniCardUI = ({ componentName, children }: UniCardProps) => {
  const { card } = useContext(Context) || {};

  return (
    <CardContainer
      onMouseEnter={card?.events?.onMouseEnter}
      onMouseLeave={card?.events?.onMouseLeave}
      backgroundColor={card?.styles?.backgroundColor}
      data-gtm-component-type={componentName}
    >
      {children}
    </CardContainer>
  );
};

const UniCard = ({ appNameConfig, ...restProps }: UniCardUIProps) => (
  <ConfigurationProvider appNameConfig={appNameConfig}>
    <UniCardUI {...restProps} />
  </ConfigurationProvider>
);

export default UniCard;
