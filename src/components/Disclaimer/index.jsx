import React, { useContext } from 'react';
import { Wrapper, Markdown } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../utils/sitecoreContext';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';
import themeStyles from './Disclaimer.styles';

const Container = themeStyles.apply(Wrapper, 'Container');
const TrimSpecificDisclaimer = themeStyles.apply(Markdown, 'TrimSpecificDisclaimer');

const Disclaimer = ({ pricing, isSellingProvince }) => {
  const { payment } = useContext(BottomElementContext);
  const paymentCalculator = payment;
  const pricingData = pricing;
  const language = useLanguage();
  const { t } = useTranslation();

  const modelName = pricingData?.name;
  const modelYear = pricingData?.modelYear;

  if (!pricing || !payment) return null;

  const freightPdi = paymentCalculator?.freightPdi;
  const ppsaRegistrationFee = paymentCalculator?.levies?.ppsaRegistrationFee?.value;
  const registeringAgentFee = paymentCalculator?.levies?.registeringAgentFee?.value;
  const costOfBorrowing = paymentCalculator?.totalCostOfBorrowing;
  const totalAmount = pricingData?.pricing?.sellingPrice || pricingData?.pricing?.msrp;

  const disclaimerParams = {
    dateFrom: paymentCalculator?.ratePeriodStart,
    dateTo: paymentCalculator?.ratePeriodEnd,
    modelYear,
    modelName,
    sellingPrice: formatPrice(pricingData?.pricing?.sellingPrice, language, 2),
    msrp: formatPrice(pricingData?.pricing?.msrp, language, 2),
    freight: formatPrice((freightPdi || 0) + ppsaRegistrationFee || 0 + registeringAgentFee || 0, language, 2),
    registrationFee: formatPrice(paymentCalculator?.levies?.ppsaRegistrationFee?.value || 0, language, 2),
    registeringFee: formatPrice(paymentCalculator?.levies?.registeringAgentFee?.value || 0, language, 2),
    downpayment: formatPrice(paymentCalculator?.downPayment || 0, language, 2),
    financeApr: paymentCalculator?.apr,
    weeklyPaymentAmt: formatPrice(paymentCalculator?.total || 0, language, 2),
    months: paymentCalculator?.termOptionsDefault,
    weeklyPayments: paymentCalculator?.noOfWeeklyPayments,
    costOfBorrowing: formatPrice(costOfBorrowing, language, 2),
    totalObligation: formatPrice(totalAmount + costOfBorrowing, language, 2),
  };

  const dynamicDisclaimer = t('Shared.Common.paymentDisclaimerText', disclaimerParams);
  const staticDisclaimer = t('Shared.Common.paymentMsrpDisclaimerText', disclaimerParams);

  const disclaimerType = isSellingProvince ? 'cy-dynamic-disclaimer' : 'cy-static-disclaimer';
  const disclaimerContent = isSellingProvince ? dynamicDisclaimer : staticDisclaimer;

  return (
    <Container data-testid="cy-disclaimer-container">
      <TrimSpecificDisclaimer className="disclaimer" data-testid={disclaimerType}>
        {disclaimerContent}
      </TrimSpecificDisclaimer>
    </Container>
  );
};
export default Disclaimer;
