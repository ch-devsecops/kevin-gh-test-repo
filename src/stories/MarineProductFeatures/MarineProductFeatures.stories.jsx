import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import Accordion from '../../components/Accordion';
import MarineProductFeatures from '../../components/MarineProductFeatures';
import { mockData, mockDataAccordion } from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Marine Product Features',
  component: MarineProductFeatures,
};

const sitecoreContextMock = sitecoreContext.marine;

const Template = ({ storyProps }) => (
  <Box mx="l">
    <Accordion {...storyProps} />
  </Box>
);

export const Default = Template.bind({});
Default.args = { storyProps: mockDataAccordion, context: sitecoreContextMock };

const TemplateMarineProductFeatures = ({ storyProps }) => (
  <Box mx="l">
    <MarineProductFeatures {...storyProps} />
  </Box>
);

export const OnlyMarineProductFeatures = TemplateMarineProductFeatures.bind({});
OnlyMarineProductFeatures.args = { storyProps: mockData, context: sitecoreContextMock };
