import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Placeholder, withSitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import { Box, Column, useThemeContext, Wrapper, Optional } from '@honda-canada/design-system-react';
import ProgressSideNavLayout from './ProgressiveSideNav';
import LayoutProvider from '../LayoutContext';
import HondaCssOverride from '../../utils/HondaCssOverride';
import BodyTypeTabs from '../ModelListFilters/BodytypeTabs';
import { HONDA_SITE_NAME } from '../../utils/constants';

const NON_STICKY_SIDEBAR_COMPONENTS = ['ModelListFilters', 'VehicleListFilter'];

const SideNavLayout = ({ fields, rendering, sitecoreContext }) => {
  const header = useThemeContext('header');
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);
  const appName = sitecoreContext?.site?.name;
  const twoColumnLeftEl = useRef(null);
  const isProgressSideNav = rendering?.placeholders['side-nav-column-left']?.find(
    component => component.componentName === 'SideNavScrollIndicator',
  );
  const hasModelListFilters = !!rendering?.placeholders['side-nav-column-left']?.find(
    component => component.componentName === 'ModelListFilters',
  );
  const isSidebarSticky = !!rendering?.placeholders['side-nav-column-left']?.find(
    component => !NON_STICKY_SIDEBAR_COMPONENTS.includes(component.componentName),
  );

  const refList = [];
  const setRef = ref => {
    if (ref && refList.indexOf(ref) === -1) {
      refList.push(ref);
    }
  };

  const scrollOffset = parseInt(header.desktop.stickyHeight || header.desktop.height, 10) + 90;

  useEffect(() => {
    /**
     * Scroll Listener to change hash on scroll
     * Change hash when Element top match with Sidebar Top
     */
    if (typeof window === 'undefined') return () => {};

    const handleScroll = debounce(() => {
      if (!refList.length || isProgressSideNav) {
        return;
      }

      const positions = refList.map(elem => elem.getBoundingClientRect().top <= scrollOffset);
      const position = positions.lastIndexOf(true);
      const hash = refList[position] && `#${refList[position].id}`;

      if (position > -1 && hash !== window.location?.hash) {
        window.history.pushState(null, null, hash);
      }
    }, 10);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
    // We're dealing with DOM elements and refs, so we can safely...
  }, []);

  // On mobile, tell second column components what the height of the first column is.
  // Useful for components with sticky or fixed positioning under the first column (e.g. FAQ).
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    setLeftColumnHeight(twoColumnLeftEl.current?.offsetHeight);
    return undefined;
  }, []);

  if (isProgressSideNav) {
    return <ProgressSideNavLayout fields={fields} rendering={rendering} sitecoreContext={sitecoreContext} />;
  }

  return (
    <Wrapper gutters={[false, true]} pt={[0, 0, 'big']}>
      <Box
        display="flex"
        height="fit-content"
        minWidth="100%"
        minHeight="100px"
        flexDirection={['column', 'column', 'row']}
      >
        {appName === HONDA_SITE_NAME && <HondaCssOverride />}
        <Column
          ref={twoColumnLeftEl}
          width={[1, 1, 1 / 4]}
          position={isSidebarSticky ? 'sticky' : undefined}
          alignSelf="flex-start"
          zIndex="201"
          pt={[0, appName === 'atvsxs' ? 'l' : 0]}
          top={[header.mobile.height, header.mobile.height, header.desktop.stickyHeight || header.desktop.height]}
          pl={['zero', isSidebarSticky ? 's' : 'zero']}
          pr={['zero', isSidebarSticky ? 's' : 'zero']}
          bg="white"
        >
          <Placeholder name="side-nav-column-left" rendering={rendering} />
        </Column>
        <Column pt={isSidebarSticky ? ['xl', 'xl', 'zero'] : 'zero'} pl={[0, 0, 7]} width={[1, 1, 3 / 4]}>
          <LayoutProvider layoutName={rendering.componentName}>
            <Optional when={hasModelListFilters}>
              <BodyTypeTabs />
            </Optional>
            <Placeholder
              name="side-nav-column-right"
              rendering={rendering}
              setRef={setRef}
              renderEach={component => {
                if (component.props?.rendering) {
                  // eslint-disable-next-line no-param-reassign
                  component.props.rendering.leftColumnHeight = leftColumnHeight;
                }

                return component;
              }}
            />
          </LayoutProvider>
        </Column>
      </Box>
    </Wrapper>
  );
};

export default withSitecoreContext()(SideNavLayout);
