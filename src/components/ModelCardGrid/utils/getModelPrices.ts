import type { Price } from '../interfaces/Price.interfaces';

type Pricing = {
  price: Price,
  isFetchingPrice: boolean,
  hasPriceError: boolean,
};

/**
 * Pick out matching model with default trim
 */
const getModelPrices = (modelKey: string, defaultTrimKey: string, pricing: Pricing) => {
  const { price, isFetchingPrice, hasPriceError } = pricing || {};
  // all prices for this model for various years
  const modelPricesAllYears = price?.models?.filter(model => model.modelKey === modelKey);
  // find model with matching trim
  const modelPrices = modelPricesAllYears?.find(modelPrice =>
    modelPrice?.trims?.find(trim => trim?.key === defaultTrimKey),
  );
  return {
    price: modelPrices,
    isFetchingPrice,
    hasPriceError,
  };
};

export default getModelPrices;
