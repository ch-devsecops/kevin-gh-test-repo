import React from 'react';
import EngineDetailsCard from '../../components/EngineDetailsCard';
import mockData from './engineDetailsCardProps';

export default {
  title: 'Engine Details Card',
  component: EngineDetailsCard,
};

const Template = args => <EngineDetailsCard {...args} />;

export const Default = Template.bind({});
Default.args = mockData;
