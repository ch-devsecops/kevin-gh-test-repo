import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Expand,
  Button,
  Copy,
  Fade,
  Toast,
  useThemeContext,
  Link,
  Optional,
} from '@honda-canada/design-system-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import css from '@styled-system/css';
import styled from 'styled-components';
import Toggle, { Label } from './Toggle';
import DisabledBodyScroll from '../../utils/DisabledBodyScroll';
import { gtmSelectYear } from '../../utils/gtmEvents';
import { ModelBrandName } from './Desktop';
import { getBapUrlParams, useConfiguration } from './constants';
import { useOffersQueryParam } from './utils';

const ModelBadge = styled.img(({ badgeSize }) =>
  css({
    ml: 's',
    maxWidth: badgeSize,
  }),
);

const LinkStyles = ({ last, color }) =>
  css({
    fontWeight: 'normal',
    fontFamily: 'bold',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '18px',
    textDecoration: 'none',
    py: 'default',
    mx: 'default',
    color,
    borderBottom: '1px solid',
    borderBottomColor: last === 'true' ? 'transparent' : 'grey.3',
    // for activeClassName
    '&.active': {
      color: 'primary',
    },
    letterSpacing: '0.5px',
  });

const MenuLink = styled(NavLink)(LinkStyles);
const ExternalMenuLink = styled(Link)(LinkStyles);

const ToastWrapper = styled(Fade)`
  display: none;
  @media (orientation: landscape) {
    display: block;
  }
`;

const StyledToast = styled(Toast)`
  display: none;
  @media (orientation: landscape) {
    display: block;
  }
`;

const handleMenuClick = () => {
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
};

const Mobile = ({
  years,
  selectedYear,
  modelBadge,
  navItems,
  bapBaseUrl,
  bapLabel,
  bapUrlParams,
  offersBaseUrl,
  offersUrlParams,
  setIsModelNavOpen,
  modelName,
  bodyStyle,
  isDark,
  buildButtonStyling,
  variant,
  vehicleType,
  showCTA,
  selectedTrim,
  rendering,
}) => {
  const [isYearsOpen, setIsYearsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [wasLandscapeToastClosed, setWasLandscapeToastClosed] = useState(false);
  const { t } = useTranslation();
  const { queryParam } = useOffersQueryParam(offersUrlParams);
  const location = useLocation();
  const { pathname } = location;
  const toggleLabelItem = navItems?.find(
    item => item?.url?.toLowerCase() === pathname?.replace(/\/$/, '')?.toLowerCase(),
  );
  const landscapeToastLabel = t('Pages.Models.Exploration.mobileLandscapeToastLabel');
  const { shadows } = useThemeContext();
  const containerEl = useRef();
  const { badgeSize } = useConfiguration(variant);
  const navEl = useRef();
  const gtmOverviewLabel = t('Pages.Models.Exploration.overviewNavLabel', { lng: 'en' })?.toLowerCase();
  const gtmOffersLabel = t('Pages.Models.Exploration.offersNavLabel', { lng: 'en' })?.toLowerCase();
  const backgroundColor = isDark ? 'black' : 'white';
  const linkColor = isDark ? 'white' : 'black';
  const boxShadow = isDark ? shadows.darkBox.subNav : shadows.box.subNav;

  // If the menu is far enough from the top that any of it
  // will be not be in view when open, scroll it into view.
  // This is necessary because body scroll is disabled when
  // the menu is open.
  useEffect(() => {
    if (isNavOpen && containerEl.current && navEl.current) {
      const container = containerEl.current;
      const nav = navEl.current;
      const distanceFromTop = container.getBoundingClientRect().top;
      const height = nav.clientHeight;

      if (distanceFromTop > height) {
        containerEl.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }
  }, [isNavOpen]);

  return (
    <>
      <DisabledBodyScroll isOpen={isNavOpen || isYearsOpen} />
      <Box
        ref={containerEl}
        display="flex"
        boxShadow={boxShadow}
        px="m"
        backgroundColor={backgroundColor}
        justifyContent="space-between"
      >
        <Box alignItems="center" display="flex" height="70px" data-testid="cy-model-nav-years-dropdown">
          <Toggle
            setIsOpen={() => {
              setIsYearsOpen(!isYearsOpen);
              setIsModelNavOpen(!isYearsOpen);
              if (isNavOpen) setIsNavOpen(false);
            }}
            isOpen={isYearsOpen}
            label={selectedYear && <Label color={linkColor}>{selectedYear.name}</Label>}
            useToggle={years?.length > 1}
            backgroundColor={backgroundColor}
          />
          {modelBadge?.src ? (
            <ModelBadge
              data-testid="cy-model-nav-name-badge"
              src={modelBadge.src}
              alt={modelBadge.alt}
              badgeSize={badgeSize}
            />
          ) : (
            <ModelBrandName data-testid="cy-model-nav-name-text-badge">{modelName}</ModelBrandName>
          )}
        </Box>
        <Box display="flex" alignItems="center" height="70px" data-testid="cy-model-nav-navigation-dropdown">
          <Toggle
            setIsOpen={() => {
              setIsNavOpen(!isNavOpen);
              setIsModelNavOpen(!isNavOpen);
              if (isYearsOpen) setIsYearsOpen(false);
            }}
            isOpen={isNavOpen}
            backgroundColor={backgroundColor}
            label={
              toggleLabelItem?.nameBadge?.item?.value?.src ? (
                <ModelBadge
                  src={toggleLabelItem?.nameBadge?.item?.value.src}
                  alt={toggleLabelItem?.nameBadge?.item?.value.alt}
                  style={{ maxWidth: '98px' }}
                />
              ) : (
                <Label color={linkColor}>
                  {toggleLabelItem?.sectionNavLabel?.value || t('Pages.Models.Exploration.overviewNavLabel')}
                </Label>
              )
            }
          />
        </Box>
      </Box>
      {!wasLandscapeToastClosed && (
        <ToastWrapper duration="0.5s" position="absolute" width="100%">
          <StyledToast onClose={() => setWasLandscapeToastClosed(true)}>
            <Copy size="small">{landscapeToastLabel}</Copy>
          </StyledToast>
        </ToastWrapper>
      )}
      <Expand
        as={Box}
        shouldAnimate={isYearsOpen}
        direction="down"
        bg={backgroundColor}
        expandedHeight="100vh"
        boxShadow={isYearsOpen && `inset ${boxShadow}`}
      >
        <ul ref={navEl} data-testid="cy-model-nav-mobile-years-list">
          {years?.map((year, i) => (
            <Box as="li" key={year.url} display="flex" alignItems="center">
              {year.legacyPageUrl && (
                <ExternalMenuLink
                  data-testid="cy-model-nav-year-link"
                  color={linkColor}
                  as="a"
                  href={year.legacyPageUrl}
                  onClick={() => {
                    setIsNavOpen(false);
                    setIsModelNavOpen(false);
                    handleMenuClick();
                  }}
                >
                  {year.name}
                </ExternalMenuLink>
              )}
              {!year.legacyPageUrl && (
                <MenuLink
                  data-testid="cy-model-nav-year-link"
                  color={linkColor}
                  to={year.correspondingUrl || year.url}
                  last={i === years.length - 1 ? 'true' : 'false'}
                  activeClassName="active"
                  isActive={() => year.name === selectedYear?.name}
                  onClick={() => {
                    gtmSelectYear(year?.name);
                    setIsYearsOpen(false);
                    setIsModelNavOpen(false);
                    handleMenuClick();
                  }}
                >
                  {year.name}
                </MenuLink>
              )}
            </Box>
          ))}
        </ul>
      </Expand>
      <Expand
        as={Box}
        shouldAnimate={isNavOpen}
        direction="down"
        bg={backgroundColor}
        expandedHeight="100vh"
        boxShadow={isNavOpen && `inset ${boxShadow}`}
        overflowY="scroll"
      >
        <ul data-testid="cy-model-nav-mobile-nav-item-list">
          <Box as="li" display="flex" alignItems="center">
            {selectedYear && (
              <MenuLink
                color={linkColor}
                to={selectedYear.url}
                activeClassName="active"
                onClick={() => {
                  setIsNavOpen(false);
                  setIsModelNavOpen(false);
                  handleMenuClick();
                }}
                data-gtm-model={modelName}
                data-gtm-body-style={bodyStyle}
                data-gtm-interaction-type="primary model nav"
                data-gtm-title={gtmOverviewLabel}
                exact
              >
                {t('Pages.Models.Exploration.overviewNavLabel')}
              </MenuLink>
            )}
          </Box>
          {navItems?.map(item => (
            <Box as="li" key={item.url} display="flex" alignItems="center">
              <MenuLink
                data-testid="cy-model-nav-item"
                color={linkColor}
                to={item.url}
                activeClassName="active"
                onClick={() => {
                  setIsNavOpen(false);
                  setIsModelNavOpen(false);
                  handleMenuClick();
                }}
                data-gtm-model={modelName}
                data-gtm-body-style={bodyStyle}
                data-gtm-interaction-type="primary model nav"
                data-gtm-title={item.name?.toLowerCase()}
              >
                {item.nameBadge?.item?.value?.src ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img {...item.nameBadge?.item?.value} />
                ) : (
                  item.sectionNavLabel?.value
                )}
              </MenuLink>
            </Box>
          ))}
          <Box as="li" display="flex" alignItems="center">
            <ExternalMenuLink
              color={linkColor}
              as="a"
              href={`${offersBaseUrl}${queryParam}`}
              onClick={() => {
                setIsNavOpen(false);
                setIsModelNavOpen(false);
                handleMenuClick();
              }}
              data-gtm-model={modelName}
              data-gtm-body-style={bodyStyle}
              data-gtm-interaction-type="primary model nav"
              data-gtm-title={gtmOffersLabel}
            >
              {t('Pages.Models.Exploration.offersNavLabel')}
            </ExternalMenuLink>
          </Box>
          <Optional when={showCTA}>
            <Box as="li" display="flex" alignItems="center" justifyContent="center" py="default">
              <Button
                as="a"
                href={getBapUrlParams(
                  variant,
                  bapBaseUrl,
                  bapUrlParams,
                  t('Shared.Common.priceAndFinanceUrl'),
                  vehicleType,
                  modelName,
                  selectedTrim,
                )}
                styling={buildButtonStyling}
                data-gtm-model={modelName}
                data-gtm-body-style={bodyStyle}
                data-gtm-interaction-type="cta: build"
                data-gtm-component-type={rendering?.componentName}
                data-gtm-title="build & price"
                aria-label={bapLabel}
              >
                {bapLabel}
              </Button>
            </Box>
          </Optional>
        </ul>
      </Expand>
    </>
  );
};

export default Mobile;
