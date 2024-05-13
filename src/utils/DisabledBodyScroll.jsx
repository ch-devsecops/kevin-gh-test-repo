import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    overflow-y: ${({ isOpen }) => (isOpen ? 'hidden !important' : 'initial')};
  }
`;
