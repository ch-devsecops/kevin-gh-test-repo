import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, IconWrapper } from '@honda-canada/design-system-react';

import useEventHandler from '../../utils/hooks/useEventHandler';

import HeaderContext from './service/HeaderContext';

import themeStyles from './Header.styles';

const HeaderMobileMenuButton = themeStyles.apply(IconWrapper, 'HeaderMobileMenuButton');

const HeaderMobileButton = () => {
  const { isOpenMenu, setIsOpenMenu, setSubMenuList, styles } = useContext(HeaderContext);
  const { bgColor } = styles.mobileMenuButton;
  const { t } = useTranslation();
  const handlerHeaderMobileMenuButton = () => {
    setSubMenuList({});
    setIsOpenMenu(prevState => !prevState);
  };

  const handlerAction = useEventHandler(handlerHeaderMobileMenuButton);

  const handlerEvent = (data, isLink, event) => {
    handlerAction(data, isLink, event);
  };

  return (
    <HeaderMobileMenuButton
      as="button"
      data-testid={isOpenMenu ? 'header-menu-mobile-button-closeMenuAria' : 'header-menu-mobile-button-openMenuAria'}
      tabIndex={0}
      aria-label={isOpenMenu ? t('Shared.Common.closeMenuAria') : t('Shared.Common.openMenuAria')}
      ariaExpanded={isOpenMenu}
      onKeyDown={event => handlerEvent(null, false, event)}
      onClick={() => handlerEvent()}
    >
      <Icon name="animatedMenu" bgColor={bgColor} toggle={isOpenMenu} />
    </HeaderMobileMenuButton>
  );
};

export default HeaderMobileButton;
