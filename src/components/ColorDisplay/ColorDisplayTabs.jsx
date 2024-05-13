import React from 'react';
import styled from 'styled-components';
import { Row, Column, Tab, Markdown } from '@honda-canada/design-system-react';
import { stripMarkdownHeading } from '../../utils/markdown';
import { ACURA_THEME_NAME } from '../../utils/constants';

const TabTitle = styled(Markdown)(({ theme }) => ({
  fontFamily: theme.name === ACURA_THEME_NAME ? theme.fonts.heading : theme.fonts.bold,
}));

const ColorDisplayTabs = ({ tabs, activeTab, setActiveTab, isDark }) => (
  <Row pl={['m', 'm', 'zero']} height={['45px', '68px']}>
    {tabs.map((title, i) => (
      <Column key={i.toString()} pl="zero" pr="l" height="100%">
        <Tab
          key={i.toString()}
          isActive={activeTab === i}
          onClick={() => setActiveTab(i)}
          bg={isDark ? 'black' : 'white'}
        >
          <TabTitle size="small" color={isDark ? 'white' : 'typographyDefault'}>
            {stripMarkdownHeading(title)}
          </TabTitle>
        </Tab>
      </Column>
    ))}
  </Row>
);

export default ColorDisplayTabs;
