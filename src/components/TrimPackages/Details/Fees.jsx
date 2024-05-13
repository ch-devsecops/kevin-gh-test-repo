import React from 'react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useTranslation } from 'react-i18next';
import { Box, Copy } from '@honda-canada/design-system-react';

import themeStyles from './Details.styles';

const FeesWrapper = themeStyles.apply(Box, 'FeesWrapper');
const FeesLabel = themeStyles.apply(Copy, 'FeesLabel');

const Fees = ({ pricing, showSellingPrice, isDark, language }) => {
  const { t } = useTranslation();

  const freightAmount = pricing?.freightPdiCost && formatPrice(pricing?.freightPdiCost, language, 2);
  const feesAmount = pricing?.levyTotal && formatPrice(pricing?.levyTotal, language, 2);
  const totalFeeAmount =
    pricing?.freightPdiCost &&
    pricing?.levyTotal &&
    formatPrice((pricing?.freightPdiCost || 0) + (pricing?.levyTotal || 0), language, 2);

  const freightFeesLabel = showSellingPrice
    ? t('Shared.Common.includesFreightsAndFeesLabel', { freightAmount, feesAmount, totalFeeAmount })
    : t('Shared.Common.excludesFreightsAndFeesLabel', { freightAmount, feesAmount, totalFeeAmount });

  return (
    <FeesWrapper>
      <FeesLabel data-testid="freight-fees-label" size="extraSmall" isDark={isDark}>
        {freightFeesLabel}
      </FeesLabel>
    </FeesWrapper>
  );
};

export default Fees;
