import React from 'react';
import ModelCardWithTrims from '../../components/ModelCardWithTrims';
import mockData from './componentProps';
import { variant3 } from '../../components/ModelCardWithTrims/service/constants';
import ModelFiltersContextProvider from '../../components/ModelFiltersContext';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Marine Category With Products',
  component: ModelCardWithTrims,
};

const sitecoreContextMock = sitecoreContext.marine;

const Template = ({ storyProps }) => (
  <ModelFiltersContextProvider>
    <ModelCardWithTrims {...storyProps} variant={variant3} />
  </ModelFiltersContextProvider>
);

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
