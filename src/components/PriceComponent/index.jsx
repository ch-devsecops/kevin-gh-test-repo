import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { Box, Optional } from '@honda-canada/design-system-react';

import Error from './Error';
import Price from './Price';
import SaveLabel from './SaveLabel';
import usePriceFlagsForProvince from './utils';
import Loader from '../../utils/components/Loader';

import themeStyles, { priceComponentDefaultStyles } from './PriceComponent.styles';

const PricesContainer = themeStyles.apply(Box, 'PricesContainer');

const PriceComponent = ({
  allInPriceTooltipLabel,
  errorMessage,
  hasError,
  horizontalAlignment,
  alignItems,
  isFetching,
  msrpStartingFromTooltipLabel,
  priceComponentStyles,
  prices,
  saveAboveLabel,
  suppressDiscount,
  ...rest
}) => {
  const { t } = useTranslation();
  const priceStyles = merge(priceComponentDefaultStyles, priceComponentStyles);
  const { showSellingPrice } = usePriceFlagsForProvince();
  const PRICE_CONTAINER_HEIGHT = '70px';
  const hasPrice = !!(prices?.allInPrice?.value || prices?.msrpPrice?.value);

  if (isFetching) {
    return <Loader testId="loading" horizontalAlignment={horizontalAlignment} />;
  }

  if (hasError || !hasPrice) {
    return (
      <Error
        message={errorMessage || t('Shared.Common.priceErrorLabel')}
        horizontalAlignment={horizontalAlignment}
        errorStyles={priceStyles?.errorStyles}
      />
    );
  }

  const discountValue = prices?.discount?.priceDiscountAmount;
  const commonProps = {
    horizontalAlignment,
    priceStyles: priceStyles?.priceStyles,
    price: showSellingPrice ? prices?.allInPrice?.value : prices?.msrpPrice?.value,
    priceLabel: showSellingPrice ? prices?.allInPrice?.label : prices?.msrpPrice?.label,
    discountValue,
    suppressDiscount,
    discountPrice: showSellingPrice ? prices?.discount?.sellingPriceWithDiscount : prices?.discount?.msrpWithDiscount,
    toolTipLabel: showSellingPrice
      ? allInPriceTooltipLabel || t('Shared.Common.allInPriceTooltipLabel')
      : msrpStartingFromTooltipLabel || t('Shared.Common.msrpStartingFromTooltipLabel'),
  };

  return (
    <Box
      height={['auto', 'auto', PRICE_CONTAINER_HEIGHT]}
      alignItems={alignItems}
      textAlign={horizontalAlignment}
      {...rest}
    >
      <Optional when={discountValue && saveAboveLabel && !suppressDiscount}>
        <SaveLabel saveStyles={priceStyles?.saveStyles} value={discountValue} />
      </Optional>
      <PricesContainer horizontalAlignment={horizontalAlignment} {...priceStyles.pricesContainer}>
        <Price {...commonProps} />
      </PricesContainer>
    </Box>
  );
};

PriceComponent.defaultProps = {
  horizontalAlignment: 'center',
  priceComponentStyles: {},
};

PriceComponent.propTypes = {
  prices: PropTypes.shape({
    allInPrice: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
    msrpPrice: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  isFetching: PropTypes.bool,
  hasError: PropTypes.bool,
  horizontalAlignment: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)),
  priceComponentStyles: PropTypes.shape({
    pricesContainer: PropTypes.shape({}),
    priceStyles: PropTypes.shape({
      container: PropTypes.shape({}),
      title: PropTypes.shape({}),
      copy: PropTypes.shape({}),
    }),
    errorStyles: PropTypes.shape({
      container: PropTypes.shape({}),
      copy: PropTypes.shape({}),
    }),
  }),
};

export default PriceComponent;
