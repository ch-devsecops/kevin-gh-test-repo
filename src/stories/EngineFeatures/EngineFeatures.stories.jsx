import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import EngineFeatures from '../../components/EngineFeatures';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Engine Features',
  component: EngineFeatures,
};

const sitecoreContextMock = sitecoreContext.engine;

const Template = ({ storyProps }) => (
  <Box mx="l">
    <EngineFeatures {...storyProps} />
  </Box>
);

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
