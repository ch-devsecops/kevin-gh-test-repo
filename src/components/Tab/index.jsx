import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

const Tab = ({ rendering, tabsParams, display = 'block' }) => (
  <div style={{ display }}>
    <Placeholder name="tab-content" rendering={rendering} tabsParams={tabsParams} />
  </div>
);

export default Tab;
