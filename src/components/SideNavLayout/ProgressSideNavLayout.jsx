import React, { useContext, useEffect, useRef, useState } from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Box, Column, useMediaQueries, useThemeContext } from '@honda-canada/design-system-react';
import usePrevious from '../../utils/hooks/usePrevious';
import { getComponentFromRoute } from '../../utils/sitecorePlaceholders';
import { ModelExplorationContext } from '../ModelExplorationContext';
import HondaCssOverride from '../../utils/HondaCssOverride';
import { HONDA_SITE_NAME } from '../../utils/constants';

const getAnchorsFromRendering = (rendering = {}) => {
  const leftColumn = rendering.placeholders['side-nav-column-left'];
  const sideNav = leftColumn?.find(component => component.componentName === 'SideNavScrollIndicator');

  return sideNav.fields?.items?.map(item => item.fields?.UrlAnchor?.value?.anchor);
};

const ProgressSideNavLayout = ({ rendering, sitecoreContext }) => {
  const header = useThemeContext('header');
  const leftColumnEl = useRef(null);
  const rightColumnEl = useRef(null);
  const { isMobile } = useMediaQueries();
  const modelExplorationContext = useContext(ModelExplorationContext) || {};
  const { isDark } = modelExplorationContext;
  const [activeItem, updateActiveItem] = useState(null);
  const [clickedItem, updateClickedItem] = useState(null);
  const [hideItems, updateHideItems] = useState(false);
  const previousActiveItem = usePrevious(activeItem);
  const appName = sitecoreContext?.site?.name;
  const anchorIds = getAnchorsFromRendering(rendering);
  const hasModelPageNav = getComponentFromRoute('ModelPageNav', sitecoreContext.route);
  const leftColumnMobileTopPosition = appName === HONDA_SITE_NAME && hasModelPageNav ? '70px' : header.mobile.height;
  const leftColumnTopPosition = [
    leftColumnMobileTopPosition,
    leftColumnMobileTopPosition,
    header.desktop.stickyHeight || header.desktop.height,
  ];

  useEffect(() => {
    const difference = Math.abs(activeItem - previousActiveItem);

    updateClickedItem(previousActiveItem);
    updateHideItems(difference > 1);
  }, [activeItem, previousActiveItem]);

  // On desktop, toggle the opacity of every item in between the
  // clicked item and the active item
  // TODO: investigate using refs instead of anchor IDs

  useEffect(() => {
    if (isMobile) return;

    const opacity = hideItems ? 0 : 1;

    if (!anchorIds || anchorIds.length === 0) return;

    anchorIds
      .filter((_, index) => index !== activeItem && index !== clickedItem)
      .forEach(id => {
        const element = document.getElementById(id);

        if (element) {
          element.style.opacity = opacity;
        }
      });
  }, [hideItems, clickedItem, activeItem, isMobile]);

  const onProgressSidenavClick = index => {
    updateActiveItem(index);
  };

  if (!rendering) return null;

  return (
    <Box
      display="flex"
      height="fit-content"
      minWidth="100%"
      minHeight="100px"
      flexDirection={['column', 'column', 'row']}
    >
      {appName === HONDA_SITE_NAME && <HondaCssOverride />}
      <Column
        width={[1, 1, 1 / 6]}
        position="sticky"
        alignSelf="flex-start"
        zIndex="201"
        top={leftColumnTopPosition}
        bg={!isDark ? 'white' : undefined}
        ref={leftColumnEl}
        pt={[0, appName === 'atvsxs' && 'l']}
        style={isMobile || typeof window === 'undefined' ? { paddingLeft: 0, paddingRight: 0 } : {}}
      >
        <Placeholder
          name="side-nav-column-left"
          rendering={rendering}
          render={components =>
            components.map(component => ({
              ...component,
              props: {
                ...component.props,
                scrollCompletionCallback: () => updateHideItems(false),
                onProgressSidenavClick,
              },
            }))
          }
        />
      </Column>
      <Column pl="0" pr="0" pt="xl" width={[1, 1, 5 / 6]} id="trackForProgressBar" ref={rightColumnEl}>
        <Placeholder name="side-nav-column-right" rendering={rendering} />
      </Column>
    </Box>
  );
};

export default ProgressSideNavLayout;
