import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import ColorDisplay from '../../components/ColorDisplay';
import mockData from './componentProps';
import sitecoreContext from '../../sitecoreContextMocks/sitecoreContext';

export default {
  title: 'Color Display',
  component: ColorDisplay,
};

const sitecoreContextMock = sitecoreContext.acura;
const props = mockData.placeholders['jss-main'][0].placeholders['side-nav-column-right'][0];

const Template = ({ storyProps }) => (
  <Box maxWidth="maxWidth" ml="250px">
    <ColorDisplay {...storyProps} />
  </Box>
);

export const Acura = Template.bind({});
Acura.args = { storyProps: props, context: sitecoreContextMock };
