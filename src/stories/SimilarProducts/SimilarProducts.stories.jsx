import React from 'react';
import LocalStorageContext from '../../components/LocalStorageContext/LocalStorageContext';
import SimilarProducts from '../../components/SimilarProducts';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Similar Products PSP',
  component: SimilarProducts,
  parameters: {
    layout: 'fullscreen',
  },
};
const localStorageStateMock = {
  recentlyViewedProducts: ['12094', '12096'],
  toCompareProducts: [],
};

const sitecoreContextMock = sitecoreContext.psp;

const Template = ({ storyProps }) => (
  <LocalStorageContext.Provider value={localStorageStateMock}>
    <SimilarProducts {...storyProps} />
  </LocalStorageContext.Provider>
);

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
