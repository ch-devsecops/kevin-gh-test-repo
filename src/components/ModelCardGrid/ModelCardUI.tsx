/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Box, Optional } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import NotImplemented from '../NotImplemented';
import UniCard from '../UniCard';
import themeStyles from '../UniCard/styles/Card.styles';
import { useAppName } from '../../utils/sitecoreContext';
import useHoverState from './useHoverState';
import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import type { Model } from './interfaces/Model.interfaces';
import type { PaymentPayload } from './interfaces/Payment.interfaces';
import type { Pricing } from '../UniCard/types';
import isPriceAvailable from './utils/isPriceAvailable';
import { paymentConfig, variant1 } from './utils/constants';

type ModelCardUIProps = {
  product: Model;
  modelPrice: Pricing;
  payment: PaymentPayload;
};

const UniCardWrapper = themeStyles.apply(Box, 'UniCardWrapper');

const ModelCardUI = ({ product, modelPrice, payment, ...rest }: ModelCardUIProps) => {
  const appName = useAppName();
  const { t } = useTranslation();

  // @ts-ignore
  const nextStepUrl = useSelector(state => state?.inventoryVehicleListFilters?.nextStepUrl);
  const { href, linktype } = nextStepUrl;

  const productName = product?.name;
  const productYear = product?.year;
  const productPrimaryThumbnail = product?.defaultTrim?.primaryThumbnail?.item;
  const productSecondaryThumbnail = product?.defaultTrim?.secondaryThumbnail?.item;

  const { thumbnail, backgroundColor, onMouseEnter, onMouseLeave } = useHoverState({
    primaryThumbnail: productPrimaryThumbnail,
    secondaryThumbnail: productSecondaryThumbnail,
  });

  const paymentTooltip = {
    year: productYear,
    model: product?.modelName,
    trim: product?.defaultTrimName,
  };

  const fields = {
    cta: {
      text: `${t('Pages.Models.Exploration.selectModelButton')}`,
      href,
      linktype,
      target: '',
      label: '',
      params: {
        modelKey: product.detKey,
        modelYear: product.year,
      },
    },
    title: {
      title: `${productYear} ${productName}`,
    },
    subTitle: {
      subTitle: '',
    },
    payment: {
      // eslint-disable-next-line prettier/prettier
      paymentOption: paymentConfig[appName as keyof typeof paymentConfig],
      paymentPayload: payment,
      paymentTooltip,
    },
    pricing: modelPrice,
    image: thumbnail,
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
      return <NotImplemented name="Inventory Product Card " />;
  }

  return (
    <UniCardWrapper data-testid="cy-uni-card">
      <UniCard variant={variant} fields={fields} componentName="ModelCardGrid">
        <UniCard.TitleWrapper>
          <UniCard.Title />
        </UniCard.TitleWrapper>
        <UniCard.Pricing />
        <UniCard.Image />
        <Optional when={isPriceAvailable(modelPrice)}>
          <UniCard.PaymentDetails />
        </Optional>
        <UniCard.CTA />
      </UniCard>
    </UniCardWrapper>
  );
};

export default ModelCardUI;
