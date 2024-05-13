import { createGlobalStyle } from 'styled-components';

const HondaZindexWorkaround = createGlobalStyle`
body.mobile-menu-active {
    .honda-z-index-workaround {
      z-index: 210 !important;  
    }
  }

  header.honda-header:hover + div#jss-root div.honda-z-index-workaround {
    z-index: 800;
  }
`;

export default HondaZindexWorkaround;
