import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box, Copy, Row, Optional } from '@honda-canada/design-system-react';
import formatPrice from '@honda-canada/js-utilities/lib/formatPrice';
import { useTranslation } from 'react-i18next';
import { compiler } from 'markdown-to-jsx';
import TrimPrice from '../../TrimPrices/TrimPrice';
import useTrimPayment from '../../../apiHooks/useTrimPayment';
import { getPricingByProvinceType } from '../util';
import { PaymentTermLabel, getIsSellingPriceProvince, getShowPriceFlags } from '../../../utils/financeUtils';

const StyledBox = styled(Box)(
  css({
    '.expanded &:hover': {
      '*': {
        fontFamily: 'bold',
      },
    },
  }),
);

const SelectTrimOptionDropdownOption = ({
  trim,
  financial,
  paymentOptions,
  provinceCode,
  showInformationalApr,
  sitecoreContext,
}) => {
  const { language, provinces, settings } = sitecoreContext;
  const defaultProvince = settings?.defaultProvince;
  const { t } = useTranslation();
  const isSellingPriceProvince = getIsSellingPriceProvince(provinceCode || defaultProvince, provinces);
  const { showMsrpPrice, showSellingPrice } = getShowPriceFlags(
    provinceCode || defaultProvince,
    provinces,
    paymentOptions,
  );

  const strings = {
    termByMonthLabel: t('Shared.Common.termByMonthLabel'),
    informationalAprLabel: t('Shared.Common.informationalAprLabel'),
    paymentFrequencyMonthly: t('Shared.Common.PaymentFrequency.monthly'),
    paymentFrequencyBiWeekly: t('Shared.Common.PaymentFrequency.biWeekly'),
    paymentFrequencyWeekly: t('Shared.Common.PaymentFrequency.weekly'),
    paymentMethodLease: t('Shared.Common.PaymentMethod.lease'),
    paymentMethodFinance: t('Shared.Common.PaymentMethod.finance'),
    msrpStartingFromLabel: `${t('Shared.Common.msrpStartingFromLabel')}${isSellingPriceProvince ? '' : '*'}`,
    sellingPriceLabel: `${t('Shared.Common.sellingPriceLabel')}${isSellingPriceProvince ? '' : '*'}`,
  };
  const { payment } = useTrimPayment(trim, paymentOptions, provinceCode, null, true);
  const trimfinancial = financial?.models?.[0]?.trims?.find(f => f.id === parseInt(trim?.id, 10));
  let pricingObject = {};
  let paymentAmount;
  let informationalApr;
  let paymentTermLabel;

  if (payment) {
    paymentAmount = payment?.preferredPaymentAmount > 0 && formatPrice(payment?.preferredPaymentAmount, language, 2);
    informationalApr = showInformationalApr && payment?.informationalApr ? `${payment?.informationalApr}%` : '';
    paymentTermLabel = paymentOptions.paymentFrequency && paymentOptions.paymentMethod && (
      <PaymentTermLabel
        frequency={paymentOptions.paymentFrequency}
        method={paymentOptions.paymentMethod}
        hasAsterisk={!isSellingPriceProvince}
      />
    );
  } else {
    pricingObject = getPricingByProvinceType(trimfinancial, trim?.transmissionKey, trim?.exteriorColorKey, strings);
  }

  return (
    <StyledBox width="100%" pl={4} py={['9px', '6px']} tabIndex="0">
      <Copy size="small" fontWeight="regular">
        {compiler(trim?.name)}
      </Copy>
      {!paymentTermLabel && (
        <>
          <Optional when={showMsrpPrice}>
            <TrimPrice price={pricingObject?.priceMsrp} label={pricingObject?.labelMsrp} />
          </Optional>
          <Optional when={showSellingPrice}>
            <TrimPrice price={pricingObject?.priceSelling} label={pricingObject?.labelSelling} />
          </Optional>
        </>
      )}
      {paymentAmount && informationalApr && (
        <>
          <Row alignItems="center">
            <Copy size="legal" mr="xxs" fontWeight="regular" color="black">
              {paymentTermLabel}
            </Copy>
            <Copy size="extraSmall" fontWeight="bold">
              {paymentAmount}
            </Copy>
          </Row>
          <Row alignItems="center" pt="xxs">
            <Copy size="legal" mr="xxs" fontWeight="regular">
              {strings.termByMonthLabel}
            </Copy>
            <Copy size="legal" fontWeight="bold">
              {`${payment?.term} @ ${payment?.apr}%`}
            </Copy>
            <Copy size="legal" ml="s" mr="xxs" fontWeight="regular">
              {strings.informationalAprLabel}
            </Copy>
            <Copy size="legal" fontWeight="bold">
              {informationalApr}
            </Copy>
          </Row>
        </>
      )}
      {paymentAmount && !informationalApr && (
        <Row alignItems="center">
          <Copy size="legal" mr="xxs" fontWeight="regular">
            {paymentTermLabel}
          </Copy>
          <Copy size="extraSmall" fontWeight="bold">
            {paymentAmount}
          </Copy>
          <Copy size="legal" ml="s" mr="xxs" fontWeight="regular">
            {strings.termByMonthLabel}
          </Copy>
          <Copy size="extraSmall" fontWeight="bold">
            {`${payment?.term} @ ${payment?.apr}%`}
          </Copy>
        </Row>
      )}
    </StyledBox>
  );
};

export default withSitecoreContext()(SelectTrimOptionDropdownOption);
