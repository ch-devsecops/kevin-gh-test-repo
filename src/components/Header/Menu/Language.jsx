import React, { useContext } from 'react';
import { Box, Popover, Copy, Link } from '@honda-canada/design-system-react';

import { PropItemType } from '../../../utils/propTypes';
import { getGtmTagValue } from '../../../utils/gtmEvents';
import HeaderContext from '../service/HeaderContext';

import themeStyles from '../Header.styles';

const NavItem = themeStyles.apply(Box, 'NavItem');
const LangMenu = themeStyles.apply(Box, 'LangMenu');
const LangItem = themeStyles.apply(Link, 'LangItem');

const LanguageMenu = ({ languageMenu }) => {
  const { styles } = useContext(HeaderContext);
  const dropdownItems = languageMenu?.items?.[0]?.items?.map(({ label, url }) => (
    <LangItem
      as="a"
      href={url?.href}
      key={label}
      aria-label={label}
      data-testid="header-language-item"
      data-tracking-label={`Language > ${label}`}
      data-gtm-nav-type="global"
      {...styles?.headerMenuLanguageStyle}
    >
      {label}
    </LangItem>
  ));

  if (!languageMenu?.items?.[0]?.items?.length) {
    return null;
  }

  return (
    <Popover
      content={<LangMenu data-testid="header-language-menu-flyout">{dropdownItems}</LangMenu>}
      position="bottom-end"
    >
      <NavItem
        as="button"
        type="language"
        tabIndex={0}
        data-testid="header-language-menu"
        data-tracking-label={getGtmTagValue(languageMenu?.current?.toUpperCase())}
        {...styles.navItemSecondary}
      >
        <Copy as="span" d="inline" data-testid="header-language-code">
          {languageMenu?.current?.toUpperCase()}
        </Copy>
      </NavItem>
    </Popover>
  );
};

LanguageMenu.propTypes = {
  languageMenu: PropItemType,
};

export default LanguageMenu;
