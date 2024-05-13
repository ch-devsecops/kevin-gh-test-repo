import React from 'react';
import FAQ from '../../components/FAQ';
import props from './componentProps';

export default {
  title: 'FAQ',
  component: FAQ,
};

const Template = args => <FAQ {...args} />;

export const Default = Template.bind({});
Default.args = props;
