import React from 'react';
import Header from '../../components/Header/Header';
import { varian1MockData, variant2MockData, mockSitecoreContext } from './componentProps';
import { variant1, variant2 } from '../../components/Header/service/constants';

export default {
  title: 'Header',
  component: Header,
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

export const Variant1WithSecondaryNavRight = ({ storyProps }) => (
  <>
    <Header {...storyProps} variant={variant1} />
    {renderContent(105)}
  </>
);
Variant1WithSecondaryNavRight.args = { storyProps: varian1MockData, context: mockSitecoreContext };

export const Variant2WithSecondaryNavTop = ({ storyProps }) => (
  <>
    <Header {...storyProps} variant={variant2} />
    {renderContent(105)}
  </>
);
Variant2WithSecondaryNavTop.args = {
  storyProps: variant2MockData?.[0],
  context: mockSitecoreContext,
};
