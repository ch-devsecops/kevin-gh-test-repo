import { createGlobalStyle } from 'styled-components';

// This allows PSP Header dropdown to override ModelPageNav
const PspZindexWorkaround = createGlobalStyle`
  body.scrolling-effect .psp-z-index-workaround {
    z-index: 0 !important;
  }
`;

export default PspZindexWorkaround;
