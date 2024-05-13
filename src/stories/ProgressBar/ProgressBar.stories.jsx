import React, { useState } from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box, Toggle, Label } from '@honda-canada/design-system-react';
import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import ProgressBar from '../../components/ProgressBar';
import DealerBanner from '../../components/DealerBanner';
import dealerBannerMockProps from '../DealerBanner/componentProps';
import storyProps from './componentProps';

export default {
  title: 'Progress Bar',
  component: ProgressBar,
};

const Template = args => {
  const [toggle, setToggle] = useState(false);

  const mockSitecoreContext = {
    site: {
      name: toggle ? ACURA_SITE_NAME : HONDA_SITE_NAME,
    },
    pageState: 'normal',
    hondaRestApiHost: 'uat-api.honda.ca',
  };
  return (
    <SitecoreContext context={mockSitecoreContext} componentFactory={{}}>
      <Box height="200vh">
        <Box bg="grey.1" height={['42px', '84px']} position="sticky" top="0px">
          Header
        </Box>
        <DealerBanner {...dealerBannerMockProps} />
        <Box bg="grey.3" height="61px" position="sticky" display={['block', 'none']} top={['91px']}>
          Filter
        </Box>
        <ProgressBar {...args} />
        <Box display="flex" justifyContent="center" alignItems="center" mt="150px">
          <Label mr="s">Honda</Label>
          <Toggle onChange={setToggle} />
          <Label ml="s">Acura</Label>
        </Box>
      </Box>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = storyProps;
