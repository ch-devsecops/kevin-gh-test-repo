import { createGlobalStyle } from 'styled-components';

/**
 * These styles override CSS from the Honda MVC site's CSS (included in the header)
 * that prevent the sidenav from being sticky. We override them here.
 */
const HondaCssOverride = createGlobalStyle`
 html, body {
   overflow-x: visible;
   background-color: white; 
 }

 @media screen and (min-width: 768px) and (max-width: 1123px) {
   .header-mobile .container {
     max-width: 768px;
     margin: 0;
   }
   .honda-header {
     display: none;
     height: 100vh;
   }
   body.mobile-menu-active .honda-header {
     display: block;
   }
 }
 @media screen and (min-width: 768px) and (max-width: 1123px) {
   .header-mobile .container {
     max-width: initial;
   }
 }
`;

export default HondaCssOverride;
