import React from 'react';
import Accessories from '../../components/Accessories';
import { mockData as storyProps } from './componentProps';

export default {
  title: 'Accessories',
  component: Accessories,
};

const Template = args => <Accessories {...args} />;

export const Default = Template.bind({});

Default.args = storyProps;
