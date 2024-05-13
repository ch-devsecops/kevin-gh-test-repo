import React, { useContext } from 'react';
import { Box, Icon, Copy } from '@honda-canada/design-system-react';

import themeStyles from '../Accessories.styles';
import Context from '../service/Context';

const ErrorWrapper = themeStyles.apply(Box, 'ErrorWrapper');
const ErrorCopy = themeStyles.apply(Copy, 'ErrorCopy');

const ErrorState = () => {
  const { dictionary } = useContext(Context);

  return (
    <ErrorWrapper>
      <ErrorCopy size="regular" mx="default" data-testid="cy-accessory-card-wrapper-error">
        <Icon name="information" mb="-1px" /> {dictionary.unableToLoadLabel}
      </ErrorCopy>
    </ErrorWrapper>
  );
};

export default ErrorState;
