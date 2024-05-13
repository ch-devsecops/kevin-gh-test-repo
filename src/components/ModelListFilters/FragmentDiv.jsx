import React from 'react';
import styled, { css } from 'styled-components';

const FragmentDivStyled = styled.div(({ expanded }) =>
  css({
    visibility: expanded ? 'visible' : 'hidden',
  }),
);

const FragmentDiv = ({ children, expanded }) => (
  <FragmentDivStyled expanded={expanded}>
    {typeof children === 'function' ? children({ expanded }) : children}
  </FragmentDivStyled>
);

export default FragmentDiv;
