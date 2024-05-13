import React from 'react';
import CompareProductsDrawer from '../../components/CompareProductsDrawer';
import LocalStorageContext from '../../components/LocalStorageContext/LocalStorageContext';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

const localStorageStateMock = {
  toCompareProducts: ['12094'],
  isCompareDrawerOpen: true,
};

export default {
  title: 'Compare Products Drawer',
  component: CompareProductsDrawer,
};

const sitecoreContextMock = sitecoreContext.engine;

const Template = ({ storyProps }) => (
  <LocalStorageContext.Provider value={localStorageStateMock}>
    <CompareProductsDrawer {...storyProps} />
  </LocalStorageContext.Provider>
);

export const Engine = Template.bind({});
Engine.args = { storyProps: mockData, context: sitecoreContextMock };
