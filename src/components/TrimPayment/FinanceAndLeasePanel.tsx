import React from 'react';
import { Column, Copy, Row, FloaterTooltipMarkdown, Icon, Box } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';

import themeStyles from './styles/TrimPayment.styles';
import { paymentMethods, paymentFrequencies } from '../TrimUtils/constants';
import type { Payment } from './types/payment.interfaces';

type FinanceAndLeasePanelProps = {
  paymentData: {
    hasError: boolean;
    isFetching: boolean;
    payment: Payment;
  };
  paymentFrequency: keyof typeof paymentFrequencies;
  paymentMethod: keyof typeof paymentMethods;
};

const Tooltip = themeStyles.apply(FloaterTooltipMarkdown, 'Tooltip');
const PaymentDetailsRow = themeStyles.apply(Row, 'PaymentDetailsRow');
const PaymentDetailsLabel = themeStyles.apply(Copy, 'PaymentDetailsLabel');
const PaymentDetailsContent = themeStyles.apply(Copy, 'PaymentDetailsContent');
const PaymentDetailsContainer = themeStyles.apply(Box, 'PaymentDetailsContainer');
const PaymentDetailsPaymentContainer = themeStyles.apply(Box, 'PaymentDetailsPaymentContainer');
const ColumnWithDivider = themeStyles.apply(Column, 'ColumnWithDivider');

const tooltipIcon = ({ active }: { active: boolean }) => (
  <Icon name="information" aria-expanded="false" filled={active} />
);

const FinanceAndLeasePanel = ({ paymentData, paymentMethod, paymentFrequency }: FinanceAndLeasePanelProps) => {
  const { t } = useTranslation();
  const { payment } = paymentData ?? {};
  const { term, apr, preferredPaymentAmount, informationalApr } = payment ?? {};

  // TODO: Price label tooltip
  const tooltipContent = `Payment tooltip  ${paymentMethod} ${paymentFrequency}`;

  const priceLabel = t(`Shared.Common.${paymentFrequency}PriceLabel`);
  return (
    <PaymentDetailsRow data-testid="cy-trim-payment-details">
      <Column width={1 / 3}>
        <PaymentDetailsContainer>
          <PaymentDetailsPaymentContainer>
            <PaymentDetailsLabel size="extraSmall" data-testid="cy-trim-payment-frequency-label">
              {priceLabel}
            </PaymentDetailsLabel>
            <Tooltip
              content={tooltipContent}
              aria-expanded="false"
              data-testid={`cy-trim-payment-${paymentMethod}-tooltip`}
            >
              {tooltipIcon}
            </Tooltip>
          </PaymentDetailsPaymentContainer>
          <PaymentDetailsContent
            size="small"
            data-testid="cy-trim-payment-frequency-value"
          >{`$${preferredPaymentAmount}`}</PaymentDetailsContent>
        </PaymentDetailsContainer>
      </Column>
      <ColumnWithDivider width={1 / 3}>
        <PaymentDetailsContainer>
          <PaymentDetailsLabel size="extraSmall" data-testid="cy-trim-payment-term-label">
            {t('Shared.Common.termByMonthLabel')}
          </PaymentDetailsLabel>
          <PaymentDetailsContent size="small" data-testid="cy-trim-payment-term-value">{`${term} @ ${apr?.toFixed(
            2,
          )}%`}</PaymentDetailsContent>
        </PaymentDetailsContainer>
      </ColumnWithDivider>
      <Column width={1 / 3}>
        <PaymentDetailsContainer>
          <PaymentDetailsLabel size="extraSmall" data-testid="cy-trim-payment-informational-apr-label">
            {t('Shared.Common.informationalAprLabel')}
          </PaymentDetailsLabel>
          {/* TODO: Informational APR can be optional, to be update by BA */}
          <PaymentDetailsContent
            size="small"
            data-testid="cy-trim-payment-informational-apr-value"
          >{`${informationalApr}%`}</PaymentDetailsContent>
        </PaymentDetailsContainer>
      </Column>
    </PaymentDetailsRow>
  );
};

export default FinanceAndLeasePanel;
