/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */

import { UserLocationContext } from '@honda-canada/user-location';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { flat } from '../../utils/object';
import { getTrimInfo } from './inventoryVehicleDetails';
import { priceApi } from '../api/priceApi';
import { useProvincesPath, useSettings } from '../../utils/sitecoreContext';

type ModelStateProps = {
  isFetchingPrice?: boolean;
  hasPriceError?: boolean;
  [key: string]: any;
};

type InitialStateProps = {
  [key: string]: ModelStateProps;
};

const initialState: InitialStateProps = {};

const makeUniquePaymentKey = (body: any) => {
  const uniqueParams = {
    exteriorColorKey: body?.exteriorColorKey,
    includeFees: body?.includeFees ?? body?.paymentOptions?.[0]?.includeFees,
    interiorColorKey: body?.interiorColorKey,
    isSellingPriceProvince: body?.isSellingPriceProvince ?? body?.paymentOptions?.[0]?.overriddenIsSellingProvince,
    modelKey: body?.modelKey,
    modelYear: body?.modelYear,
    paymentFrequency: body?.paymentFrequency || body?.paymentOptions?.[0]?.paymentFrequency,
    paymentMethod: body?.paymentMethod || body?.paymentOptions?.[0]?.paymentMethod,
    provinceKey: body?.provinceKey,
    transmissionKey: body?.transmissionKey,
    trimKey: body?.trimKey,
  };
  return JSON.stringify(uniqueParams, Object.keys(uniqueParams).sort());
};

const modelTrimsPrice = createReducer(initialState, builder => {
  builder
    // * Model Price request
    .addMatcher(priceApi.endpoints.getModelsPrice.matchPending, (state, { meta }) => {
      const uniqueKeys = meta.arg.originalArgs.body.map((item: any) => ({
        ...item,
        province: meta.arg.originalArgs.province,
      }));

      return {
        ...state,
        ...uniqueKeys.reduce((acc: any, item: any) => {
          acc[`${item.modelKey}|${item.modelYear}|${item.province}`] = {
            trims: [],
            isFetchingPrice: true,
            hasPriceError: false,
          };
          return acc;
        }, {}),
      };
    })
    .addMatcher(priceApi.endpoints.getModelsPrice.matchRejected, (state, { meta }) => {
      const uniqueKeys = meta.arg.originalArgs.body.map((item: any) => ({
        ...item,
        province: meta.arg.originalArgs.province,
      }));

      return {
        ...state,
        ...uniqueKeys.reduce((acc: any, item: any) => {
          acc[`${item.modelKey}|${item.modelYear}|${item.province}`] = {
            trims: [],
            isFetchingPrice: false,
            hasPriceError: true,
          };
          return acc;
        }, {}),
      };
    })
    .addMatcher(priceApi.endpoints.getModelsPrice.matchFulfilled, (state, { payload, meta }) => {
      const uniqueKeys = meta.arg.originalArgs.body.map((item: any) => ({ ...item, province: payload.provinceKey }));

      return {
        ...state,
        ...uniqueKeys.reduce((acc: any, item: any) => {
          acc[`${item.modelKey}|${item.modelYear}|${item.province}`] = {
            trims: payload.models.find((i: any) => i.modelKey === item.modelKey).trims,
            isFetchingPrice: false,
            hasPriceError: false,
          };
          return acc;
        }, {}),
      };
    })
    // * Trim Payment request
    .addMatcher(priceApi.endpoints.getTrimPayment.matchPending, (state, { meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);
      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          payment: {},
          isFetchingPrice: true,
          hasPriceError: false,
        },
      };
    })
    .addMatcher(priceApi.endpoints.getTrimPayment.matchRejected, (state, { meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);
      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          payment: {},
          isFetchingPrice: false,
          hasPriceError: true,
        },
      };
    })
    .addMatcher(priceApi.endpoints.getTrimPayment.matchFulfilled, (state, { payload, meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);
      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          payment: {
            isSellingPriceProvince: payload.isSellingPriceProvince,
            ...payload.paymentOptions?.[0],
          },
          isFetchingPrice: false,
          hasPriceError: false,
        },
      };
    })
    // * Build and Price Summary request
    .addMatcher(priceApi.endpoints.getBuildPriceSummary.matchPending, (state, { meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);
      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          summary: {},
          isFetchingPrice: true,
          hasPriceError: false,
        },
      };
    })
    .addMatcher(priceApi.endpoints.getBuildPriceSummary.matchRejected, (state, { meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);
      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          summary: {},
          isFetchingPrice: false,
          hasPriceError: true,
        },
      };
    })
    .addMatcher(priceApi.endpoints.getBuildPriceSummary.matchFulfilled, (state, { payload, meta }) => {
      const uniqueKey = makeUniquePaymentKey(meta.arg.originalArgs.body);

      const paymentMethod = payload.summaries?.[0]?.paymentMethod;
      const paymentFrequency = payload.summaries?.[0]?.paymentFrequency;
      const summary = payload.summaries?.[0]?.summaries.reduce((acc: any, item: any) => {
        acc[item.key] = item;
        return acc;
      }, {});

      return {
        ...state,
        [uniqueKey]: {
          ...state[uniqueKey],
          summary: {
            isSellingPriceProvince: payload.isSellingPriceProvince,
            paymentMethod,
            paymentFrequency,
            clientRequestId: payload.summaries?.[0]?.clientRequestId,
            ...summary,
          },
          price: {
            allInPrice: {
              value: summary?.[`${paymentMethod}TotalVehiclePrice`]?.value,
              label: meta.arg.originalArgs.additionalParams.allInPriceLabel,
            },
            msrpPrice: {
              value: summary?.[`${paymentMethod}MSRP`]?.value,
              label: meta.arg.originalArgs.additionalParams.msrpPriceLabel,
            },
            discount: {},
          },
          isFetchingPrice: false,
          hasPriceError: false,
        },
      };
    });
});

export const selectorModelTrimsPrice = createSelector(
  (state: any) => state?.modelTrimsPrice,
  (state: any, modelKey: string, modelYear: string, province: string) => `${modelKey}|${modelYear}|${province}`,
  (state: any, uniqueKey: string) => state?.[uniqueKey],
);

/**
 * Returns price object to be used by the price component
 * @param priceLabels prepared by other Components in format like return object
 * @returns {{allInPrice: object, msrpPrice: object }}
 */
const getPrices = (transmission: any, type: string = 'trims') => {
  let valueAllIn;
  let valueMsrp;
  let priceDiscountAmount;
  let msrpWithDiscount;
  let sellingPriceWithDiscount;
  const extColor = transmission?.exteriorColors?.[0];
  switch (type) {
    case 'models':
      valueAllIn = transmission?.exteriorColors?.[0]?.sellingPrice || null;
      valueMsrp = transmission?.exteriorColors?.[0]?.msrp || null;
      priceDiscountAmount = transmission?.priceDiscountAmount;
      msrpWithDiscount = transmission?.exteriorColors?.[0]?.msrpWithDiscount;
      sellingPriceWithDiscount = transmission?.exteriorColors?.[0]?.sellingPriceWithDiscount;
      break;

    case 'trims':
    default:
      valueAllIn = extColor?.sellingPrice || transmission?.exteriorColors?.[0]?.sellingPrice || null;
      valueMsrp = extColor?.msrp || transmission?.exteriorColors?.[0]?.msrp || null;

      priceDiscountAmount = transmission?.priceDiscountAmount;
      msrpWithDiscount = extColor?.msrpWithDiscount;
      sellingPriceWithDiscount = extColor?.sellingPriceWithDiscount;
      break;
  }

  return {
    allInPrice: valueAllIn,
    msrpPrice: valueMsrp,
    discount: {
      priceDiscountAmount,
      msrpWithDiscount,
      sellingPriceWithDiscount,
    },
  };
};

export const useSelectorModelDefaultTrimPrice = (modelKey: string, modelYear: string) => {
  const { t } = useTranslation();
  // @ts-ignore
  const provinceCode = useContext(UserLocationContext)?.provinceCode;
  // @ts-ignore
  const { defaultProvince }: { defaultProvince: any } = useSettings();
  const provinceName = provinceCode || defaultProvince;
  return useSelector(globalState =>
    createSelector(
      (state: any, key: string, year: string, province: string) => selectorModelTrimsPrice(state, key, year, province),
      (model: any) => {
        const transmission = model?.trims?.[0]?.transmissions?.[0];
        const price = getPrices(transmission);
        return {
          prices: {
            allInPrice: {
              value: price.allInPrice,
              label: t('Shared.Common.allInPriceLabel'),
            },
            msrpPrice: {
              value: price.msrpPrice,
              label: t('Shared.Common.msrpStartingFromLabel'),
            },
            discount: price.discount,
          },
          transmission,
          exteriorColor: transmission?.exteriorColors?.[0],
          isFetchingPrice: model?.isFetchingPrice,
          hasPriceError: model?.hasPriceError,
        };
      },
    )(globalState, modelKey, modelYear, provinceName),
  );
};

export const selectorTrimPayment = createSelector(
  (state: any) => state,
  (state: any, trimInfo: any) => makeUniquePaymentKey(trimInfo),
  (state: any, uniqueKey: string) => state?.modelTrimsPrice?.[uniqueKey],
);

export const useSelectorTrimPayment = () => {
  const provincePath = useProvincesPath();
  const trimInfo = flat(useSelector(getTrimInfo));
  const payment = useSelector(state => selectorTrimPayment(state, { ...trimInfo, provinceKey: provincePath }));
  return payment || {};
};

export default modelTrimsPrice;
