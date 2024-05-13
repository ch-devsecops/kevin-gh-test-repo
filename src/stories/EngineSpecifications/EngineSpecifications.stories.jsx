import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import EngineSpecifications from '../../components/EngineSpecifications';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Engine Specifications',
  component: EngineSpecifications,
};

const sitecoreContextMock = sitecoreContext.engine;

const Template = ({ storyProps }) => (
  <Box mx={['s', 'giant']}>
    <EngineSpecifications {...storyProps} />
  </Box>
);

export const Default = Template.bind({});
Default.args = { storyProps: mockData, context: sitecoreContextMock };
