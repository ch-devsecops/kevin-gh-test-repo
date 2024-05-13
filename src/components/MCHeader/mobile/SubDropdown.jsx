import React from 'react';
import styled from 'styled-components';
import { Box, Copy, Icon } from '@honda-canada/design-system-react';
import DropdownList, { Button } from './DropdownList';

const Container = styled(Box)(
  ({ theme }) => ({
    top: theme.header.mobile.height,
    maxWidth: 0,
    opacity: 0,
    transition: 'all .4s ease-in-out',
  }),
  ({ isOpen }) =>
    isOpen && {
      maxWidth: '100%',
      opacity: 1,
    },
);

const SubHeader = ({ label, onClick, ...otherProps }) => (
  <Box as="header" position="relative" height="62px" {...otherProps}>
    <Button
      as="button"
      p="20px"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
    >
      <Box px="20px" height="100%" position="absolute" display="flex" alignItems="center" left="0">
        <Icon name="arrowLeft" iconColor="white" />
      </Box>
      <Copy size="small">{label}</Copy>
    </Button>
  </Box>
);

const SubDropdown = ({ subNav, onClose, isOpen }) => (
  <Container
    as="nav"
    backgroundColor="grey.2"
    zIndex={1001}
    position="fixed"
    left={0}
    width="100%"
    height="100vh"
    isOpen={isOpen}
  >
    <SubHeader label={subNav?.fields?.title?.value} backgroundColor="grey.3" onClick={onClose} />
    <DropdownList links={subNav} />
  </Container>
);

export default SubDropdown;
