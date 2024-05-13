import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import debounce from 'lodash/debounce';
import { Box, useMediaQueries, Media, ScrollProgressIndicator } from '@honda-canada/design-system-react';
import MenuItem from './MenuItem';
import MenuItemScrollProgressIndicator from './MenuItemScrollProgressIndicator';

const Menu = ({ items, scrollCompletionCallback, isDark, gtmTags }) => {
  const { isMobile, isSmallDesktop: isTablet } = useMediaQueries();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const elements = [];

    if (items && items.length > 0) {
      if (isMobile || isTablet) {
        const elem = document.getElementById('trackForProgressBar');

        // ensures the element has clientHeight
        if (elem) {
          elem.style.display = 'block';
        }

        setActive(elem);
      } else {
        items.forEach(item => {
          const elem = document.getElementById(item.href.url);
          // Add it to array
          elements.push(elem);
          // ensures the element has clientHeight
          if (elem) {
            elem.style.display = 'block';
          }
        });
      }
    }

    if (!isMobile || !isTablet) {
      // Get active element
      const SIDEBAR_TOP = 75 + 96 + 8; // Spacing + NavSpacer + Line Height Difference
      const handleScroll = debounce(() => {
        const positions = [];

        if (elements.length) {
          elements.forEach(elem => {
            const elementTop = elem?.getBoundingClientRect().top;

            positions.push(elementTop <= SIDEBAR_TOP);
          });
          const position = positions.lastIndexOf(true);

          if (position > -1) {
            setActive(elements[position]);
          } else {
            setActive(elements[0]);
          }
        }
      }, 10);

      handleScroll();

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }

    return () => {};
  }, [items, isMobile, isTablet]);

  return (
    <Box
      width="100%"
      textAlign="center"
      bg={isDark ? 'black' : ''}
      data-gtm-component-type={gtmTags.type}
      data-gtm-category={gtmTags.category}
    >
      <Media lessThan="desktop">
        <ScrollProgressIndicator target={active} />
      </Media>
      <Media greaterThanOrEqual="desktop">
        <Box display="flex" flexDirection="column" pb="xs">
          {items?.map(item => {
            if (item.href.url === active?.id) {
              return (
                <>
                  <MenuItem
                    key={item.href.url}
                    item={item}
                    isActive
                    isDark={isDark}
                    scrollCompletionCallback={scrollCompletionCallback}
                  />
                  <MenuItemScrollProgressIndicator activeElement={active} />
                </>
              );
            }

            return (
              <MenuItem
                key={item.href.url}
                item={item}
                isDark={isDark}
                scrollCompletionCallback={scrollCompletionCallback}
              />
            );
          })}
        </Box>
      </Media>
    </Box>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      isActive: PropTypes.bool,
      link: PropTypes.element,
    }),
  ),
  scrollCompletionCallback: PropTypes.func,
  gtmTags: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default Menu;
