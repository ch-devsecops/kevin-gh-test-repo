import React from 'react';
import { useTranslation } from 'react-i18next';
import ModelCardUI from './ModelCardUI';
import getModelPrice from './utils/getModelPrice';
import usePreloadMediaImages from '../../utils/hooks/usePreloadMediaImages';
import type { Model } from './interfaces/Model.interfaces';
import type { ModelPrice } from './interfaces/Price.interfaces';
import type { PaymentPayload } from './interfaces/Payment.interfaces';

type ModelPrices = {
  price?: ModelPrice,
  isFetchingPrice: boolean,
  hasPriceError: boolean,
};

type ModelCardProps = {
  model: Model,
  modelPrices: ModelPrices,
};

const ModelCard = ({ model, modelPrices }: ModelCardProps) => {
  const { t } = useTranslation();

  const priceLabels = {
    priceErrorLabel: t('Shared.Errors.priceError'),
    msrpStartingFromLabel: t('Shared.Common.msrpStartingFromLabel'),
    sellingPriceLabel: t('Shared.Common.sellingPriceLabel'),
  };
  // pick out pricing info for default trim/transmission/exteriorColor
  const defaultTrim = model?.defaultTrim?.detIdentifier;
  const defaultTransmission = model?.defaultTrim?.defaultTransmission?.item?.detIdentifier;
  const defaultExteriorColor =
    model?.defaultTrim?.defaultTransmission?.item?.defaultExteriorColor?.item?.color?.item?.detKey;

  const modelPrice = getModelPrice({
    exteriorColor: defaultExteriorColor,
    transmission: defaultTransmission,
    trim: defaultTrim,
    modelPrices,
    priceLabels,
  });

  // pre-load hover state thumbnail image
  const secondaryThumbnail = model?.defaultTrim?.secondaryThumbnail?.item;
  usePreloadMediaImages(secondaryThumbnail?.src);

  const payment: PaymentPayload = {
    modelKey: model?.detKey,
    modelYear: model?.year,
    trimKey: model?.defaultTrim?.detKey,
    transmissionKey: model?.defaultTrim?.defaultTransmission?.item?.detKey,
    exteriorColorKey: defaultExteriorColor,
    interiorColorKey: '',
  };
  return (
    <ModelCardUI
      product={model}
      modelPrice={{
        modelPrice,
        isFetchingPrice: modelPrices.isFetchingPrice,
        hasPriceError: modelPrices.hasPriceError,
      }}
      payment={payment}
    />
  );
};

export default ModelCard;
