import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Copy, IconWrapper, Image } from '@honda-canada/design-system-react';
import { PropItemsType } from '../../../utils/propTypes';
import { getGtmTagValue } from '../../../utils/gtmEvents';
import Link from '../../RoutableSitecoreLink';
import { USER_ITEM_DISPLAY_NAME } from '../service/constants';

import themeStyles from '../Header.styles';
import HeaderContext from '../service/HeaderContext';

const NavItem = themeStyles.apply(Link, 'NavItem');
const NavIconWrapper = themeStyles.apply(IconWrapper, 'NavIconWrapper');
const NavIcon = themeStyles.apply(Image, 'NavIcon');

const MenuSecondary = ({ secondaryItems = [], gtmTags }) => {
  const { styles } = useContext(HeaderContext);
  if (!secondaryItems.length) {
    return null;
  }

  return secondaryItems?.map(item => {
    const { itemId: key, label, icon, gtmTitle, gtmInteractionType, url: { href, target, linktype } = {} } = item || {};
    const isLink = !!href;
    const props = {
      field: {
        value: {
          linktype,
          href,
          target,
        },
      },
      ariaLabel: label,
      tabIndex: 0,
    };

    if (item.itemDisplayName?.toLowerCase() === USER_ITEM_DISPLAY_NAME) {
      props.display = ['inline-flex', 'none'];
    }

    return (
      <NavItem
        data-testid="header-menu-secondary-navItem-wrapper"
        key={key}
        data-gtm-title={getGtmTagValue(gtmTitle)}
        data-gtm-interaction-type={getGtmTagValue(gtmInteractionType)}
        data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
        data-gtm-nav-type={isLink ? 'global' : undefined}
        data-tracking-label={getGtmTagValue(gtmTitle)}
        {...props}
        {...styles.navItemSecondary}
      >
        <NavIconWrapper>
          <NavIcon data-testid="header-menu-secondary-navItem-icon" src={icon?.src} alt={icon?.alt} />
        </NavIconWrapper>
        <Copy as="span" data-testid="header-menu-secondary-navItem-label">
          {label}
        </Copy>
      </NavItem>
    );
  });
};

MenuSecondary.propTypes = {
  secondaryItems: PropItemsType,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default MenuSecondary;
