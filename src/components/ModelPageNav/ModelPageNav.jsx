import React, { useContext, useEffect } from 'react';
import { Media, Box } from '@honda-canada/design-system-react';
import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { useLocation } from 'react-router-dom';
import isValidUrlOrRelativeUrl from '@honda-canada/js-utilities/lib/isValidUrlOrRelativeUrl';
import isEqual from 'lodash/isEqual';
import isSSR from '../../utils/isSSR';
import { ModelExplorationContext } from '../ModelExplorationContext';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { BUILD_AND_PRICE_URL, OFFERS_URL } from '../../utils/constants';
import useSharedApps from '../../utils/sitecoreContext/useSharedApps';
import { getModelNavPageBodyStyle, useZindexWorkaround } from './utils';
import { useConfiguration } from './constants';
import BottomElementContext from '../Footer/BottomElementProvider/BottomElementContext';

const getBuildButtonStyling = (isDark, isTrimSpecial) => (isDark || isTrimSpecial ? 'special' : 'primary');

/**
 * Returns a url that corresponds to the currently-displayed page. For example,
 * when the current path is /ILX/Trims, the 2021 dropdown item should link to
 * /ILX/2021/Trims instead of just /ILX/2021.
 * @param {string} year - a model year
 * @param {array} navItems - an array of nav items, each with a url
 * @param {string} pathname - the current pathname, from react-router-dom
 * @returns a corresponding URL for the given year
 */
const getCorrespondingUrl = (year, navItems, pathname = '') => {
  const currentPage = navItems?.find(navItem => pathname?.toLowerCase()?.includes(navItem?.url?.toLowerCase()));
  const currentPageName = currentPage?.name;
  const correspondingSubPage = year.subPages?.find(s => s.name === currentPageName);

  return correspondingSubPage?.url;
};

const getLegacyPageUrl = (year, years) => {
  const foundYear = years?.find(v => v.name === year.name);
  return foundYear?.legacyPageUrl?.value || undefined;
};

const getNodes = items => {
  if (!items) return {};
  return items.map(item => ({
    name: item.name,
    url: item.url,
  }));
};

const ModelPageNav = ({ fields, sitecoreContext, rendering, categoryName, modelName, variant }) => {
  const { setIsHidden, setHeaderHiddenOnScroll } = useContext(BottomElementContext);
  const modelExplorationContext = useContext(ModelExplorationContext) || {};

  const { pathname } = useLocation();

  const bapPathUrl = useSharedApps(BUILD_AND_PRICE_URL);

  const offersBaseUrl = useSharedApps(OFFERS_URL);
  const vehicleType = fields?.data?.value?.modelPageSettings?.modelCategory?.fields?.vehicleType?.name;

  const zIndexWorkaround = useZindexWorkaround();

  const { zIndexWorkaroundClassName, zIndexStringValue } = useConfiguration(variant);

  useEffect(() => {
    if (isSSR()) return undefined;
    if (typeof setHeaderHiddenOnScroll === 'function') setHeaderHiddenOnScroll(true);

    return () => {
      // This function will be called when the component is unmounted
      setIsHidden(false);
      if (typeof setHeaderHiddenOnScroll === 'function') setHeaderHiddenOnScroll(false);
    };
  }, []);

  if (!fields) return null;

  const { modelNav, modelPageSettings } = fields?.data?.value || {};
  const { pageEditing } = sitecoreContext;

  const isDark = modelPageSettings?.isDarkMode?.value === '1';

  const navItems = modelNav?.map(navItem => {
    // If a nav item has no nameBadge image, ExperienceEditor adds a placeholder image,
    // which we don't want because it prevents the text value from showing up.
    if (navItem.nameBadge?.item?.editable && navItem.nameBadge?.item?.value?.class === 'scEmptyImage') {
      // eslint-disable-next-line no-param-reassign
      delete navItem.nameBadge.item.value.src;
    }

    return navItem;
  });

  const { navItems: navigationItems, setNavItems } = modelExplorationContext;
  if (!isEqual(getNodes(navItems), getNodes(navigationItems))) {
    setNavItems(getNodes(navItems));
  }

  const years = fields.data?.value?.years?.items?.map(year => ({
    ...year,
    legacyPageUrl: getLegacyPageUrl(year, categoryName?.fields?.modelYears),
    correspondingUrl: getCorrespondingUrl(year, navItems, pathname),
  }));

  const modelBadge = modelPageSettings?.nameBadge?.item?.value;
  const specialTrimPage = navItems?.find(navItem => navItem.nameBadge?.item?.value?.src);
  const ctaLink = isValidUrlOrRelativeUrl(modelPageSettings?.ctaLink?.item?.value?.href)
    ? modelPageSettings?.ctaLink?.item?.value
    : undefined;
  const showCTA = !!ctaLink?.href;
  const isNsx = modelPageSettings?.isNsx?.value;
  const bapBaseUrl = isNsx ? ctaLink?.href : bapPathUrl;
  const bapLabel = ctaLink?.text;

  const props = {
    showCTA,
    modelName,
    specialTrimPage,
    years,
    modelBadge,
    navItems,
    bapBaseUrl,
    bapLabel,
    offersBaseUrl,
  };

  return (
    <ModelExplorationContext.Consumer>
      {({ bapUrlParams, setIsModelNavOpen, modelYear, offersUrlParams, selectedTrim }) => {
        // get bodyStyle from defaultTrim for modelYear
        // here
        const defaultModelYear = categoryName?.fields?.modelYears?.find(year => year.name === modelYear);
        const { bodyStyle } = getModelNavPageBodyStyle(variant, defaultModelYear, vehicleType);
        return (
          <>
            {zIndexWorkaround}
            <Box
              data-gtm-category="model interactions"
              data-gtm-component-type={rendering?.componentName}
              className={zIndexWorkaroundClassName}
              zIndex={pageEditing ? 210 : zIndexStringValue}
              backgroundColor={isDark ? 'black' : 'white'}
              position="sticky"
              top={0}
            >
              <Media lessThan="desktop">
                <Mobile
                  {...props}
                  bapUrlParams={isNsx ? '' : bapUrlParams}
                  offersUrlParams={offersUrlParams}
                  setIsModelNavOpen={setIsModelNavOpen}
                  selectedYear={years?.find(y => y.name === modelYear)}
                  isDark={isDark}
                  bodyStyle={bodyStyle}
                  buildButtonStyling={getBuildButtonStyling(isDark, selectedTrim?.isSpecialType)}
                  variant={variant}
                  vehicleType={vehicleType}
                  selectedTrim={selectedTrim}
                  rendering={rendering}
                />
              </Media>
              <Media greaterThanOrEqual="desktop">
                <Desktop
                  {...props}
                  bapUrlParams={isNsx ? '' : bapUrlParams}
                  isDark={isDark}
                  offersUrlParams={offersUrlParams}
                  selectedYear={years?.find(y => y.name === modelYear)}
                  bodyStyle={bodyStyle}
                  buildButtonStyling={getBuildButtonStyling(isDark, selectedTrim?.isSpecialType)}
                  variant={variant}
                  vehicleType={vehicleType}
                  selectedTrim={selectedTrim}
                  rendering={rendering}
                />
              </Media>
            </Box>
          </>
        );
      }}
    </ModelExplorationContext.Consumer>
  );
};

export default withSitecoreContext()(ModelPageNav);
