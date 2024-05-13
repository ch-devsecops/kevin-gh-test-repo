import React from 'react';
import AppHero from '../../components/AppHero';
import { mockData as storyProps } from './componentProps';

export default {
  title: 'AppHero',
  component: AppHero,
};

const Template = args => <AppHero {...args} />;

export const Default = Template.bind({});

Default.args = storyProps;
