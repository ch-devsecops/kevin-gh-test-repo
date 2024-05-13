import React from 'react';
import CompareProducts from '../../components/CompareProducts';
import mockData from './componentProps';
import specsApiMock from './__mocks__/specsApiMock.json';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Product Compare',
  component: CompareProducts,
  parameters: {
    layout: 'fullscreen',
  },
};

const sitecoreContextMock = sitecoreContext.engine;

const Template = ({ storyProps }) => <CompareProducts specsApiMock={specsApiMock.specs} {...storyProps} />;

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
