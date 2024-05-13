import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Copy, Optional } from '@honda-canada/design-system-react';
import InfoModal from '../../../../utils/components/InfoModal';
import themeStyles from './Payment.styles';

const PaymentWrapper = themeStyles.apply(Box, 'PaymentWrapper');
const FrequencyWrapper = themeStyles.apply(Box, 'FrequencyWrapper');
const TermWrapper = themeStyles.apply(Copy, 'TermWrapper');
const StyledCopy = themeStyles.apply(Copy, 'StyledCopy');
const TitleCopy = themeStyles.apply(Copy, 'TitleCopy');
const PriceCopy = themeStyles.apply(Copy, 'PriceCopy');

const PaymentDetails = ({
  paymentDetailsObj,
  paymentTooltip,
  isDark,
  showPaymentInfoTooltip,
  showDisclaimerAnchor,
}) => {
  const { t } = useTranslation();
  const [showInfoModal, setShowInfoModal] = useState(false);
  if (!paymentDetailsObj.amount) return null;
  const { termLabel, amount, termByMonth, informationalApr } = paymentDetailsObj;

  return (
    <PaymentWrapper data-testid="cy-payment-wrapper">
      <FrequencyWrapper data-testid="cy-payment-frequency-wrapper">
        <TitleCopy size="extraSmall" isDark={isDark} data-testid="cy-payment-frequency-label">
          {termLabel}
        </TitleCopy>
        <Box display="flex" data-testid="cy-value-and-disclaimer">
          <PriceCopy
            size="regular"
            mr={['zero', 'zero', 'xxs']}
            isDark={isDark}
            data-testid="cy-payment-frequency-value"
          >
            {amount}
          </PriceCopy>
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
      </FrequencyWrapper>
      <TermWrapper>
        <Box ml="s">
          <TitleCopy size="extraSmall" isDark={isDark} data-testid="cy-payment-term-label">
            {t('Shared.Common.termByMonthLabel')}
          </TitleCopy>
          <PriceCopy size="regular" isDark={isDark} data-testid="cy-payment-term-value">
            {termByMonth}
          </PriceCopy>
        </Box>
      </TermWrapper>
      {informationalApr && (
        <Box ml="s" borderLeft="2px solid" borderLeftColor="grey.3" minWidth="128px">
          <Box ml="s">
            <StyledCopy size="extraSmall" mr="xxs" fontWeight="regular" isDark={isDark}>
              {t('Shared.Common.informationalAprLabel')}
            </StyledCopy>
            <StyledCopy size="regular" isDark={isDark} isNumber>
              {informationalApr}
            </StyledCopy>
          </Box>
        </Box>
      )}
    </PaymentWrapper>
  );
};
export default PaymentDetails;
