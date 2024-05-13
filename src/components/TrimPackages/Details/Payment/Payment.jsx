import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserLocationContext } from '@honda-canada/user-location';
import { Copy } from '@honda-canada/design-system-react';
import BottomElementContext from '../../../Footer/BottomElementProvider/BottomElementContext';
import { useTrimPayment } from '../../../../apiHooks';
import { ACURA_SITE_NAME } from '../../../../utils/constants';
import { PaymentFrequencyLabel, PaymentMethodLabel } from '../../../../utils/financeUtils';
import PaymentDetails from './PaymentDetails';
import trimPaymentFormatter from './utils';

const PaymentUI = ({
  trim,
  paymentOptions,
  language,
  isDark,
  showInformationalApr,
  isSellingPriceProvince,
  appName,
  vehicleType,
  showPaymentInfoTooltip,
  showDisclaimerAnchor,
}) => {
  const { t } = useTranslation();
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  const { setPayment, setIsFetching } = useContext(BottomElementContext);
  const { payment, isFetching } = useTrimPayment(
    trim,
    paymentOptions,
    provinceCode,
    data => trimPaymentFormatter(appName, data, paymentOptions, showInformationalApr, language),
    true,
    vehicleType,
    isSellingPriceProvince,
    setPayment,
    setIsFetching,
  );
  const productLine = appName;
  const productLineInitial = appName[0].toUpperCase();
  const productLineSite = appName === ACURA_SITE_NAME ? 'acura.ca' : 'honda.ca';
  const paymentMethodLabel = PaymentMethodLabel(paymentOptions.paymentMethod, true);
  const paymentFrequencyLabel = PaymentFrequencyLabel(paymentOptions.paymentFrequency, false);

  if (!payment || !trim || isFetching) return null;
  if (trim.pricing?.hasError) {
    return <Copy color={isDark ? 'white' : undefined}>{t('Shared.Common.priceErrorLabel')}</Copy>;
  }

  const paymentTooltipParams = {
    productLineString: productLine,
    paymentMethod: paymentMethodLabel,
    paymentFrequency: paymentFrequencyLabel,
    productLineSite,
    productLineInitial,
    year: trim?.modelYear,
    model: trim?.modelName,
    trim: trim.name,
    priceValue: isSellingPriceProvince ? payment?.netPaymentAmount : payment?.msrp,
    apr: payment?.apr,
    months: payment?.term,
    paymentAmount: payment?.paymentAmount,
    numberOfPayments: payment?.numberOfPayments,
    totalObligation: payment?.totalObligation,
    downPayment: payment?.downPayment,
    offerEnds: payment?.offerEnds,
    lienRegistrationAgentFee: payment?.lienRegAgentFee,
    lienRegistrationFee: payment?.lienRegistrationFee,
    kmAllowance: payment?.kmAllowance,
    extraKmCharge: payment?.extraKmCharge,
    freightPdi: payment?.freightPdi,
  };
  const paymentTooltip = t('Shared.Common.paymentTooltipLabel', paymentTooltipParams);

  return (
    <PaymentDetails
      paymentDetailsObj={payment}
      paymentTooltip={paymentTooltip}
      showPaymentInfoTooltip={showPaymentInfoTooltip}
      showDisclaimerAnchor={showDisclaimerAnchor}
      isDark={isDark}
      appName={appName}
    />
  );
};

export default PaymentUI;
