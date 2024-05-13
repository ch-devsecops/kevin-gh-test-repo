import React from 'react';
import css from '@styled-system/css';
import { ThemeStyles, Box, Copy, useThemeContext } from '@honda-canada/design-system-react';
import { ACURA_THEME_NAME, HONDA_THEME_NAME } from './utils/constants';

const themeStyles = new ThemeStyles();

themeStyles.addBaseStyles('Content')(({ theme }) =>
  css({
    height: [theme.header.mobile.height, theme.header.desktop.height],
    bg: '#cccccc',
    position: 'sticky',
    top: 0,
    zIndex: 'sectionNav',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 'xs',
    paddingRight: 'xs',
  }),
);

const Header = themeStyles.apply(Box, 'Content');

const MockLegacyHeader = () => {
  const { name } = useThemeContext();
  return name === ACURA_THEME_NAME || name === HONDA_THEME_NAME ? (
    <Header>
      <Copy size="legal" textAlign="center">
        A mock legacy header for local dev. Always test in a JSS app.
      </Copy>
    </Header>
  ) : null;
};

export default MockLegacyHeader;
