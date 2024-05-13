import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useTranslation } from 'react-i18next';
import { Box, Copy, Optional } from '@honda-canada/design-system-react';
import InfoModal from '../../utils/components/InfoModal';
import { PaymentFrequencyLabel, PaymentMethodLabel } from '../../utils/financeUtils';
import { ACURA_SITE_NAME } from '../../utils/constants';
import themeStyles from './TrimCard.styles';

const PaymentDetailsContainer = themeStyles.apply(Box, 'PaymentDetailsContainer');
const PaymentDetailsContent = themeStyles.apply(Box, 'PaymentDetailsContent');

const StyledCopy = styled(Copy)(({ isDark, isNumber, columnsNum, paymentDetailStyles }) =>
  css({
    marginRight: 'xxs',
    lineHeight: '22px',
    textAlign: 'center',
    fontFamily: isNumber ? 'bold' : 'default',
    fontSize: isNumber ? paymentDetailStyles.value : paymentDetailStyles.label,
    whiteSpace: isNumber && 'nowrap',
    // this is to avoid overlapping of the text when the viewport is in between theme breakpoints
    '@media screen and (min-width: 992px) and (max-width: 1239px) {': {
      fontSize: columnsNum > 2 && isNumber && '15px',
    },
    color: isDark ? 'white' : undefined,
  }),
);

const PaymentDetails = ({
  isDark,
  payment,
  isFetching,
  trim,
  paymentOptions,
  isSellingPriceProvince,
  appName,
  showInfoModal,
  setShowInfoModal,
  showPaymentInfoTooltip,
  showDisclaimerAnchor,
  paymentDetailStyles,
}) => {
  const { t } = useTranslation();
  const columnWidth = payment?.informationalApr ? 100 / 3 : 100 / 2;
  const productLine = appName;
  const productLineInitial = appName[0].toUpperCase();
  const productLineSite = appName === ACURA_SITE_NAME ? 'acura.ca' : 'honda.ca';
  const paymentMethodLabel = PaymentMethodLabel(paymentOptions?.paymentMethod, true);
  const paymentFrequencyLabel = PaymentFrequencyLabel(paymentOptions?.paymentFrequency, false);
  const paymentTooltipParams = {
    productLineString: productLine,
    paymentMethod: paymentMethodLabel,
    paymentFrequency: paymentFrequencyLabel,
    productLineSite,
    productLineInitial,
    year: trim?.modelYear,
    model: trim?.modelName,
    trim: trim?.name,
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
    <PaymentDetailsContainer data-testid="cy-payment-details">
      {!isFetching && payment?.amount && (
        <PaymentDetailsContent>
          <Box display="table" alignSelf="flex-end" width={`${columnWidth}%`}>
            <StyledCopy paymentDetailStyles={paymentDetailStyles} data-testid="cy-frequency-label">
              {payment.termLabel}
            </StyledCopy>
            <Box display="flex" justifyContent="center" data-testid="cy-value-and-disclaimer">
              <StyledCopy
                paymentDetailStyles={paymentDetailStyles}
                data-testid="cy-frequency-value"
                isNumber
                columnsNum={payment.informationalApr ? '3' : '2'}
              >
                {payment.amount}
              </StyledCopy>
              <Optional when={showPaymentInfoTooltip}>
                <InfoModal
                  showModal={showInfoModal}
                  setShowModal={setShowInfoModal}
                  content={paymentTooltip}
                  isDark={isDark}
                />
              </Optional>
              <Optional when={showDisclaimerAnchor}>*</Optional>
            </Box>
          </Box>
          <Box ml="xxs" alignSelf="flex-end" width={`${columnWidth}%`}>
            <Box ml="xxs" height="100%">
              <Box>
                <StyledCopy paymentDetailStyles={paymentDetailStyles} data-testid="cy-term-label">
                  {t('Shared.Common.termByMonthLabel')}
                </StyledCopy>
              </Box>
              <Box>
                <StyledCopy
                  paymentDetailStyles={paymentDetailStyles}
                  data-testid="cy-term-value"
                  isNumber
                  columnsNum={payment.informationalApr ? '3' : '2'}
                >
                  {payment.termByMonth}
                </StyledCopy>
              </Box>
            </Box>
          </Box>
          {payment.informationalApr && (
            <Box ml="xxs" alignSelf="flex-end" width={`${columnWidth}%`}>
              <Box ml="xxs">
                <StyledCopy paymentDetailStyles={paymentDetailStyles}>
                  {t('Shared.Common.informationalAprLabel')}
                </StyledCopy>
                <StyledCopy paymentDetailStyles={paymentDetailStyles} isNumber columnsNum="3">
                  {payment.informationalApr}
                </StyledCopy>
              </Box>
            </Box>
          )}
        </PaymentDetailsContent>
      )}
    </PaymentDetailsContainer>
  );
};

export default withSitecoreContext()(PaymentDetails);
