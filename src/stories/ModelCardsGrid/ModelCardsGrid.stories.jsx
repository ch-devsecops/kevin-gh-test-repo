import React, { useState } from 'react';
import { UserLocationContext } from '@honda-canada/user-location';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box, Toggle, Label } from '@honda-canada/design-system-react';

import { HONDA_SITE_NAME, ACURA_SITE_NAME } from '../../utils/constants';
import ModelCardGridUI from '../../components/ModelCardGrid';
import mockProp from '../../components/ModelCardGrid/__mocks__/mockProps.json';

export default {
  title: 'Model Card Grid',
  component: ModelCardGridUI,
  parameters: {
    layout: 'fullscreen',
  },
};

const locationContextMock = { provinceCode: 'ON', isFetchingUserLocation: false };

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
      <UserLocationContext.Provider value={locationContextMock}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Label mr="s">Honda</Label>
          <Toggle onChange={setToggle} />
          <Label ml="s">Acura</Label>
        </Box>

        <ModelCardGridUI {...args} />
      </UserLocationContext.Provider>
    </SitecoreContext>
  );
};

export const Default = Template.bind({});
Default.args = mockProp;
