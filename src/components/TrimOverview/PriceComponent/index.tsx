import React from 'react';
import { useTranslation } from 'react-i18next';

import PriceComponent from '../../PriceComponent';
import { useSelectorTrimPayment } from '../../../core/reducers/modelTrimsPrice';

const priceComponentStyles = {
  priceStyles: {
    title: {
      size: 'extraSmall',
    },
    copy: {
      size: 'regular',
    },
  },
  errorStyles: {
    container: {
      width: '50%',
    },
  },
};

const PricingComponent = () => {
  const { t } = useTranslation();
  const { price, isFetchingPrice, hasPriceError } = useSelectorTrimPayment();

  return (
    <PriceComponent
      allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
      errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
      hasError={hasPriceError}
      height={['auto', 'auto', undefined]}
      horizontalAlignment="right"
      isFetching={isFetchingPrice}
      msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
      priceComponentStyles={priceComponentStyles}
      prices={price}
      alignItems={undefined}
      saveAboveLabel={undefined}
      suppressDiscount={undefined}
    />
  );
};

export default PricingComponent;
