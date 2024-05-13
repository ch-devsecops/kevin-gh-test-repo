/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
import { createAction, createReducer, createSelector, type PayloadAction } from '@reduxjs/toolkit';

type TrimStateProps = {
  includeFees?: boolean | undefined; // Include tax
  isSellingPriceProvince?: boolean | undefined; // true if fee ON
  paymentOptions?: {
    paymentMethod: string;
    paymentFrequency: string;
  };
  trim?: {
    exteriorColorKey: string;
    interiorColorKey?: string; // optional
    modelKey: string;
    modelYear: string;
    transmissionKey: string;
    trimKey: string;
  };
};

type InitialStateProps = {
  currentTrim: string;
  trims: {
    [key: string]: TrimStateProps;
  };
};

interface PayloadProps extends TrimStateProps {}

export const setCurrentTrim = createAction<PayloadProps>('inventoryVehicleDetails/setCurrentTrim');
export const setPricingIncludeFee = createAction<PayloadProps>('inventoryVehicleDetails/setPricingIncludeFee');
export const setPricingIncludeTax = createAction<PayloadProps>('inventoryVehicleDetails/setPricingIncludeTax');
export const setIsSellingPriceProvince = createAction<PayloadProps>(
  'inventoryVehicleDetails/setIsSellingPriceProvince',
);
export const setIncludeFees = createAction<PayloadProps>('inventoryVehicleDetails/setIncludeFees');
export const setPaymentOptions = createAction<PayloadProps>('inventoryVehicleDetails/setPaymentOptions');
export const setTrim = createAction<PayloadProps>('inventoryVehicleDetails/setTrim');

const initialTrimState: TrimStateProps = {
  includeFees: false,
  isSellingPriceProvince: false,
  paymentOptions: {
    paymentMethod: '',
    paymentFrequency: '',
  },
  trim: {
    exteriorColorKey: '',
    interiorColorKey: '',
    modelKey: '',
    modelYear: '',
    transmissionKey: '',
    trimKey: '',
  },
};

const initialState: InitialStateProps = {
  currentTrim: '',
  trims: {},
};

const inventoryVehicleDetails = createReducer(initialState, builder => {
  builder
    .addCase(setCurrentTrim, (state: InitialStateProps, action: PayloadAction<PayloadProps>) => {
      // @ts-ignore: Object is possibly 'undefined'.
      state.currentTrim = action.payload;
    })
    .addCase(setIncludeFees, (state: InitialStateProps, action: PayloadAction<PayloadProps>) => {
      if (!state.trims[state.currentTrim]) {
        state.trims[state.currentTrim] = { ...initialTrimState, includeFees: action.payload.includeFees };
        return state;
      }
      // @ts-ignore: Object is possibly 'undefined'.
      state.trims[state.currentTrim].includeFees = action.payload.includeFees;
      return state;
    })
    .addCase(setIsSellingPriceProvince, (state: InitialStateProps, action: PayloadAction<PayloadProps>) => {
      if (!state.trims[state.currentTrim]) {
        state.trims[state.currentTrim] = {
          ...initialTrimState,
          isSellingPriceProvince: action.payload.isSellingPriceProvince,
        };
        return state;
      }
      // @ts-ignore: Object is possibly 'undefined'.
      state.trims[state.currentTrim].isSellingPriceProvince = action.payload.isSellingPriceProvince;
      return state;
    })
    .addCase(setPaymentOptions, (state: InitialStateProps, action: PayloadAction<PayloadProps>) => {
      if (!state.trims[state.currentTrim]) {
        state.trims[state.currentTrim] = { ...initialTrimState, paymentOptions: action.payload.paymentOptions };
        return state;
      }
      // @ts-ignore: Object is possibly 'undefined'.
      state.trims[state.currentTrim].paymentOptions = action.payload.paymentOptions;
      return state;
    })
    .addCase(setTrim, (state: InitialStateProps, action: PayloadAction<PayloadProps>) => {
      if (!state.trims[state.currentTrim]) {
        state.trims[state.currentTrim] = { ...initialTrimState, trim: action.payload.trim };
        return state;
      }
      // @ts-ignore: Object is possibly 'undefined'.
      state.trims[state.currentTrim].trim = action.payload.trim;
      return state;
    });
});

export const getTrimInfo = createSelector(
  (state: any) => state?.inventoryVehicleDetails?.trims,
  (state: any) => state?.inventoryVehicleDetails?.currentTrim,
  (state: any, currentTrim: string) => state?.[currentTrim] || {},
);

export const getTrimDetails = createSelector(
  (state: any) => state?.inventoryVehicleDetails?.trims,
  (state: any) => state?.inventoryVehicleDetails?.currentTrim,
  (state: any, currentTrim: string) => state?.[currentTrim]?.trim || {},
);

export default inventoryVehicleDetails;
