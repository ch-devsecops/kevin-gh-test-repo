import React from 'react';
import EngineSeries from '../../components/EngineSeries';
import mockData from './componentProps';

export default {
  title: 'Engine Series',
  component: EngineSeries,
};

const Template = args => <EngineSeries {...args} />;

export const Default = Template.bind({});
Default.args = mockData;
