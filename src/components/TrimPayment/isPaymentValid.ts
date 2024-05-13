import { paymentMethods } from '../TrimUtils/constants';
import type { Payment, Price } from './types/payment.interfaces';

type PaymentMethod = keyof typeof paymentMethods;

const isPaymentValid = (paymentMethod: PaymentMethod, payment: Payment, price: Price) => {
  switch (paymentMethod) {
    case paymentMethods.finance:
    case paymentMethods.lease:
      return !!payment?.apr && !!payment?.preferredPaymentAmount && !!payment?.term;
    case paymentMethods.cash:
      return !!price?.allInPrice?.value && !!price?.msrpPrice?.value;
    default:
      return false;
  }
};

export default isPaymentValid;
