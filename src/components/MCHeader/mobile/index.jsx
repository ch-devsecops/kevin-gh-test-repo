import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Row, Image, IconWrapper, Icon } from '@honda-canada/design-system-react';
import { useTranslation } from 'react-i18next';
import Link from '../../RoutableSitecoreLink';
import NavDropdown from './NavDropdown';
import SubDropdown from './SubDropdown';

const MenuBtn = styled(IconWrapper)({
  outline: 'none',
});

const Container = styled(Row)(({ theme, isContainerClosed }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  display: 'flex',
  backgroundColor: theme.colors.trueBlack,
  height: theme.header.mobile.height,
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  zIndex: isContainerClosed ? theme.zIndices.header : theme.zIndices.modal,
}));

const MobileHeader = ({ mainNav, shareData, utilityLinks, siteLogo, siteLogoLink, langToggle, langText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subNav, setSubNav] = useState(null);
  const [isContainerClosed, setIsContainerClosed] = useState(true);
  const { t } = useTranslation();

  const onMenuBtnClick = () => {
    setIsOpen(prevState => !prevState);

    if (subNav) {
      setSubNav(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // reset container state
      setIsContainerClosed(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    // tells the component that container is fully collapsed after dropdown transition
    if (!isOpen) setIsContainerClosed(true);
  };

  return (
    <Container as="header" isContainerClosed={isContainerClosed}>
      <Box maxWidth="200px" height="100%">
        {siteLogo?.value?.src && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link field={siteLogoLink}>
            <Image {...siteLogo?.value} />
          </Link>
        )}
      </Box>

      <MenuBtn
        mr="s"
        role="button"
        tabIndex="0"
        aria-label={isOpen ? t('Shared.Common.closeMenuAria') : t('Shared.Common.openMenuAria')}
        aria-expanded={isOpen}
        onClick={onMenuBtnClick}
      >
        <Icon name="animatedMenu" color="white" toggle={isOpen} />
      </MenuBtn>

      <NavDropdown
        mainNav={mainNav}
        shareData={shareData}
        utilityLinks={utilityLinks}
        isOpen={isOpen}
        setSubNav={setSubNav}
        langToggle={langToggle}
        langText={langText}
        onTransitionEnd={handleTransitionEnd}
      />
      <SubDropdown isOpen={subNav} subNav={subNav} onClose={() => setSubNav(null)} />
    </Container>
  );
};

export default MobileHeader;
