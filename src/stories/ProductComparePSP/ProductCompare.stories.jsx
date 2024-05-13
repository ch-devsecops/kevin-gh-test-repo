import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';

import CompareProducts from '../../components/CompareProducts';
import { PSP_SITE_NAME } from '../../utils/constants';

import mockData from './componentProps';
import specsApiMock from './__mocks__/specsApiMock.json';

export default {
  title: 'Product Compare PSP',
  component: CompareProducts,
  parameters: {
    layout: 'fullscreen',
  },
};

const mockSitecoreContext = {
  site: {
    name: PSP_SITE_NAME,
  },
  pageState: 'normal',
  hondaRestApiHost: 'uat-api.honda.ca',
};

const Template = args => (
  <SitecoreContext context={mockSitecoreContext} componentFactory={{}}>
    <CompareProducts specsApiMock={specsApiMock.specs} {...args} />
  </SitecoreContext>
);

export const Default = Template.bind({});
Default.args = mockData;
