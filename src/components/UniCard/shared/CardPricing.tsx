import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PriceComponent from '../../PriceComponent';
import type { PricingProps } from '../types';
import Context from '../service/Context';

const priceComponentStyles = {
  priceStyles: {
    title: {
      size: 'extraSmall',
    },
    copy: {
      size: 'regular',
    },
  },
};

const Pricing = ({ pricing: pricingProps }: PricingProps) => {
  const { t } = useTranslation();
  const { pricing } = useContext(Context);

  const { modelPrice, isFetchingPrice, hasPriceError } = pricingProps ?? pricing ?? {};

  return (
    <PriceComponent
      allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
      errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
      hasError={hasPriceError}
      height={['auto', 'auto', undefined]}
      horizontalAlignment="center"
      isFetching={isFetchingPrice}
      msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
      priceComponentStyles={priceComponentStyles}
      prices={modelPrice}
      alignItems={undefined}
      saveAboveLabel={undefined}
      suppressDiscount={undefined}
    />
  );
};

export default Pricing;
