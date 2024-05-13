import React from 'react';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import { varian1MockData, mockSitecoreContext } from '../Header/componentProps';
import footerMockData from '../Footer/footerProps';
import { variant1 } from '../../components/Header/service/constants';

export default {
  title: 'Header Page',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

const renderContent = n => {
  const content = [];
  for (let i = 0; i < n; i++) {
    content.push(<p key={i}>Header</p>);
  }
  return content;
};

export const Template = () => (
  <>
    <SitecoreContext context={mockSitecoreContext} componentFactory={{}}>
      <Header variant={variant1} {...varian1MockData} />
    </SitecoreContext>
    {renderContent(80)}
    <Footer {...footerMockData.placeholders['jss-footer'][0]} />
  </>
);
