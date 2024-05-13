import type { ModelPrice } from '../../ModelCardGrid/interfaces/Price.interfaces';

type ModelPrices = {
  price?: ModelPrice,
  isFetchingPrice: boolean,
  hasPriceError: boolean,
};

type ModelAndPrice = {
  trim: string,
  transmission: string,
  exteriorColor: string,
  modelPrices: ModelPrices,
  priceLabels: {
    priceErrorLabel: string,
    msrpStartingFromLabel: string,
    sellingPriceLabel: string,
  },
};

const getTrimPrice = ({ trim, transmission, exteriorColor, modelPrices, priceLabels }: ModelAndPrice) => {
  const pricesByTrims = modelPrices?.price?.trims;
  const trimPrice = pricesByTrims?.find(price => price?.key?.toString() === trim);
  const transmissionPrice = trimPrice?.transmissions?.find(t => t?.key?.toString() === transmission);
  const exteriorColorPrice = transmissionPrice?.exteriorColors?.find(color => color?.key?.toString() === exteriorColor);

  return {
    discount: {
      priceDiscountAmount: transmissionPrice?.priceDiscountAmount,
      msrpWithDiscount: exteriorColorPrice?.msrpWithDiscount,
      sellingPriceWithDiscount: exteriorColorPrice?.sellingPriceWithDiscount,
    },
    allInPrice: {
      value: exteriorColorPrice?.sellingPrice,
      label: priceLabels.sellingPriceLabel,
    },
    msrpPrice: {
      value: exteriorColorPrice?.msrp,
      label: priceLabels.msrpStartingFromLabel,
    },
  };
};

export default getTrimPrice;
