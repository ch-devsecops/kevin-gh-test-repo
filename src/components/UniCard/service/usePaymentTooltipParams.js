import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useAppName, useLanguage } from '../../../utils/sitecoreContext';
import { ACURA_SITE_NAME, HONDA_SITE_NAME, LEASE_ANNUAL_KM_ALLOWANCE } from '../../../utils/constants';
import { TOOLTIP_ACURA_SITE, TOOLTIP_HONDA_SITE } from './constants';

const usePaymentTooltipParams = ({ initialParams, payment, isSellingPriceProvince }) => {
  const appName = useAppName();
  const language = useLanguage();

  const productLine = appName || '';
  const productLineInitial = appName[0].toUpperCase();
  let productLineSite;

  switch (appName) {
    case ACURA_SITE_NAME:
      productLineSite = TOOLTIP_ACURA_SITE;
      break;
    case HONDA_SITE_NAME:
      productLineSite = TOOLTIP_HONDA_SITE;
      break;
    default:
      productLineSite = '';
      break;
  }

  const totalObligation =
    payment?.preferredPaymentAmount > 0 &&
    formatPrice((payment?.numberOfTotalPayments || 0) * (payment?.preferredPaymentAmount || 0), language, 2);
  const lienRegistrationFee = formatPrice(
    payment?.levies?.find(item => item.key === 'ppsa_registration_fee')?.price || 0,
    language,
    2,
  );
  const lienRegAgentFee = formatPrice(
    payment?.levies?.find(item => item.key === 'registering_agent_fee')?.price || 0,
    language,
    2,
  );
  const extraKmCharge = formatPrice(
    payment?.leaseKilometers?.find(item => item.kmAllowance === LEASE_ANNUAL_KM_ALLOWANCE).additionalCostPerKm || 0,
    language,
    2,
  );

  return {
    ...initialParams,
    productLineString: productLine,
    productLineSite,
    productLineInitial,
    priceValue: isSellingPriceProvince ? payment?.netPaymentAmount : payment?.msrp,
    apr: payment?.apr,
    months: payment?.term,
    paymentAmount: formatPrice(payment?.preferredPaymentAmount, language, 2),
    numberOfPayments: payment?.numberOfTotalPayments,
    totalObligation,
    downPayment: formatPrice(payment?.downPaymentAmount, language, 2),
    offerEnds: payment?.offerPeriod?.endDate,
    lienRegistrationAgentFee: lienRegAgentFee,
    lienRegistrationFee,
    kmAllowance: payment?.leaseAnnualKmAllowance,
    extraKmCharge,
    freightPdi: formatPrice(payment?.freightAndPdi, language, 2),
  };
};

export default usePaymentTooltipParams;
