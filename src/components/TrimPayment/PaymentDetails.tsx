import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Loader from '../../utils/components/Loader';
import Error from '../PriceComponent/Error';
import PriceComponent from '../PriceComponent';
import { getTrimInfo } from '../../core/reducers/inventoryVehicleDetails';
import { useSelectorTrimPayment } from '../../core/reducers/modelTrimsPrice';
import FinanceAndLeasePanel from './FinanceAndLeasePanel';
import isPaymentValid from './isPaymentValid';
import { paymentMethods, paymentFrequencies } from '../TrimUtils/constants';
import type { Payment, Price } from './types/payment.interfaces';

type PaymentOptions = {
  paymentFrequency: keyof typeof paymentFrequencies;
  paymentMethod: keyof typeof paymentMethods;
};

const priceComponentStyles = {
  priceStyles: {
    container: {
      mt: 'm',
    },
    title: {
      size: 'extraSmall',
    },
    copy: {
      size: 'small',
    },
  },
};

const errorComponentStyles = { container: { marginTop: '16px' }, copy: { size: 'extraSmall' } };

const PaymentDetails = () => {
  const { t } = useTranslation();

  const paymentOptions = useSelector(getTrimInfo)?.paymentOptions as PaymentOptions;
  const { paymentFrequency, paymentMethod } = paymentOptions ?? {};
  const data = useSelectorTrimPayment();

  const payment = data?.payment as Payment;
  const hasError = data?.hasPriceError as boolean;
  const isFetching = data?.isFetchingPrice as boolean;
  const price = data?.price as Price;

  const paymentData = {
    hasError,
    isFetching,
    payment,
  };

  const isValid = isPaymentValid(paymentMethod, payment, price);

  if (hasError || (!isFetching && !isValid)) {
    return (
      <Error
        message={t('Pages.Models.Exploration.contactLocalDealerLabel')}
        horizontalAlignment="center"
        verticalAlignment="center"
        errorStyles={errorComponentStyles}
      />
    );
  }

  if (isFetching || !isValid) {
    return <Loader testId="cy-loading-state" horizontalAlignment="center" />;
  }

  switch (paymentMethod) {
    case paymentMethods.finance:
    case paymentMethods.lease:
      return (
        <FinanceAndLeasePanel
          paymentData={paymentData}
          paymentFrequency={paymentFrequency}
          paymentMethod={paymentMethod}
        />
      );

    case paymentMethods.cash:
      return (
        <PriceComponent
          allInPriceTooltipLabel={t('Shared.Common.sellingPriceTooltipLabel')}
          errorMessage={t('Pages.Models.Exploration.contactLocalDealerLabel')}
          hasError={hasError}
          height={['auto', 'auto', undefined]}
          horizontalAlignment="center"
          isFetching={isFetching}
          msrpStartingFromTooltipLabel={t('Shared.Common.msrpStartingFromTooltipLabel')}
          priceComponentStyles={priceComponentStyles}
          prices={price}
          alignItems={undefined}
          saveAboveLabel={undefined}
          suppressDiscount={undefined}
        />
      );
    default:
      return null;
  }
};

export default PaymentDetails;
