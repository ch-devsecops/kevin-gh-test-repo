import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';

export const paymentMethods = Object.freeze({
  cash: 'cash',
  finance: 'finance',
  lease: 'lease',
});

export const paymentFrequencies = Object.freeze({
  weekly: 'weekly',
  biweekly: 'biWeekly',
  monthly: 'monthly',
});

export const paymentConfigs = Object.freeze({
  [ACURA_SITE_NAME]: {
    [paymentMethods.finance]: {
      method: paymentMethods.finance,
      term: 60,
      frequency: paymentFrequencies.monthly,
    },
    [paymentMethods.lease]: {
      method: paymentMethods.lease,
      term: 48,
      frequency: paymentFrequencies.monthly,
    },
    [paymentMethods.cash]: {
      method: paymentMethods.cash,
      term: 0,
      frequency: paymentFrequencies.monthly,
    },
  },
  [HONDA_SITE_NAME]: {
    [paymentMethods.finance]: {
      method: paymentMethods.finance,
      term: 84,
      frequency: paymentFrequencies.weekly,
    },
    [paymentMethods.lease]: {
      method: paymentMethods.lease,
      term: 60,
      frequency: paymentFrequencies.weekly,
    },
    [paymentMethods.cash]: {
      method: paymentMethods.cash,
      term: 0,
      frequency: paymentFrequencies.monthly,
    },
  },
});

export const paymentTabs = [
  { method: paymentMethods.finance, label: 'Shared.Common.PaymentMethod.finance' },
  { method: paymentMethods.lease, label: 'Shared.Common.PaymentMethod.lease' },
  { method: paymentMethods.cash, label: 'Shared.Common.PaymentMethod.cashLabel' },
];

// Default active tab is `lease`
export const DEFAULT_ACTIVE_TAB = paymentTabs.findIndex(tab => tab.method === paymentMethods.lease);
