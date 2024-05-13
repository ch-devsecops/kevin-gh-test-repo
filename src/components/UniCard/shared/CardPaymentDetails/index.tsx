import React, { useContext } from 'react';
import isEmpty from 'lodash/isEmpty';
import PaymentDetailsUI from './CardPaymentDetails';
import Context from '../../service/Context';
import useFetchPaymentDetails from '../../useFetchPaymentDetails';
import usePaymentTooltipParams from '../../service/usePaymentTooltipParams';
import type { Payment } from '../../../ModelCardGrid/interfaces/Payment.interfaces';
import type { PaymentDetailsProps } from '../../types';
import { useConfiguration } from '../../service/constants';

function isPayment(object: object): object is Payment {
  return (
    'term' in object &&
    typeof object?.term === 'number' &&
    'apr' in object &&
    typeof object?.apr === 'number' &&
    'preferredPaymentAmount' in object &&
    typeof object?.preferredPaymentAmount === 'number'
  );
}

const PaymentDetails = (props: Partial<PaymentDetailsProps>) => {
  const { payment: paymentProps, variant } = useContext(Context);
  const propsSource = isEmpty(props) ? paymentProps : props;
  const { paymentOption, paymentPayload, paymentTooltip } = propsSource ?? {};

  const { paymentOptionsFontSize, paymentOptionsLineHeight } = useConfiguration(variant || '');
  const { payment, isFetching, hasError, isSellingPriceProvince } = useFetchPaymentDetails(
    paymentPayload,
    paymentOption?.frequency,
    paymentOption?.method,
  );

  const paymentTooltipParams = usePaymentTooltipParams({
    initialParams: paymentTooltip,
    payment,
    isSellingPriceProvince,
  });

  if (isFetching || hasError || !payment) return null;

  if (isPayment(payment) && paymentOption) {
    return (
      <PaymentDetailsUI
        paymentLabel={paymentOption}
        terms={payment?.term}
        paymentAmount={payment?.preferredPaymentAmount}
        apr={payment?.apr}
        paymentTooltipParams={paymentTooltipParams}
        paymentOptionsFontSize={paymentOptionsFontSize}
        paymentOptionsLineHeight={paymentOptionsLineHeight}
      />
    );
  }

  return null;
};

export default PaymentDetails;
