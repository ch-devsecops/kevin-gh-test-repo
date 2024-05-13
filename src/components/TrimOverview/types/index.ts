import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store';

export interface Pricing {
  prices: {
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

export type FieldsProps = {
  [key: string]: any;
};

type injectedReducerFunction = (reducer: (state: RootState, action: PayloadAction) => void, key: string) => void;
type injectedApiFunction = (reducer: any) => void;

// +
export type TrimOverviewMapProps = {
  children: React.ReactNode;
  rendering: {
    componentName?: string;
  };
  params: {
    injectedReducer: injectedReducerFunction;
    injectedApi: injectedApiFunction;
  };
  fields: FieldsProps;
  variant?: string;
};

export type AppNameConfig = FieldsProps & {
  variant?: string;
};

// +
export type TrimOverviewUIProps = {
  componentName?: string;
  fields?: FieldsProps;
};

export type TrimOverviewProps = {
  appNameConfig: AppNameConfig;
  componentName?: string;
  fields?: FieldsProps;
};

export type ConfigurationProviderProps = {
  children: React.ReactNode;
  appNameConfig: AppNameConfig;
  variant?: string;
};

export type assetTypeState = 'interior' | 'exterior';

export type modelsType = {
  items: {
    detKey: string;
    name: string;
    modelYears: {
      detIdentifier: string;
      name: string;
      trims: {
        detKey: string;
        name: string;
        transmissions: {
          items: {
            id: string;
            name: string;
            detKey: string;
          }[];
        }[];
      }[];
    }[];
  }[];
}[];

export type TrimDetailsProps = {
  transmissionKey: string;
  models: modelsType;
};

export type TrimCarouselProps = {
  transmissionKey: string;
  models: modelsType;
};

export type TrimToggleProps = {
  onAssetTypeChange: (assetType: assetTypeState) => void;
};

// Define the type for an individual image.
export type TrimImage = {
  id: string;
  fields: {
    src: string;
    Alt: { value: string };
  };
};

// Define the type for the return value of useTrimCarouselImages.
export type TrimCarouselImagesData = {
  exteriorImagesData: TrimImage[];
  interiorImagesData: TrimImage[];
};

export type transmissionColorType = {
  fields: {
    color: {
      fields: {
        detKey: {
          value: string;
        };
      };
    };
  };
};

export type useModelDetailsType = (
  transmissionKey: string,
  models: modelsType,
) => {
  transmission?: { id: string; name: string };
  trim?: { name: string };
  year?: { name: string };
  model?: { name: string };
};

export type BackButtonProps = {
  backStepUrlField?: {
    text: string;
    href: string;
  };
};
