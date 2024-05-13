import React from 'react';
import MarineProductSpecifications from '../../components/MarineProductSpecifications';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'MarineProductSpecifications',
  component: MarineProductSpecifications,
};

const sitecoreContextMock = sitecoreContext.marine;

const Template = ({ storyProps }) => <MarineProductSpecifications {...storyProps} />;

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
