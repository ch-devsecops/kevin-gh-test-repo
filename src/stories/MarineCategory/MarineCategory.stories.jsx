import React from 'react';
import MarineCategory from '../../components/MarineCategory';
import mockData from './componentProps';

export default {
  title: 'Marine Category',
  component: MarineCategory,
};

const Template = args => <MarineCategory {...args} />;

export const Default = Template.bind({});
Default.args = mockData;
