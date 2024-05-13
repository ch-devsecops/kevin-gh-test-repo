import React from 'react';
import { Box, Copy, H5, useMediaQueries } from '@honda-canada/design-system-react';

import PriceComponent from '../PriceComponent';
import { usePricesConfiguration } from '../../utils/financeUtils';
import themeStyles from './ProductConfiguration.styles';

const Container = themeStyles.apply(Box, 'Container');
const CopyContainer = themeStyles.apply(Box, 'CopyContainer');
const Header = themeStyles.apply(H5, 'Header');
const PriceComponentWrapper = themeStyles.apply(Box, 'PriceComponentWrapper');

const priceComponentStyles = {
  saveStyles: {
    container: {
      mx: [0, 0, 0],
    },
  },
};

const ProductConfigurationCard = ({ configuration, productPrice }) => {
  const { isMobile } = useMediaQueries();
  const name = configuration?.configurationName?.value;
  const taglineValue = configuration?.tagline?.value;
  const configurationId = configuration?.detIdentifier?.value;
  const getPrices = usePricesConfiguration();
  const { modelConfiguration, isFetching, hasError } = productPrice;
  const prices = getPrices(modelConfiguration, configurationId);

  return (
    <Container data-testid="configuration-card">
      <CopyContainer isMobile={isMobile}>
        <Header data-testid="configuration-name">{name}</Header>
        <Copy size="regular" data-testid="configuration-tagline">
          {taglineValue}
        </Copy>
      </CopyContainer>
      <PriceComponentWrapper hasDiscount={!!prices?.discount?.priceDiscountAmount}>
        <PriceComponent
          prices={prices}
          horizontalAlignment={['left', 'left', 'right']}
          isFetching={isFetching}
          hasError={hasError}
          priceComponentStyles={priceComponentStyles}
          display="flex"
          saveAboveLabel
          alignItems={['flex-start', 'flex-start', 'flex-end']}
        />
      </PriceComponentWrapper>
    </Container>
  );
};

export default ProductConfigurationCard;
