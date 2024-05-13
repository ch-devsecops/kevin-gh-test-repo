import React from 'react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { PaymentTermLabel } from '../../../../utils/financeUtils';
import {
  ACURA_SITE_NAME,
  HONDA_SITE_NAME,
  LEASE_ANNUAL_KM_ALLOWANCE,
  PSP_SITE_NAME,
} from '../../../../utils/constants';

const trimPaymentFormatter = (appName, payment = {}, paymentOptions, showInformationalApr, language) => {
  let lienRegistrationFee;
  let lienRegAgentFee;
  let termByMonth;
  let term;
  let msrp;
  let downPayment;
  let informationalApr;
  let freightPdi;
  let amount;
  let offerEnds;
  let paymentAmount;
  let totalObligation;
  let kmAllowance;
  // eslint-disable-next-line default-case
  switch (appName) {
    case ACURA_SITE_NAME:
    case HONDA_SITE_NAME:
      lienRegistrationFee = formatPrice(
        payment?.levies.filter(item => item.key === 'ppsa_registration_fee').price || 0,
        language,
        2,
      );
      lienRegAgentFee = formatPrice(
        payment?.levies.filter(item => item.key === 'registering_agent_fee').price || 0,
        language,
        2,
      );
      termByMonth = `${payment?.term} @ ${payment?.apr}%`;
      term = payment?.term;
      msrp = formatPrice(payment?.msrp, language, 0);
      downPayment = formatPrice(payment?.downPaymentAmount, language, 2);
      informationalApr = showInformationalApr && payment?.informationalApr ? `${payment?.informationalApr}%` : '';
      freightPdi = formatPrice(payment?.freightAndPdi, language, 2);
      amount = payment?.preferredPaymentAmount > 0 && formatPrice(payment?.preferredPaymentAmount, language, 2);
      offerEnds = payment?.offerPeriod?.endDate;
      paymentAmount = formatPrice(payment?.preferredPaymentAmount, language, 2);
      totalObligation =
        payment?.preferredPaymentAmount > 0 &&
        formatPrice((payment?.numberOfTotalPayments || 0) * (payment?.preferredPaymentAmount || 0), language, 2);
      kmAllowance = payment?.leaseAnnualKmAllowance;
      break;
    case PSP_SITE_NAME:
      lienRegistrationFee = formatPrice(payment?.levies?.['PPSA Registration Fee']?.value || 0, language, 2);
      lienRegAgentFee = formatPrice(payment?.levies?.['Registering Agent Fee']?.value || 0, language, 2);
      termByMonth = `${payment?.termOptionsDefault} @ ${payment?.apr}%`;
      term = payment?.termOptionsDefault;
      msrp = formatPrice(payment?.msrp?.value, language, 0);
      downPayment = formatPrice(payment?.down_payment, language, 2);
      informationalApr = showInformationalApr && payment?.informational_apr ? `${payment?.informational_apr}%` : '';
      freightPdi = formatPrice(payment?.freight_pdi, language, 2);
      amount = payment?.total > 0 && formatPrice(payment?.total, language, 2);
      offerEnds = payment?.rate_period_end;
      paymentAmount = formatPrice(payment?.total, language, 2);
      totalObligation =
        payment?.total > 0 && formatPrice((payment?.no_of_weekly_payments || 0) * (payment?.total || 0), language, 2);
      kmAllowance = payment?.est_annual_km;
  }

  return {
    amount,
    termLabel: <PaymentTermLabel frequency={paymentOptions.paymentFrequency} method={paymentOptions.paymentMethod} />,
    informationalApr,
    termByMonth,
    apr: payment?.apr,
    term,
    netPaymentAmount: formatPrice(payment?.netPaymentAmount, language, 0),
    msrp,
    downPayment,
    paymentAmount,
    numberOfPayments: payment?.numberOfTotalPayments,
    totalObligation,
    kmAllowance,
    freightPdi,
    offerEnds,
    levies: payment?.levies > 0 && formatPrice(payment?.levies, language, 2),
    extraKmCharge: formatPrice(
      payment?.leaseKilometers?.filter(item => item.kmAllowance === LEASE_ANNUAL_KM_ALLOWANCE)[0].additionalCostPerKm ||
        0,
      language,
      2,
    ),
    lienRegistrationFee,
    lienRegAgentFee,
  };
};

export default trimPaymentFormatter;
