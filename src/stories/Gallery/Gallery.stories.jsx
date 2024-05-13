import React from 'react';
import Gallery from '../../components/Gallery';
import props from './componentProps';

export default {
  title: 'Gallery',
  component: Gallery,
};

const Template = args => <Gallery {...args} />;

export const Default = Template.bind({});
Default.args = props;
