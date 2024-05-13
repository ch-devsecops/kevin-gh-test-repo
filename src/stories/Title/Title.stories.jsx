import React from 'react';
import Title from '../../components/Title';
import props from './componentProps';

export default {
  title: 'Title',
  component: Title,
};

const Template = args => <Title {...args} />;

export const Default = Template.bind({});
Default.args = props.placeholders['jss-main'][0];
