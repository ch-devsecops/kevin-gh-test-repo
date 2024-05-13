import React from 'react';
import Footer from '../../components/Footer';
import mockData from './footerProps';

export default {
  title: 'Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

const renderContent = n => {
  const content = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    content.push(<p key={i}>Footer</p>);
  }
  return content;
};

const Template = args => (
  <>
    {renderContent(20)}
    <Footer {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = mockData.placeholders['jss-footer'][0];
