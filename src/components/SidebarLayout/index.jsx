import React from 'react';
import { Box } from '@honda-canada/design-system-react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';

import themeStyles from './SidebarLayout.styles';
import { colourTokenForParam } from '../../utils/sitecoreFields';

const Wrapper = themeStyles.apply(Box, 'Wrapper');
const Main = themeStyles.apply(Box, 'Main');
const MainContent = themeStyles.apply(Box, 'MainContent');
const SidebarContent = themeStyles.apply(Box, 'SidebarContent');
const Sidebar = themeStyles.apply(Box, 'Sidebar');

const SidebarLayout = ({ rendering, params }) => {
  const sidebarBackgroundColor = colourTokenForParam[params?.bgColourRightCol?.toLowerCase()];

  return (
    <Wrapper>
      <Main>
        <MainContent mx="m">
          <Placeholder name="sidebar-column-left" rendering={rendering} />
        </MainContent>
      </Main>
      <Sidebar as="aside" backgroundColor={sidebarBackgroundColor || 'white'}>
        <SidebarContent mx="m">
          <Placeholder name="sidebar-column-right" rendering={rendering} />
        </SidebarContent>
      </Sidebar>
    </Wrapper>
  );
};

export default SidebarLayout;
