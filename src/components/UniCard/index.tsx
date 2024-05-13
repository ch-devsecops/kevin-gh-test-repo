import React, { useMemo } from 'react';

import Image from './shared/CardImage';
import Title from './shared/CardTitle';
import SubTitle from './shared/CardSubTitle';
import Pricing from './shared/CardPricing';
import PaymentDetails from './shared/CardPaymentDetails';
import CTA from './shared/CardCTA';
import TitleWrapper from './shared/CardTitleWrapper';
import UniCard from './UniCard';

import safelyStringifyJSON from '../../utils/safelyStringifyJSON';

import type { AppNameConfig, UniCardMapProps } from './types';

const UniCardMap = ({ variant, fields, children, componentName, ...rest }: UniCardMapProps) => {
  const mappedFields = fields || {};

  const appNameConfig: AppNameConfig = useMemo(
    () => ({ variant, ...mappedFields, ...rest }),
    [variant, safelyStringifyJSON(mappedFields), safelyStringifyJSON(rest)],
  );

  return (
    <UniCard appNameConfig={appNameConfig} componentName={componentName}>
      {children}
    </UniCard>
  );
};

UniCardMap.Image = Image;
UniCardMap.Title = Title;
UniCardMap.TitleWrapper = TitleWrapper;
UniCardMap.Pricing = Pricing;
UniCardMap.SubTitle = SubTitle;
UniCardMap.PaymentDetails = PaymentDetails;
UniCardMap.CTA = CTA;

export default UniCardMap;
export {
  UniCard as UniCardUI,
  Image as ProductImage,
  Title as ProductTitle,
  SubTitle as ProductSubTitle,
  Pricing as ProductPricing,
  PaymentDetails as ProductPaymentDetails,
  CTA as ProductCTA,
};
