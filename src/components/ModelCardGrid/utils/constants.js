import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../../utils/constants';

export const HONDA_DEFAULT_PAYMENT_METHOD = 'lease';
export const ACURA_DEFAULT_PAYMENT_METHOD = 'lease';

export const HONDA_DEFAULT_PAYMENT_FREQUENCY = 'weekly';
export const ACURA_DEFAULT_PAYMENT_FREQUENCY = 'monthly';

export const paymentConfig = Object.freeze({
  [HONDA_SITE_NAME]: { method: HONDA_DEFAULT_PAYMENT_METHOD, frequency: HONDA_DEFAULT_PAYMENT_FREQUENCY },
  [ACURA_SITE_NAME]: { method: ACURA_DEFAULT_PAYMENT_METHOD, frequency: ACURA_DEFAULT_PAYMENT_FREQUENCY },
});

export const variant1 = 'variant1';
