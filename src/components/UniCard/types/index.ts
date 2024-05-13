export type CTAProps = {
  text?: string;
  href?: string;
  linktype?: string;
  target?: string;
  label?: string;
  params?: Record<string, string>;
};

export type TitleProps = {
  title?: string;
  alignment?: 'left' | 'center' | 'right';
};

export type SubTitleProps = {
  subTitle?: string;
  alignment?: 'left' | 'center' | 'right';
};

export interface Pricing {
  modelPrice: {
    discount: {
      priceDiscountAmount?: number;
      msrpWithDiscount?: number;
      sellingPriceWithDiscount?: number;
    };
    allInPrice: {
      value?: number;
      label: string;
    };
    msrpPrice: {
      value?: number;
      label: string;
    };
  };
  isFetchingPrice: boolean;
  hasPriceError: boolean;
}

export type PricingProps = {
  pricing?: Pricing;
};

export type ImageProps = {
  src?: string;
  alt?: string;
  placeholder?: string;
};

interface PaymentPayload {
  modelKey: string;
  modelYear: string;
  trimKey: string;
  transmissionKey: string;
  exteriorColorKey: string;
  interiorColorKey?: string;
}

export type PaymentDetailsProps = {
  paymentOption: {
    method: string;
    frequency: string;
  };
  paymentPayload: PaymentPayload;
  paymentTooltip: {
    [key: string]: string;
  };
};

export type FieldsProps = {
  cta?: CTAProps;
  image?: ImageProps;
  pricing?: Pricing;
  payment?: PaymentDetailsProps;
  title?: TitleProps;
  subTitle: SubTitleProps;
  card?: {
    events?: {
      onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
      onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    };
    styles?: {
      backgroundColor?: string;
    };
  };
};

export type UniCardMapProps = {
  children: React.ReactNode;
  componentName?: string;
  fields: FieldsProps;
  variant?: string;
};

export type AppNameConfig = FieldsProps & {
  variant?: string;
};

export type UniCardUIProps = {
  appNameConfig: AppNameConfig;
  componentName?: string;
  children: React.ReactNode;
};

export type UniCardProps = {
  children: React.ReactNode;
  componentName?: string;
  variant?: string;
};

export type ConfigurationProviderProps = {
  children: React.ReactNode;
  appNameConfig: AppNameConfig;
};
