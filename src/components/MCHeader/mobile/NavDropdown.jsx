import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Copy, useThemeContext } from '@honda-canada/design-system-react';
import DropdownList, { Link } from './DropdownList';
import DisabledBodyScroll from '../../../utils/DisabledBodyScroll';

const MainDropdown = styled(Box)(
  ({ theme, windowHeight }) => ({
    position: 'absolute',
    top: theme.header.mobile.height,
    width: '100%',
    overflow: 'hidden',
    height: windowHeight,
    maxHeight: '0',
    transition: 'all .4s ease-in-out',
    backgroundColor: theme.colors.headerFooterGrey && theme.colors.headerFooterGrey[2],
  }),
  ({ isOpen }) =>
    isOpen && {
      maxHeight: '1000px',
    },
);

const NavDropdown = ({
  isOpen,
  mainNav,
  shareData,
  utilityLinks,
  setSubNav,
  langToggle,
  langText,
  onTransitionEnd,
}) => {
  const { mobile } = useThemeContext('header');
  const [windowHeight, setWindowHeight] = useState(`calc(100vh - ${mobile.height})`);

  useEffect(() => {
    const setHeight = () => {
      if (typeof window !== 'undefined') {
        setWindowHeight(`calc(${window.innerHeight}px - ${mobile.height})`);
      }
    };

    window.addEventListener('resize', setHeight);
    setHeight();
    return () => window.removeEventListener('resize', setHeight);
  }, [mobile.height]);

  return (
    <MainDropdown
      as="nav"
      isOpen={isOpen}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      windowHeight={windowHeight}
      onTransitionEnd={onTransitionEnd}
    >
      <DisabledBodyScroll isOpen={isOpen} />
      <DropdownList links={mainNav} subNav={[shareData]} utilityLinks={utilityLinks} setSubNav={setSubNav} />
      <Box display="flex" borderTop="1px solid black" p="20px">
        <Copy size="small" mr="xs" color="white">
          {langText}
        </Copy>
        <Link as="a" href={langToggle.url}>
          <Copy size="small" textDecoration="underline" color="white">
            {langToggle.code.toUpperCase()}
          </Copy>
        </Link>
      </Box>
    </MainDropdown>
  );
};

export default NavDropdown;
