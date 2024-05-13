import React from 'react';
import { Box, Wrapper, Row, Column, Button, Link, Copy } from '@honda-canada/design-system-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import css from '@styled-system/css';
import styled from 'styled-components';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import YearsDropdown from './DesktopYearsDropdown';
import { HONDA_SITE_NAME } from '../../utils/constants';
import { getBapUrlParams } from './constants';
import { useOffersQueryParam } from './utils';

const ModelBadge = styled.img(
  css({
    ml: 'default',
  }),
);

const TrimBadge = styled.img`
  max-height: 11px;
  position: relative;
  top: -2px;
`;

const NavItem = styled.li(
  css({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  }),
);

const textStyles = {
  letterSpacing: '0.5px',
  fontWeight: 'regular',
  fontFamily: 'bold',
  fontSize: '14px',
  textDecoration: 'none',
};

const ModelBrandNameStyles = () =>
  css({
    ...textStyles,
    ml: 'l',
    lineHeight: ['18px', '22px'],
  });

const LinkStyles = ({ theme, color }) =>
  css({
    ...textStyles,
    color,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    borderBottom: '3px solid transparent',
    boxSizing: 'border-box',
    '&:hover, &:focus': {
      color: 'primary',
      borderBottom: '3px solid transparent',
    },
    '&:focus-visible': {
      outline: `solid ${theme.colors.aodaFocused} 6px`,
    },
    // for activeClassName
    '&.active': {
      borderBottom: `3px solid ${theme.colors.primary}`,
    },
  });

const StyledExternalLink = styled(Link)(LinkStyles);

const StyledLink = styled(NavLink)(LinkStyles);

export const ModelBrandName = styled(Copy)(ModelBrandNameStyles);

const Desktop = ({
  specialTrimPage,
  years,
  selectedYear,
  modelBadge,
  navItems,
  bapBaseUrl,
  bapLabel,
  bapUrlParams,
  offersBaseUrl,
  offersUrlParams,
  modelName,
  bodyStyle,
  isDark,
  buildButtonStyling,
  sitecoreContext,
  showCTA,
  variant,
  vehicleType,
  selectedTrim,
  rendering,
}) => {
  const { t } = useTranslation();
  const { queryParam } = useOffersQueryParam(offersUrlParams);
  const gtmOverviewLabel = t('Pages.Models.Exploration.overviewNavLabel', { lng: 'en' })?.toLowerCase();
  const gtmOffersLabel = t('Pages.Models.Exploration.offersNavLabel', { lng: 'en' })?.toLowerCase();
  const { site } = sitecoreContext;
  const appName = site?.name;
  const backgroundColor = isDark ? 'black' : 'white';
  const textColor = isDark ? 'white' : 'black';

  return (
    <div>
      <Box
        display="flex"
        height={appName === HONDA_SITE_NAME ? '84px' : '75px'}
        alignItems="center"
        boxShadow={isDark ? 'darkBox.subNav' : 'box.subNav'}
        position="sticky"
        top={0}
        backgroundColor={backgroundColor}
        data-testid="cy-model-page-nav-desktop-wrapper"
      >
        <Wrapper gutters={[false, false]} height="100%">
          <Row height="100%">
            <Column width={(specialTrimPage ? 3 : 4) / 12} display="flex" alignItems="center" height="100%">
              <YearsDropdown years={years} selected={selectedYear} backgroundColor={backgroundColor} isDark={isDark} />
              {modelBadge?.src ? (
                <ModelBadge data-testid="cy-model-nav-name-badge" src={modelBadge.src} alt={modelBadge.alt} />
              ) : (
                <ModelBrandName data-testid="cy-model-nav-name-text-badge">{modelName}</ModelBrandName>
              )}
            </Column>
            <Column
              as="ul"
              width={(specialTrimPage ? 9 : 8) / 12}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              {selectedYear && (
                <NavItem>
                  <StyledLink
                    color={textColor}
                    to={selectedYear.url}
                    activeClassName="active"
                    data-gtm-model={modelName}
                    data-gtm-body-style={bodyStyle}
                    data-gtm-interaction-type="primary model nav"
                    data-gtm-title={gtmOverviewLabel}
                    exact
                  >
                    {t('Pages.Models.Exploration.overviewNavLabel')}
                  </StyledLink>
                </NavItem>
              )}
              {navItems?.map(navItem => (
                <NavItem key={navItem.url}>
                  <StyledLink
                    data-testid="cy-model-nav-item"
                    color={textColor}
                    to={navItem.url}
                    activeClassName="active"
                    data-gtm-model={modelName}
                    data-gtm-body-style={bodyStyle}
                    data-gtm-interaction-type="primary model nav"
                    data-gtm-title={navItem.name?.toLowerCase()}
                    aria-label={
                      navItem.nameBadge?.item?.value?.src
                        ? navItem.nameBadge?.item?.value
                        : navItem.sectionNavLabel?.value || navItem.name
                    }
                  >
                    {navItem.nameBadge?.item?.value?.src ? (
                      <TrimBadge {...navItem.nameBadge?.item?.value} />
                    ) : (
                      navItem.sectionNavLabel?.value
                    )}
                  </StyledLink>
                </NavItem>
              ))}
              <NavItem>
                <StyledExternalLink
                  data-testid="cy-model-nav-offers"
                  color={textColor}
                  as="a"
                  href={`${offersBaseUrl}${queryParam}`}
                  data-gtm-model={modelName}
                  data-gtm-body-style={bodyStyle}
                  data-gtm-interaction-type="primary model nav"
                  data-gtm-title={gtmOffersLabel}
                  isLinkType
                >
                  {t('Pages.Models.Exploration.offersNavLabel')}
                </StyledExternalLink>
              </NavItem>
              <NavItem data-testid="cy-model-nav-price-and-finance">
                {showCTA ? (
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
                ) : null}
              </NavItem>
            </Column>
          </Row>
        </Wrapper>
      </Box>
    </div>
  );
};

export default withSitecoreContext()(Desktop);
