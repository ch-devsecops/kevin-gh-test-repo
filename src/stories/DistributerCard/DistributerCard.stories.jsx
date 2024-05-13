import React from 'react';
import DistributorCard from '../../components/DistributerCard';
import storyProps from './componentProps';

export default {
  title: 'Distributor Card',
  component: DistributorCard,
};

const Template = args => <DistributorCard {...args} />;

export const Default = Template.bind({});
Default.args = storyProps;
