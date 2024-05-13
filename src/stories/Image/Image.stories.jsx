import React from 'react';
import Image from '../../components/Image';
import mockData, { performanceCurveMockData, dimensionDiagramMockData } from './imageProps';

export default {
  title: 'Image',
  component: Image,
};

const Template = args => <Image {...args} />;

export const Default = Template.bind({});
Default.args = mockData;

export const PerformanceCurve = Template.bind({});
PerformanceCurve.args = performanceCurveMockData;

export const DimensionDiagram = Template.bind({});
DimensionDiagram.args = dimensionDiagramMockData;
