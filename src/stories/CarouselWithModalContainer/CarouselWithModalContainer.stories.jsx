import React from 'react';
import CarouselWithModalContainer from '../../components/CarouselWithModalContainer';
import { mockData as storyProps } from './componentProps';

export default {
  title: 'Carousel With Modal Container',
  component: CarouselWithModalContainer,
};

const Template = args => <CarouselWithModalContainer {...args} />;

export const Default = Template.bind({});
Default.args = storyProps;
