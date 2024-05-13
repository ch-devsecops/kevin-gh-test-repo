import React, { useState, useEffect, useRef } from 'react';
import { Box, Link } from '@honda-canada/design-system-react';
import { NavLink } from 'react-router-dom';
import css from '@styled-system/css';
import styled from 'styled-components';
import Toggle, { Label } from './Toggle';
import { gtmSelectYear } from '../../utils/gtmEvents';

const linkHeight = 33;

const Years = styled(Box)(({ isOpen, theme, numYears }) =>
  css({
    height: isOpen ? `${numYears * linkHeight + 18}px` : 0,
    transition: `height ${theme.transitionTimingFunction.default} ${theme.transitionDuration.t6}`,
  }),
);

const YearLink = styled(Link)(({ selected, color, isOpen }) =>
  css({
    fontWeight: 'normal',
    fontFamily: 'bold',
    display: 'block',
    fontSize: '14px',
    lineHeight: '18px',
    textDecoration: 'none',
    color: selected ? 'primary' : color,
    visibility: isOpen ? 'vibible' : 'hidden',
    '&:hover': {
      color: 'primary',
    },
    letterSpacing: '0.5px',
  }),
);

const YearsDropdown = ({ years, selected, backgroundColor, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedName = selected?.name;
  const dropdownRef = useRef();
  const linkColor = isDark ? 'white' : 'black';

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleEvent = e => {
      const shouldHandle = dropdownRef?.current && !dropdownRef.current.contains(e.target);

      if (shouldHandle) setIsOpen(false);
    };

    document.addEventListener('click', handleEvent);

    return () => {
      document.removeEventListener('click', handleEvent);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [selectedName]);

  return (
    <Box position="relative" pl="m" ref={dropdownRef} data-testid="cy-model-nav-years-dropdown">
      <Toggle
        setIsOpen={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        label={selectedName && <Label color={linkColor}>{selectedName}</Label>}
        aria-haspopup="true"
        aria-expanded={isOpen}
        useToggle={years?.length > 1}
        backgroundColor={backgroundColor}
      />
      <Years
        as="ul"
        role="menu"
        isOpen={isOpen}
        numYears={years?.length}
        boxShadow="box.subNav"
        backgroundColor={isDark ? backgroundColor : 'grey.5'}
        overflow="hidden"
        position="absolute"
        top="61px"
        width="70px"
        left={0}
        border={isOpen ? '1px solid' : 'none'}
        borderTop="none"
        borderColor="grey.1"
      >
        {years?.map(year => (
          <Box
            as="li"
            pt="16px"
            key={year.url}
            px="m"
            display="flex"
            alignItems="center"
            role="menuitem"
            aria-label={year.name}
          >
            <YearLink
              data-testid="cy-model-nav-year-link"
              color={linkColor}
              {...(year.legacyPageUrl
                ? { as: 'a', href: year.legacyPageUrl }
                : { as: NavLink, to: year.correspondingUrl || year.url })}
              disableHover
              onClick={() => {
                gtmSelectYear(year?.name);
                setIsOpen(false);
              }}
              selected={selectedName && year.name === selectedName}
              isOpen={isOpen}
            >
              {year.name}
            </YearLink>
          </Box>
        ))}
      </Years>
    </Box>
  );
};

export default YearsDropdown;
