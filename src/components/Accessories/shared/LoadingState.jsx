import React from 'react';
import { Box } from '@honda-canada/design-system-react';

import themeStyles from '../Accessories.styles';
import Loader from '../../../utils/components/Loader';

const LoaderWrapper = themeStyles.apply(Box, 'LoaderWrapper');

const LoadingState = () => (
  <LoaderWrapper>
    <Loader
      horizontalAlignment="center"
      loaderStyles={{ styles: { height: ['35px', '35px', '45px'], width: ['35px', '35px', '45px'] } }}
    />
  </LoaderWrapper>
);

export default LoadingState;
