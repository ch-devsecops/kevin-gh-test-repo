import React from 'react';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import Tab from '../Tab';

const Placeholders = ({ rendering, activeTabs, tabsParams, sitecoreContext }) => {
  const tabs = rendering.placeholders['tabs-content'].filter(c => c.componentName === 'Tab');
  const activeTab = activeTabs[0];
  const { pageEditing } = sitecoreContext;

  return (
    <Placeholder
      name="tabs-content"
      rendering={rendering}
      renderEach={(component, i) => {
        const componentUid = component?.props?.rendering?.uid;
        const tabIndex = tabs.findIndex(tab => tab.uid === componentUid);
        const tabIsActive = activeTab === tabIndex;

        if (pageEditing) {
          return tabIsActive ? (
            <Tab key={i.toString()} rendering={component.props?.rendering} tabsParams={tabsParams}>
              {component}
            </Tab>
          ) : (
            <Tab display="none" key={i.toString()} rendering={component.props?.rendering} tabsParams={tabsParams}>
              {component}
            </Tab>
          );
        }

        return tabIsActive ? (
          <Tab key={i.toString()} rendering={component.props?.rendering} tabsParams={tabsParams}>
            {component}
          </Tab>
        ) : null;
      }}
    />
  );
};

export default withSitecoreContext()(Placeholders);
