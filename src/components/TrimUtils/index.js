import { UserLocationContext } from '@honda-canada/user-location';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import inventoryDealerDetails from '../../core/reducers/inventoryDealerDetails';
import isSSR from '../../utils/isSSR';
import modelTrimsPrice from '../../core/reducers/modelTrimsPrice';
import safelyStringifyJSON from '../../utils/safelyStringifyJSON';
import usePriceFlagsForProvince from '../PriceComponent/utils';
import inventoryVehicleDetails, {
  getTrimInfo,
  setCurrentTrim,
  setTrim,
} from '../../core/reducers/inventoryVehicleDetails';

import { ACURA_SITE_NAME, HONDA_SITE_NAME } from '../../utils/constants';
import {
  getTrimPaymentRequestObject,
  getTrimPaymentResponseObject,
  getTrimSummaryResponseObject,
} from '../../apiHooks/utils';
import { paymentConfigs } from './constants';
import {
  priceApi,
  useGetBuildPriceSummaryQuery,
  useGetModelsPriceQuery,
  useGetTrimPaymentQuery,
} from '../../core/api/priceApi';
import { useAppName, useSettings } from '../../utils/sitecoreContext';

/**
 * @typedef {Object} Trim
 * @property {string} trimKey
 * @property {string} modelKey
 * @property {string} modelYear
 * @property {string} transmissionKey
 * @property {string} exteriorColorKey
 * @property {string} [interiorColorKey]
 *
 * @param {Trim} [trim]
 * @param {string} [paymentFrequency]
 * @param {string} [paymentMethod]
 * @param {Function} [formatter]
 * @param {boolean} [shouldFetch]
 * @param {string} [vehicleType]
 * @return {{ payment: Object, hasError: boolean, isFetching: boolean, isSellingPriceProvince: boolean }}
 */
export const useFetchPayment = ({
  trim,
  paymentFrequency,
  paymentMethod,
  shouldFetch = true,
  formatter,
  vehicleType,
  isSellingPriceProvince,
  includeFees,
}) => {
  const { t } = useTranslation();
  const { defaultProvince } = useSettings();
  const provinceCode = useContext(UserLocationContext)?.provinceCode || defaultProvince;
  const { showSellingPrice } = usePriceFlagsForProvince();
  const appName = useAppName();

  // RTK query
  const { getPayment, result: resultPayment } = useGetTrimPaymentQuery({ vehicleType });
  const { getSummary, result: resultSummary } = useGetBuildPriceSummaryQuery({ vehicleType });

  const trimDependency = safelyStringifyJSON(trim);

  useEffect(() => {
    const isValid = trim?.trimKey && trim?.modelKey && trim?.modelYear && paymentFrequency && paymentMethod;
    if (shouldFetch && isValid) {
      const body = getTrimPaymentRequestObject({
        appName,
        provinceCode,
        defaultProvince,
        trim,
        paymentOptions: { paymentFrequency, paymentMethod },
        isSellingPriceProvince: isSellingPriceProvince ?? showSellingPrice,
        includeFees,
      });
      getPayment(body);
      getSummary(body, {
        allInPriceLabel: t('Shared.Common.sellingPriceLabel'),
        msrpPriceLabel: t('Shared.Common.msrpStartingFromLabel'),
      });
    }
  }, [
    paymentFrequency,
    paymentMethod,
    appName,
    provinceCode,
    defaultProvince,
    showSellingPrice,
    isSellingPriceProvince,
    includeFees,
    trimDependency,
  ]);

  const {
    data: dataPayment,
    isError: isErrorPayment,
    isFetching: isFetchingPayment,
    isLoading: isLoadingPayment,
    error: errorPayment,
  } = resultPayment ?? {};
  const {
    data: dataSummary,
    isError: isErrorSummary,
    isFetching: isFetchingSummary,
    isLoading: isLoadingSummary,
    error: errorSummary,
  } = resultSummary ?? {};

  return {
    payment: formatter && dataPayment ? formatter(dataPayment) : getTrimPaymentResponseObject(appName, dataPayment),
    summary: formatter && dataSummary ? formatter(dataSummary) : getTrimSummaryResponseObject(appName, dataSummary),
    includeFees,
    isSellingPriceProvince: isSellingPriceProvince ?? showSellingPrice,
    isFetching: isFetchingPayment || isFetchingSummary,
    isLoading: isLoadingPayment || isLoadingSummary,
    hasError: isErrorPayment || isErrorSummary,
    error: { errorPayment, errorSummary },
  };
};

export const useAllVehicleEffectsNext = paymentMethod => {
  const appName = useAppName();
  const { trim, includeFees, isSellingPriceProvince } = useSelector(getTrimInfo);
  const { modelKey, modelYear } = trim || {};
  const getPrice = useGetModelsPriceQuery({ body: [{ modelKey, modelYear }] });

  useEffect(() => {
    if (modelKey && modelYear) {
      getPrice();
    }
  }, [modelKey, modelYear]);

  let paymentFrequency;

  switch (appName) {
    case HONDA_SITE_NAME:
    case ACURA_SITE_NAME:
      paymentFrequency = paymentConfigs[appName]?.[paymentMethod]?.frequency;
      break;
    default:
      break;
  }
  useFetchPayment({
    trim,
    paymentFrequency,
    paymentMethod,
    shouldFetch: !!paymentMethod,
    isSellingPriceProvince,
    includeFees,
  });
};

export const useAllVehicleEffects = (params, paymentMethodType) => {
  const dispatch = useDispatch();
  let searchParams;

  if (!isSSR()) {
    searchParams = new URLSearchParams(decodeURIComponent(window?.location?.search));
  }

  useEffect(() => {
    params.injectedReducer(inventoryDealerDetails, 'inventoryDealerDetails');
    params.injectedReducer(inventoryVehicleDetails, 'inventoryVehicleDetails');
    params.injectedReducer(modelTrimsPrice, 'modelTrimsPrice');
    params.injectedApi(priceApi);

    const allParams = Array.from(searchParams?.entries()).reduce((acc, item) => {
      acc[item[0]] = item[1];
      return acc;
    }, {});

    dispatch(setCurrentTrim(allParams.trimKey));
    dispatch(
      setTrim({
        trim: allParams,
        trimKey: allParams.trimKey,
      }),
    );
  }, []);

  useAllVehicleEffectsNext(paymentMethodType);
};
