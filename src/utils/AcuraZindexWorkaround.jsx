import { createGlobalStyle } from 'styled-components';

/**
The Acura header and flyout have z-index values that
make it impossible to have a Sitecore component both cover the header
and be covered by the flyout.

In order to prevent the component from covering the flyout, we piggyback
on a class that the Saleforce chat feature adds to the body when the
flyout is open.
* */

const AcuraZindexWorkaround = createGlobalStyle`
  body.salesforce-chat-desktop-pushed-back {
    .acura-z-index-workaround {
      z-index: 210 !important;  
    }
  }
`;

export default AcuraZindexWorkaround;
