import React from 'react';
import Accordion from '../../components/Accordion';
import { mockData as storyProps } from './componentProps';

export default {
  title: 'Accordion',
  component: Accordion,
};

const Template = args => <Accordion {...args} />;

export const Default = Template.bind({});

Default.args = storyProps;
