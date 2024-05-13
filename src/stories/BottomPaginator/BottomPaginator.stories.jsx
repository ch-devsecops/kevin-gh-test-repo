import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import BottomPaginator from '../../components/BottomPaginator';
import storyProps from './BottomPaginatorProps';

export default {
  title: 'Bottom Paginator',
  component: BottomPaginator,
};

const Template = args => (
  <Box style={{ marginTop: '96px' }}>
    <BottomPaginator {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = storyProps;
