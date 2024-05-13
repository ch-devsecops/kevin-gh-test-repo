import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Context from '../service/Context';
import PriceComponent from '../../PriceComponent';

const StripePriceComponent = pricing => {
  const { t } = useTranslation();
  const { hasError, isFetching } = useContext(Context);
  return (
    <PriceComponent
      prices={{
        allInPrice: {
          value: pricing?.sellingPrice,
          label: t('Shared.Common.sellingPriceLabel'),
        },
        msrpPrice: {
          value: pricing?.msrp,
          label: t('Shared.Common.msrpStartingFromLabel'),
        },
      }}
      isFetching={isFetching}
      hasError={hasError}
      horizontalAlignment="center"
      height={['auto', 'auto', undefined]}
      msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
      allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
      errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
    />
  );
};

export default StripePriceComponent;
