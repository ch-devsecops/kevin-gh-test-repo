import React from 'react';
import VehicleListFilters from '../../components/VehicleListFilters/index';
import mockData from './componentProps';

export default {
  title: 'Filter Options',
  component: VehicleListFilters,
};

// Updated Template function to use the mockData structure
const Template = () => <VehicleListFilters filterOptionsList={mockData} />;

export const Default = Template.bind({});
