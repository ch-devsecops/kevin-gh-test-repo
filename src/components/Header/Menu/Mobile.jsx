import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Icon, Drawer } from '@honda-canada/design-system-react';
import useFocus from '../../../utils/hooks/useFocus';
import useEventHandler from '../../../utils/hooks/useEventHandler';
import { PropItemsType, PropItemType } from '../../../utils/propTypes';
import { getGtmTagValue } from '../../../utils/gtmEvents';
import Link from '../../RoutableSitecoreLink';
import HeaderContext from '../service/HeaderContext';

import themeStyles, { customDrawerThemeStyles } from '../Header.styles';

const DrawerLink = themeStyles.apply(Link, 'DrawerLink');
const DrawerButton = themeStyles.apply(Box, 'DrawerButton');
const DrawerFooter = themeStyles.apply(Box, 'DrawerFooter');

const MenuMobile = ({ languageMenu, primaryItems, gtmTags }) => {
  const { t } = useTranslation();
  const { isOpenMenu, setIsOpenMenu, subMenuList, setSubMenuList } = useContext(HeaderContext);
  const handlerAction = useEventHandler(setSubMenuList);
  const [addHtmlElRef, setFocus] = useFocus();

  const handlerHeaderMobileMenuButton = () => {
    setSubMenuList({});
    setIsOpenMenu(prevState => !prevState);
  };

  const handlerCloseSubDrawer = id => {
    setSubMenuList(prevState => ({ ...prevState, [id]: !prevState[id] }));
    setFocus(id);
  };

  const handlerСloseBothMenus = () => {
    setIsOpenMenu(false);
    setSubMenuList({});
  };

  const handlerEvent = (data, isLink, event) => {
    handlerAction(
      prevState => ({
        ...prevState,
        [data]: !prevState[data],
      }),
      isLink,
      event,
    );
  };

  const renderDrawerItems = ({ items, isFirstLevel, isFooter }, parentDisplayName) => {
    const result = items?.map(
      ({ itemId, url, ctaLink, items: itemItems, label, gtmTitle, gtmInteractionType, itemDisplayName } = {}) => {
        const ret = [];
        const linkObj = (url?.href && url) || (ctaLink?.href && ctaLink);
        const isLink = !itemItems?.length && linkObj?.href;
        const hasChildren = itemItems?.length;
        let ItemComponent;
        if (isFooter) {
          ItemComponent = DrawerFooter;
        } else {
          ItemComponent = isLink ? DrawerLink : DrawerButton;
        }
        const trackingLabel = parentDisplayName
          ? `${parentDisplayName} > ${getGtmTagValue(gtmTitle || itemDisplayName)}`
          : getGtmTagValue(gtmTitle);

        ret.push(
          <ItemComponent
            field={{
              value: {
                linktype: hasChildren ? 'internal' : linkObj?.linktype,
                href: hasChildren ? '' : linkObj?.href,
                target: linkObj?.target,
              },
            }}
            ref={addHtmlElRef(itemId)}
            tabIndex={0}
            key={itemId}
            target={linkObj?.target}
            fontFamily={isFirstLevel ? 'bold' : 'default'}
            aria-label={`${t('Shared.Common.openMenuAria')} ${label}`}
            onClick={() => {
              handlerEvent(itemId, isLink);
              if (!hasChildren) {
                handlerСloseBothMenus();
              }
            }}
            onKeyDown={event => handlerEvent(itemId, isLink, event)}
            data-gtm-title={getGtmTagValue(gtmTitle)}
            data-gtm-interaction-type={getGtmTagValue(gtmInteractionType)}
            data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
            data-gtm-nav-type={isLink ? 'global' : undefined}
            data-tracking-label={trackingLabel}
            data-testid={isFooter ? 'header-mobile-menu-footer-item' : 'header-mobile-drawer-item'}
          >
            {label}
            {hasChildren ? (
              <Box data-testid="header-mobile-menu-icon-right">
                <Icon name="arrowRight" />
              </Box>
            ) : null}
          </ItemComponent>,
        );
        if (itemItems?.[0]?.items?.length) {
          ret.push(
            <Drawer
              width="100%"
              key={`mainDrawer${itemId}`}
              underHeader
              closeIcon={<Icon name="arrowLeft" />}
              themeStylesCustom={customDrawerThemeStyles}
              backgroundColor="red"
              onClose={() => handlerCloseSubDrawer(itemId)}
              visible={subMenuList[itemId]}
              title={isFooter ? t('Shared.Header.language') : label}
            >
              {isFirstLevel && !isFooter && linkObj?.text && (
                <ItemComponent
                  field={{
                    value: {
                      linktype: linkObj?.linktype,
                      href: linkObj?.href,
                      target: linkObj?.target,
                    },
                  }}
                  ref={addHtmlElRef(`All_${itemId}`)}
                  tabIndex={0}
                  fontFamily="default"
                  key={`All_${itemId}`}
                  target={linkObj?.target}
                  data-gtm-nav-type="global"
                  data-tracking-label={`${trackingLabel} > View All`}
                  onClick={() => handlerСloseBothMenus()}
                >
                  {linkObj?.text}
                </ItemComponent>
              )}
              {renderDrawerItems({ items: itemItems?.[0]?.items }, trackingLabel)}
            </Drawer>,
          );
        }
        return <Box key={`Box-${itemId}`}>{ret}</Box>;
      },
    );

    return result;
  };

  if (!primaryItems?.length) {
    return null;
  }

  return (
    <Drawer
      key="mainDrawer"
      width="100%"
      onClose={handlerHeaderMobileMenuButton}
      visible={isOpenMenu}
      fixPosition
      underHeader
      closable={false}
      placement="left"
      themeStylesCustom={customDrawerThemeStyles}
      footer={renderDrawerItems({ items: [languageMenu], isFirstLevel: true, isFooter: true })}
    >
      {renderDrawerItems({ items: primaryItems, isFirstLevel: true })}
    </Drawer>
  );
};

MenuMobile.propTypes = {
  primaryItems: PropItemsType,
  languageMenu: PropItemType,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default MenuMobile;
