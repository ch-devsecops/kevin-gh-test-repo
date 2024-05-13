import React, { createRef, useRef, useContext, useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Box, Column, Row, Wrapper, Copy } from '@honda-canada/design-system-react';
import isSSR from '../../../utils/isSSR';
import useEventHandler from '../../../utils/hooks/useEventHandler';
import { PropItemsType } from '../../../utils/propTypes';
import { getGtmTagValue, getGtmTitleValue, pushGlobalNavGtmEvent } from '../../../utils/gtmEvents';
import Link from '../../RoutableSitecoreLink';
import ActionLink from '../ActionLink';
import ArticleCard from '../ArticleCard';
import HeaderContext from '../service/HeaderContext';

import themeStyles, { HeaderBarButtonPadding } from '../Header.styles';

import CoverImage from '../CoverImage';
import { ALIGNMENT_LEFT, LEFT_ALIGNED_NAV_ITEMS, RIGHT_ALIGNED_NAV_ITEMS } from '../service/constants';

const Container = themeStyles.apply(Wrapper, 'Container');
const NavContainer = themeStyles.apply(Row, 'NavContainer');
const NavList = themeStyles.apply(Box, 'NavList');
const NavLink = themeStyles.apply(Link, 'NavItem');
const NavButton = themeStyles.apply(Box, 'NavItem');
const NavAnimation = themeStyles.apply(Box, 'NavAnimation');
const MegaMenu = themeStyles.apply(Box, 'MegaMenu');
const NavItemLabel = themeStyles.apply(Copy, 'NavItemlabel');

const MenuMain = ({ primaryItems, gtmTags, headerHiddenOnScroll }) => {
  const location = useLocation();
  const [headerBarMenuAnimationProps, setAnimationProps] = useState({ width: 0, left: 0 });
  const { styles, activeMenu, setActiveMenu } = useContext(HeaderContext);
  const [firstOpen, setFirstOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleAction = useEventHandler(data => {
    setFirstOpen(false);
    setActiveMenu(data);
    setSelectedMenu(data);
  });
  const primaryItemsRef = useRef({});
  const megaMenuRef = useRef({});

  useEffect(() => {
    setSelectedMenu(location.state?.selectedMenuItem);
  }, [location]);

  const handleScroll = () => {
    if (isSSR()) return undefined;
    if (headerHiddenOnScroll && activeMenu) {
      megaMenuRef.current?.[selectedMenu]?.current?.style?.setProperty('top', `${75 - window.scrollY}px`, 'important');
    }
  };

  useLayoutEffect(() => {
    if (isSSR()) return undefined;
    if (activeMenu) {
      handleScroll();
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeMenu]);

  useEffect(() => {
    async function checkFontStatus() {
      if ('fonts' in document) {
        await document.fonts.ready;
        const activeMenuRef = primaryItemsRef.current?.[selectedMenu]?.current;

        if (!activeMenuRef) {
          setAnimationProps({});
          return;
        }

        const parentRef = activeMenuRef.parentNode;

        const width = activeMenuRef ? activeMenuRef.offsetWidth - 2 * HeaderBarButtonPadding : 0;
        const left = parentRef ? parentRef.offsetLeft + HeaderBarButtonPadding : 0;

        setAnimationProps({ width, left });
      }
    }
    checkFontStatus();
  }, [selectedMenu]);

  if (!primaryItems?.length) {
    return null;
  }

  const handleEvent = ({ itemDisplayName, isLink, event, linkUrl, linkText }) => {
    handleAction(activeMenu === itemDisplayName ? null : itemDisplayName, isLink, event);
    if (isLink) {
      setActiveMenu(null);
      setSelectedMenu(itemDisplayName);
      pushGlobalNavGtmEvent(linkText, linkUrl);
    }
  };

  const renderMenuHeader = ({ text, href, target, linktype, gtmBodyStyle, gtmTitle } = {}, parentDisplayName) => (
    <Box pb="default">
      <ActionLink
        title={text}
        href={href}
        target={target}
        linktype={linktype}
        parentDisplayName={parentDisplayName}
        gtmTitle={getGtmTitleValue(gtmTitle, gtmBodyStyle)}
        withIcon
        tabIndex={0}
        onClick={() => setActiveMenu(null)}
      />
    </Box>
  );

  const renderMenuTypeCard = ({ ctaLink, parentDisplayName, items } = {}) => (
    <>
      {renderMenuHeader(ctaLink, parentDisplayName)}
      <Row>
        {items[0].items?.map(item => (
          <Column key={item?.itemId} data-testid="header-item-submenu-item" {...styles.headerItemSubmenuItem}>
            <ArticleCard
              key={item?.itemId}
              item={item}
              parentDisplayName={parentDisplayName}
              gtmTitle={getGtmTitleValue(item?.gtmTitle, item?.gtmBodyStyle, item?.itemDisplayName)}
              onClick={() => setActiveMenu(null)}
            />
          </Column>
        ))}
      </Row>
    </>
  );

  const renderMenuTypeList = ({ ctaLink, parentDisplayName, image, items } = {}) => (
    <>
      {renderMenuHeader(ctaLink, parentDisplayName)}
      <Row>
        <Column m={0}>
          <CoverImage image={image} />
        </Column>
        <Column m={0}>
          {items?.[0].items?.map(
            ({
              itemId,
              label,
              url: { href, linktype } = {},
              itemDisplayName,
              gtmInteractionType,
              gtmBodyStyle,
              gtmTitle,
            }) => (
              <Box key={itemId} mt={0} mb="m">
                <ActionLink
                  title={label}
                  href={href}
                  linktype={linktype}
                  parentDisplayName={parentDisplayName}
                  fontFamily="default"
                  gtmTags={gtmTags}
                  gtmTitle={getGtmTitleValue(gtmTitle, gtmBodyStyle, itemDisplayName)}
                  gtmInteractionType={gtmInteractionType}
                  onClick={() => setActiveMenu(null)}
                />
              </Box>
            ),
          )}
        </Column>
      </Row>
    </>
  );

  const mapFnType = {
    SubMenuCardItemSection: renderMenuTypeCard,
    SubMenuListItemSection: renderMenuTypeList,
  };

  const renderItems = primaryItems?.map(item => ({
    ...item,
    renderFn: mapFnType[item?.items?.[0]?.itemDisplayName] || (() => null),
  }));

  primaryItemsRef.current = primaryItems?.reduce(
    (acc, { itemDisplayName }) => ({
      ...acc,
      [itemDisplayName]: primaryItemsRef.current[itemDisplayName] ?? createRef(),
    }),
    {},
  );

  megaMenuRef.current = primaryItems?.reduce(
    (acc, { itemDisplayName }) => ({
      ...acc,
      [itemDisplayName]: megaMenuRef.current[itemDisplayName] ?? createRef(),
    }),
    {},
  );

  const renderMenuItems = renderItems?.reduce(
    (
      columns,
      {
        url,
        itemId,
        itemDisplayName,
        label,
        renderFn,
        ctaLink,
        image,
        gtmTitle,
        gtmInteractionType,
        items,
        navAlignment,
      } = {},
    ) => {
      const link = (url?.href && url) || (ctaLink?.href && ctaLink);
      const linkUrl = link?.href;
      const isLink = !items?.length && linkUrl;
      const NavItem = isLink ? NavLink : NavButton;
      const isOpen = activeMenu === itemDisplayName;
      const gottenGtmTitle = getGtmTitleValue(gtmTitle, itemDisplayName);
      const columnKey = navAlignment === ALIGNMENT_LEFT ? LEFT_ALIGNED_NAV_ITEMS : RIGHT_ALIGNED_NAV_ITEMS;
      const columnItems = columns[columnKey].concat(
        <Box key={itemId}>
          <NavItem
            field={{
              value: {
                linktype: link?.linktype,
                href: linkUrl,
                target: link?.target,
              },
            }}
            selectedMenuItem={itemDisplayName}
            ref={primaryItemsRef?.current[itemDisplayName]}
            data-testid={`header-menu-${isLink ? 'link' : 'button'}-${itemDisplayName}`}
            tabIndex={0}
            aria-label={label}
            onClick={() => handleEvent({ itemDisplayName, isLink, linkUrl, linkText: gottenGtmTitle })}
            onKeyDown={event => handleEvent({ itemDisplayName, isLink, event, linkUrl, linkText: gottenGtmTitle })}
            data-gtm-title={gottenGtmTitle}
            data-gtm-interaction-type={getGtmTagValue(gtmInteractionType)}
            data-gtm-component-type={getGtmTagValue(gtmTags?.type)}
            data-gtm-nav-type={isLink ? 'global' : undefined}
            data-tracking-label={gottenGtmTitle}
            visible={isOpen}
            {...styles.navItemPrimary}
          >
            <NavItemLabel as="span" d="inline" data-testid="header-primary-menu-item-label" {...styles.navItemLabel}>
              {label}
            </NavItemLabel>
          </NavItem>
          {isLink ? null : (
            <MegaMenu ref={megaMenuRef?.current[itemDisplayName]} isOpen={isOpen} firstOpen={firstOpen}>
              <Container px={[0, 'm', 0]}>
                {renderFn({
                  ctaLink: { ...ctaLink, gtmTitle: 'View All' },
                  parentDisplayName: gottenGtmTitle,
                  image,
                  items,
                })}
              </Container>
            </MegaMenu>
          )}
        </Box>,
      );

      return {
        ...columns,
        [columnKey]: columnItems,
      };
    },
    { [LEFT_ALIGNED_NAV_ITEMS]: [], [RIGHT_ALIGNED_NAV_ITEMS]: [] },
  );

  return (
    <NavContainer position="relative">
      <NavList>{renderMenuItems[LEFT_ALIGNED_NAV_ITEMS]}</NavList>
      <NavList>{renderMenuItems[RIGHT_ALIGNED_NAV_ITEMS]}</NavList>
      <NavAnimation {...headerBarMenuAnimationProps} />
    </NavContainer>
  );
};

MenuMain.propTypes = {
  primaryItems: PropItemsType,
  gtmTags: PropTypes.shape({
    type: PropTypes.string,
  }),
};

export default MenuMain;
