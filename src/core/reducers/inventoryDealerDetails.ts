/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
import { createAction, createReducer, createSelector, type PayloadAction } from '@reduxjs/toolkit';

type DealerStateProps = {
  dealerCode: string;
  dealerName: string;
};

const initialState: DealerStateProps = {
  dealerCode: '8888',
  dealerName: 'Honda Downtown',
};

export const setDealerCode = createAction<string>('inventoryDealerDetails/setDealerCode');
export const setDealerName = createAction<string>('inventoryDealerDetails/setDealerName');

const inventoryDealerDetails = createReducer(initialState, builder => {
  builder
    .addCase(setDealerCode, (state, action: PayloadAction<string>) => {
      state.dealerCode = action.payload;
    })
    .addCase(setDealerName, (state, action: PayloadAction<string>) => {
      state.dealerName = action.payload;
    });
});

export const getDealerInfo = createSelector(
  (state: any) => state.inventoryDealerDetails,
  dealerDetails => ({
    dealerCode: dealerDetails?.dealerCode ?? '',
    dealerName: dealerDetails?.dealerName ?? '',
  }),
);

export default inventoryDealerDetails;
