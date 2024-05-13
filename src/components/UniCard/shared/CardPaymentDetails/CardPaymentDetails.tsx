import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Copy, Row, Column } from '@honda-canada/design-system-react';
import themeStyles from '../../styles/Card.styles';
import InfoModal from '../../../../utils/components/InfoModal';

type PaymentDetailsUIProps = {
  paymentLabel: {
    method: string;
    frequency: string;
  };
  paymentAmount: number;
  terms: number;
  apr: number;
  paymentTooltipParams: {
    [key: string]: number | string;
  };
  paymentOptionsFontSize: string[];
  paymentOptionsLineHeight: string[];
};

const PaymentColumn = themeStyles.apply(Column, 'PaymentColumn');
const PaymentAmountContainer = themeStyles.apply(Box, 'PaymentAmountContainer');
const PaymentLabelCopy = themeStyles.apply(Copy, 'PaymentLabelCopy');
const PaymentContentCopy = themeStyles.apply(Copy, 'PaymentContentCopy');

const PaymentDetailsUI = ({
  paymentLabel,
  terms,
  apr,
  paymentAmount,
  paymentTooltipParams,
  paymentOptionsFontSize,
  paymentOptionsLineHeight,
}: PaymentDetailsUIProps) => {
  const { t } = useTranslation();
  const paymentMethod = t(`Shared.Common.PaymentMethod.${paymentLabel.method}`);
  const paymentFrequency = t(`Shared.Common.PaymentFrequency.${paymentLabel.frequency}`);
  const paymentLabelContent = `${paymentFrequency} ${paymentMethod}`;
  const paymentTooltipLabel = t('Shared.Common.paymentTooltipLabel', {
    ...paymentTooltipParams,
    paymentMethod: paymentMethod.toLowerCase(),
    paymentFrequency,
  });
  const [showInfoModal, setShowInfoModal] = useState(false);
  return (
    <Row>
      <PaymentColumn width={[1 / 2]} data-testid="cy-payment-frequency">
        <PaymentAmountContainer>
          <PaymentLabelCopy size="extraSmall" marginRight="xxs" data-testid="cy-payment-frequency-label">
            {paymentLabelContent}
          </PaymentLabelCopy>
          <InfoModal
            showModal={showInfoModal}
            setShowModal={setShowInfoModal}
            content={paymentTooltipLabel}
            isDark={false}
            data-testid="cy-payment-tooltip"
          />
        </PaymentAmountContainer>
        <PaymentContentCopy
          fontSize={paymentOptionsFontSize}
          lineHeight={paymentOptionsLineHeight}
          data-testid="cy-payment-frequency-value"
        >{`$${paymentAmount}`}</PaymentContentCopy>
      </PaymentColumn>
      <PaymentColumn width={[1 / 2]} data-testid="cy-payment-term">
        <PaymentLabelCopy size="extraSmall" data-testid="cy-payment-term-label">
          {t('Shared.Common.termByMonthLabel')}
        </PaymentLabelCopy>
        <PaymentContentCopy
          fontSize={paymentOptionsFontSize}
          lineHeight={paymentOptionsLineHeight}
          data-testid="cy-payment-term-value"
        >{`${terms} @ ${apr.toFixed(2)}%`}</PaymentContentCopy>
      </PaymentColumn>
    </Row>
  );
};

export default PaymentDetailsUI;
