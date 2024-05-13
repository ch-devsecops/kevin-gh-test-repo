import React from 'react';
import LocalStorageContext from '../../components/LocalStorageContext/LocalStorageContext';
import SimilarRecentlyViewedProducts from '../../components/SimilarRecentlyViewedProducts';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Similar RecentlyViewed Products',
  component: SimilarRecentlyViewedProducts,
};
const localStorageStateMock = {
  recentlyViewedProducts: ['12094', '12096'],
  toCompareProducts: [],
};

const sitecoreContextMock = sitecoreContext.engine;

const Template = ({ storyProps }) => (
  <LocalStorageContext.Provider value={localStorageStateMock}>
    <SimilarRecentlyViewedProducts {...storyProps} />
  </LocalStorageContext.Provider>
);

export const Engine = Template.bind({});
Engine.args = { storyProps: mockData, context: sitecoreContextMock };
