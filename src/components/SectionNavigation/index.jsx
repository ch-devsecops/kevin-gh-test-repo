import React, { useState, useRef, useEffect } from 'react';
import { withSitecoreContext, isEditorActive } from '@sitecore-jss/sitecore-jss-react';
import { Box, useThemeContext, useMediaQueries } from '@honda-canada/design-system-react';
import DesktopSectionNav from './DesktopSectionNav';
import MobileSectionNav from './MobileSectionNav';
import { MC_THEME_NAME } from '../../utils/constants';

/**
 * TODO:
 * Implement Responsive Media
 * Make `route.fields` available for consumption in this repo locally
 * Fix Honda stickiness (see SideNavLayout)
 */

const checkIsNavInbound = (ref, window, stickyHeight) => {
  const componentOffsetTop = ref?.current?.offsetTop;
  const windowYOffset = window?.pageYOffset;
  return componentOffsetTop - windowYOffset <= parseInt(stickyHeight, 10);
};

const SectionNavigation = ({ sitecoreContext, ...props }) => {
  const [isSticky, setIsSticky] = useState(false);
  const zIndices = useThemeContext('zIndices');
  const { name, header } = useThemeContext();
  const { isMobile } = useMediaQueries();
  const { language, route } = sitecoreContext;

  const params = {
    language,
    pageName: route?.name,
    routeLabel: route?.fields?.sectionNavLabel,
  };

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const ref = isMobile ? mobileRef : desktopRef;

  const desktopMCHeight = `${parseInt(header.desktop.stickyHeight, 10) + parseInt(header.desktop.subNavHeight, 10)}px`;
  const desktopStickyHeight = name === MC_THEME_NAME ? desktopMCHeight : header.desktop.stickyHeight;
  const stickyHeight = isMobile ? header.mobile.height : desktopStickyHeight;
  const isSafeToAddEffects = typeof window !== 'undefined' && !isEditorActive();

  // set isSticky based on the current position, rather than always starting at false
  if (isSafeToAddEffects) {
    if (checkIsNavInbound(ref, window, stickyHeight) && !isSticky) {
      setIsSticky(true);
    }
  }

  useEffect(() => {
    if (isSafeToAddEffects) {
      const stickify = () => {
        const isNavInBound = checkIsNavInbound(ref, window, stickyHeight);
        if (isNavInBound && !isSticky) {
          setIsSticky(true);
        } else if (!isNavInBound && isSticky) {
          setIsSticky(false);
        }
      };

      window.addEventListener('scroll', stickify);
      return () => window.removeEventListener('scroll', stickify);
    }
    return null;
  }, [isSticky, ref]);

  let containerProps = {
    position: 'relative',
  };

  if (isSticky) {
    containerProps = {
      position: 'sticky',
      top: 0,
      zIndex: zIndices.sectionNav,
    };
  } else {
    containerProps = {
      position: 'relative',
    };
  }

  return (
    <>
      <Box display={['none', 'block']} ref={desktopRef} {...containerProps}>
        <DesktopSectionNav {...props} params={params} />
      </Box>
      <Box display={['display', 'none']} ref={mobileRef} {...containerProps}>
        <MobileSectionNav {...props} params={params} />
      </Box>
    </>
  );
};

export default withSitecoreContext()(SectionNavigation);
