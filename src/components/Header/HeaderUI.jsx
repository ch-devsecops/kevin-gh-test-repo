import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Box, Wrapper, Row as DsRow, Image, Optional, Media } from '@honda-canada/design-system-react';

import RoutableSitecoreLink from '../RoutableSitecoreLink';
import { PlaceholderType, PropItemsType, PropItemType } from '../../utils/propTypes';
import useEventHandler from '../../utils/hooks/useEventHandler';

import HeaderProvider from './service/HeaderProvider';
import { Mobile, Main } from './Menu';
import HeaderMobileButton from './HeaderMobileButton';

import themeStyles from './Header.styles';
import HeaderContext from './service/HeaderContext';
import SecondaryNav from './Menu/SecondaryNav';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';

const Container = themeStyles.apply(Wrapper, 'Container');
const Row = themeStyles.apply(DsRow, 'Row');
const Column = themeStyles.apply(Box, 'Column');
const MainColumn = themeStyles.apply(Box, 'Column');
const SecondaryColumn = themeStyles.apply(Box, 'Column');
const MobileRightNav = themeStyles.apply(Box, 'Column');
const Nav = themeStyles.apply(Box, 'Nav');
const Logo = themeStyles.apply(Box, 'Logo');
const HeaderBar = themeStyles.apply(Box, 'HeaderBar');
const MegaMenuMask = themeStyles.apply(Box, 'MegaMenuMask');

const HeaderComponent = ({ languageMenu, primaryItems, secondaryItems, siteLogo, gtmTags }) => {
  const {
    activeMenu,
    setActiveMenu,
    config: { showSecondaryMenuOnTop },
    styles,
  } = useContext(HeaderContext);
  const { headerHiddenOnScroll } = useContext(BottomElementContext);
  const handleAction = useEventHandler(setActiveMenu);
  const { t } = useTranslation();

  return (
    <>
      <Nav
        as="nav"
        tabIndex="-1"
        data-gtm-component-type={gtmTags.type}
        data-testid="header-nav-container"
        {...styles.nav}
        headerHiddenOnScroll={headerHiddenOnScroll}
      >
        <HeaderBar {...styles.headerBar}>
          <Container>
            <Row>
              <Column {...styles.logoColumn}>
                <HeaderMobileButton />
                <Logo
                  as={RoutableSitecoreLink}
                  field={siteLogo?.headerUrl}
                  data-testid="header-logo"
                  aria-label={t('Shared.Header.siteLogoAria')}
                  {...styles.logo}
                >
                  <Image {...siteLogo?.siteLogo} />
                </Logo>
              </Column>
              <MainColumn {...styles.mainColumn} data-testid="header-top-navigation-menu">
                <Optional when={showSecondaryMenuOnTop}>
                  <Box textAlign="right" mb="m" display="flex" justifyContent="end">
                    <SecondaryNav languageMenu={languageMenu} secondaryItems={secondaryItems} gtmTags={gtmTags} />
                  </Box>
                </Optional>
                <Main primaryItems={primaryItems} gtmTags={gtmTags} headerHiddenOnScroll={headerHiddenOnScroll} />
              </MainColumn>
              <Optional when={!showSecondaryMenuOnTop}>
                <Media at="desktop">
                  {className => (
                    <SecondaryColumn className={className} ml="auto">
                      <SecondaryNav languageMenu={languageMenu} secondaryItems={secondaryItems} gtmTags={gtmTags} />
                    </SecondaryColumn>
                  )}
                </Media>
              </Optional>
              <Media lessThan="desktop">
                {className => (
                  <MobileRightNav className={className} ml="auto">
                    <SecondaryNav languageMenu={languageMenu} secondaryItems={secondaryItems} gtmTags={gtmTags} />
                  </MobileRightNav>
                )}
              </Media>
            </Row>
          </Container>
        </HeaderBar>
        <Mobile primaryItems={primaryItems} languageMenu={languageMenu} gtmTags={gtmTags} />
      </Nav>
      <MegaMenuMask onClick={() => handleAction(null)} isOpen={activeMenu} />
    </>
  );
};

HeaderComponent.propTypes = {
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
  }),
  primaryItems: PropItemsType,
  secondaryItems: PropItemsType,
  languageMenu: PropItemType,
  siteLogo: PlaceholderType,
};

const HeaderUI = ({ config, ...props }) => (
  <HeaderProvider config={config}>
    <HeaderComponent {...props} />
  </HeaderProvider>
);

export default HeaderUI;
