import React from 'react';
import SidebarLayout from '../../components/SidebarLayout';

export default {
  title: 'SidebarLayout',
  component: SidebarLayout,
};

const Template = () => <SidebarLayout params={{ bgColourRightCol: 'grey' }} />;

export const Default = Template.bind({});
