/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Box, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import type { Trim } from './interfaces';
import NotImplemented from '../NotImplemented';
import UniCard from '../UniCard';
import themeStyles from '../UniCard/styles/Card.styles';
import { useAppName } from '../../utils/sitecoreContext';
import useHoverState from '../ModelCardGrid/useHoverState';
import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import type { Pricing } from '../UniCard/types';
import getTrimPrice from './utils/getTrimPrice';
import type { PaymentPayload } from '../ModelCardGrid/interfaces/Payment.interfaces';
import { paymentConfig, variant1 } from '../ModelCardGrid/utils/constants';
import { sanitizeColorKey } from '../../utils/urls';

type TrimCardProps = {
  trim: Trim;
  prices: Pricing;
};

const UniCardWrapper = themeStyles.apply(Box, 'UniCardWrapper');

const isPriceAvailable = (price: Pricing) =>
  !!price &&
  !isEmpty(price) &&
  price.modelPrice?.allInPrice?.value &&
  price.modelPrice?.msrpPrice?.value &&
  !price.hasPriceError;

const TrimCard = ({ trim, prices, ...rest }: TrimCardProps) => {
  const { t } = useTranslation();
  const appName = useAppName();
  // @ts-ignore
  const nextStepUrl = useSelector(state => state?.inventoryVehicleListFilters?.nextStepUrl);
  const { href, linktype } = nextStepUrl;

  const priceLabels = {
    priceErrorLabel: t('Shared.Errors.priceError'),
    msrpStartingFromLabel: t('Shared.Common.msrpStartingFromLabel'),
    sellingPriceLabel: t('Shared.Common.sellingPriceLabel'),
  };

  const trimPrice = {
    modelPrice: getTrimPrice({
      exteriorColor: trim.exteriorColorKey,
      transmission: trim.transmissionKey,
      trim: trim.trimKey,
      modelPrices: prices,
      priceLabels,
    }),
    isFetchingPrice: prices.isFetchingPrice,
    hasPriceError: prices.hasPriceError,
  };

  const { thumbnail, backgroundColor, onMouseEnter, onMouseLeave } = useHoverState({
    primaryThumbnail: trim?.primaryThumbnail?.value,
    secondaryThumbnail: trim?.secondaryThumbnail?.value,
  });

  const payment: PaymentPayload = {
    modelKey: trim?.modelKey,
    modelYear: trim?.year,
    trimKey: trim?.trimKey,
    transmissionKey: trim?.transmissionKey,
    exteriorColorKey: trim?.exteriorColorKey,
    interiorColorKey: '',
  };

  const paymentTooltip = {
    year: trim?.year,
    model: trim?.modelName,
    trim: trim?.trimName,
  };

  const fields = {
    cta: {
      text: `${t('Pages.Models.Exploration.selectTrimButton')}`,
      href,
      linktype,
      target: '',
      label: '',
      params: {
        modelYear: trim.year,
        modelKey: trim.modelKey,
        trimKey: trim.trimKey,
        transmissionKey: trim.transmissionKey,
        exteriorColorKey: sanitizeColorKey(trim.exteriorColorKey),
        interiorColorKey: sanitizeColorKey(trim.interiorColorKey),
      },
    },
    title: {
      title: `${trim.year} ${trim.trimName}`,
    },
    subTitle: {
      subTitle: trim?.transmissionName,
    },
    pricing: trimPrice,
    payment: {
      paymentOption: paymentConfig[appName as keyof typeof paymentConfig],
      paymentPayload: payment,
      paymentTooltip,
    },
    image: {
      src: thumbnail?.src,
      alt: thumbnail?.alt,
    },
    card: {
      events: {
        onMouseEnter,
        onMouseLeave,
      },
      styles: {
        backgroundColor,
        ...rest,
      },
    },
  };

  let variant;
  switch (appName) {
    case ACURA_SITE_NAME:
      variant = variant1;
      break;
    case HONDA_SITE_NAME:
      break;
    default:
      return <NotImplemented name="Inventory Trim Card " />;
  }
  return (
    <UniCardWrapper data-testid="cy-trim-card">
      <UniCard variant={variant} fields={fields} componentName="TrimCardGrid">
        <Box>
          <UniCard.Title />
          <UniCard.SubTitle />
          <UniCard.Pricing />
        </Box>
        <UniCard.Image />
        <Optional when={isPriceAvailable(trimPrice)}>
          <UniCard.PaymentDetails />
        </Optional>
        <UniCard.CTA />
      </UniCard>
    </UniCardWrapper>
  );
};

export default TrimCard;
