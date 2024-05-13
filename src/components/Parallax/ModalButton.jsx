import React from 'react';
import styled from 'styled-components';
import { Link, Icon } from '@honda-canada/design-system-react';

const StyledLink = styled(Link)(({ isDarkMode }) => ({
  '&:hover': {
    'border-bottom-width': isDarkMode ? '2px' : '1px',
  },
}));

const ModalButton = ({ icon, onClick, children, isDarkMode }) => (
  <span>
    <StyledLink styling={isDarkMode ? 'white' : 'primary'} isDarkMode={isDarkMode} as="button" onClick={onClick}>
      {children}
    </StyledLink>
    {icon && <Icon ml="xs" height="10px" iconColor="primary" name={icon} />}
  </span>
);

export default ModalButton;
