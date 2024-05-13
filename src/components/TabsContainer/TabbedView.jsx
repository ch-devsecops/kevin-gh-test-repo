import React, { useState } from 'react';
import { compiler } from 'markdown-to-jsx';
import styled from 'styled-components';
import { Row, Column, Copy, Tab } from '@honda-canada/design-system-react';
import { stripMarkdownHeading, getTitleComponent } from '../../utils/markdown';
import Placeholders from './Placeholders';

const Tabs = styled(Row)`
  @media not screen {
    display: none;
  }
`;

const TabbedView = ({ rendering, tabs = [], pageEditing, gtmTags = {}, isDark }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isInit, setIsInit] = useState(true);

  const anchorId = rendering?.fields?.anchorId?.value;

  return (
    <div id={anchorId} data-gtm-component-type={gtmTags.type} data-gtm-category={gtmTags.category}>
      <Tabs
        justifyContent={['space-around', 'center']}
        height="45px"
        backgroundColor={isDark ? 'black' : 'white'}
        flexWrap={['nowrap', 'wrap']}
      >
        {tabs.map((item, i) => {
          const Title = getTitleComponent(item.title, Copy);
          const preparedGtmTags = {
            ...(item.gtmTitle && { 'data-gtm-title': item.gtmTitle }),
            ...(gtmTags.interactionType && { 'data-gtm-interaction-type': gtmTags.interactionType }),
          };
          return (
            <Column
              key={item.title}
              pl={['zero', 'm']}
              pr={['zero', 'm']}
              width={[1 / 2, 'auto']}
              textAlign="center"
              height="100%"
            >
              <Tab
                isActive={activeTab === i}
                onClick={() => setActiveTab(i)}
                backgroundColor={isDark ? 'black' : 'white'}
                width={['100%', 'auto']}
                {...preparedGtmTags}
              >
                <Title fontWeight="bold" size="small" color={isDark ? 'white' : undefined}>
                  {compiler(stripMarkdownHeading(item.title))}
                </Title>
              </Tab>
            </Column>
          );
        })}
      </Tabs>
      <Placeholders
        rendering={rendering}
        activeTabs={[activeTab]}
        pageEditing={pageEditing}
        tabsParams={{ setActiveTab, isInit, setIsInit }}
      />
    </div>
  );
};

export default TabbedView;
