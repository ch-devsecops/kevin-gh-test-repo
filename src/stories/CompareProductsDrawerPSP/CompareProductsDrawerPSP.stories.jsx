import React from 'react';
import CompareProductsDrawer from '../../components/CompareProductsDrawer';
import LocalStorageContext from '../../components/LocalStorageContext/LocalStorageContext';
import mockData from './componentProps';

const localStorageStateMock = {
  toCompareProducts: ['13322', '1111', '1800'],
  isCompareDrawerOpen: true,
  deleteToCompareProducts: () => {},
};

export default {
  title: 'Compare Products Drawer PSP',
  component: CompareProductsDrawer,
};

export const PspVersion = () => (
  <LocalStorageContext.Provider value={localStorageStateMock}>
    <CompareProductsDrawer {...mockData} />
  </LocalStorageContext.Provider>
);
