/* eslint-disable import/prefer-default-export */
import {
  variant1,
  variant2,
  variant3,
  ALIGNMENT_LEFT,
  ALIGNMENT_RIGHT,
  NAV_TYPE_PRIMARY,
  NAV_TYPE_SECONDARY,
  NAV_TYPE,
  ALIGNMENT,
} from './constants';

export const useConfiguration = variant => {
  let showSecondaryMenuOnTop;
  let navTypePrimary;
  let navTypeSecondary;
  let navTypeVariable;
  let navHeight;
  let headerBarHeight;
  let headerBarPaddingTop;
  let headerBarLangTextDecoration;
  let navItemPrimaryMaxHeight;
  let navItemPrimaryLineHeight;
  let navItemSecondaryFontSize;
  let navItemSecondaryFontFamily;
  let navItemSecondaryMaxHeight;
  let navItemSecondaryLineHeight;
  let navItemLabelFontSize;
  let navItemLabelLineHeight;
  let navItemLabelTextDecoration;
  let headerItemSubmenuItemMarginBottom;
  const mainColumnDisplay = ['none', 'none', 'block'];
  let mainColumnMr;
  let mainColumnMl;
  let mainColumnFlex;
  let mainColumnHeight;
  let logoWidth;
  let mobileMenuButtonColor;
  let logoHeight;
  let logoAlignment;
  let logoMarginRightTablet;

  switch (variant) {
    case variant3:
      showSecondaryMenuOnTop = true;
      navTypePrimary = NAV_TYPE_PRIMARY;
      navTypeSecondary = NAV_TYPE_SECONDARY;
      navTypeVariable = NAV_TYPE;
      navHeight = ['45px', '45px', '104px'];
      headerBarHeight = '100%';
      headerBarPaddingTop = [0, 0, '20px'];
      headerBarLangTextDecoration = 'none';
      navItemPrimaryMaxHeight = ['30px', '30px', 'initial'];
      navItemPrimaryLineHeight = ['30px', '30px', '35px'];
      navItemSecondaryFontSize = '12px';
      navItemSecondaryFontFamily = 'default';
      navItemSecondaryMaxHeight = ['30px', '30px', '30px'];
      navItemSecondaryLineHeight = ['30px', '30px', '30px'];
      navItemLabelFontSize = '14px';
      navItemLabelLineHeight = '18px';
      navItemLabelTextDecoration = 'none';
      headerItemSubmenuItemMarginBottom = 'default';
      mainColumnMr = undefined;
      mainColumnMl = 'auto';
      mainColumnFlex = 1;
      mainColumnHeight = ['100%', '100%', '100%'];
      logoHeight = ['45px', '45px', '104px'];
      logoAlignment = 'flex-end';
      logoMarginRightTablet = 0;
      mobileMenuButtonColor = 'black';
      break;

    case variant2:
      showSecondaryMenuOnTop = true;
      navTypePrimary = NAV_TYPE_PRIMARY;
      navTypeSecondary = NAV_TYPE_SECONDARY;
      navTypeVariable = NAV_TYPE;
      navHeight = ['45px', '45px', '104px'];
      headerBarHeight = '100%';
      headerBarPaddingTop = [0, 0, '20px'];
      navItemPrimaryMaxHeight = ['30px', '30px', 'initial'];
      navItemPrimaryLineHeight = ['30px', '30px', '35px'];
      navItemSecondaryFontSize = '12px';
      navItemSecondaryFontFamily = 'default';
      navItemSecondaryMaxHeight = ['30px', '30px', '30px'];
      navItemSecondaryLineHeight = ['30px', '30px', '30px'];
      headerItemSubmenuItemMarginBottom = 'default';
      mainColumnMr = undefined;
      mainColumnMl = 'auto';
      mainColumnFlex = 1;
      mainColumnHeight = ['100%', '100%', '100%'];
      logoWidth = ['71px', '71px', '160px'];
      mobileMenuButtonColor = 'black';
      break;

    case variant1:
    default:
      navTypePrimary = ALIGNMENT_LEFT;
      navTypeSecondary = ALIGNMENT_RIGHT;
      navTypeVariable = ALIGNMENT;
      showSecondaryMenuOnTop = false;
      navHeight = ['45px', '45px', '75px'];
      headerBarHeight = '100%';
      headerBarPaddingTop = 0;
      navItemPrimaryMaxHeight = ['45px', '45px', '75px'];
      navItemPrimaryLineHeight = ['45px', '45px', '75px'];
      navItemSecondaryFontSize = '14px';
      navItemSecondaryFontFamily = 'bold';
      navItemSecondaryFontFamily = 'bold';
      navItemSecondaryMaxHeight = ['45px', '45px', '75px'];
      navItemSecondaryLineHeight = ['45px', '45px', '75px'];
      headerItemSubmenuItemMarginBottom = 'default';
      mainColumnMr = 'auto';
      logoWidth = ['71px', '71px', '115px'];
      mobileMenuButtonColor = 'white';
      break;
  }

  return {
    showSecondaryMenuOnTop,
    navTypePrimary,
    navTypeSecondary,
    navTypeVariable,
    styles: {
      nav: {
        height: navHeight,
      },
      logo: {
        width: logoWidth,
        height: logoHeight,
        mr: logoMarginRightTablet,
      },
      logoColumn: {
        alignItems: logoAlignment,
      },
      headerBar: {
        height: headerBarHeight,
        paddingTop: headerBarPaddingTop,
      },
      headerMenuLanguageStyle: {
        textDecoration: headerBarLangTextDecoration,
      },
      navItemPrimary: {
        maxHeight: navItemPrimaryMaxHeight,
        lineHeight: navItemPrimaryLineHeight,
      },
      navItemLabel: {
        fontSize: navItemLabelFontSize,
        lineHeight: navItemLabelLineHeight,
        textDecoration: navItemLabelTextDecoration,
      },
      headerItemSubmenuItem: {
        marginBottom: headerItemSubmenuItemMarginBottom,
      },
      navItemSecondary: {
        fontSize: navItemSecondaryFontSize,
        fontFamily: navItemSecondaryFontFamily,
        maxHeight: navItemSecondaryMaxHeight,
        lineHeight: navItemSecondaryLineHeight,
      },
      mainColumn: {
        height: mainColumnHeight,
        display: mainColumnDisplay,
        mr: mainColumnMr,
        ml: mainColumnMl,
        flex: mainColumnFlex,
      },
      mobileMenuButton: {
        bgColor: mobileMenuButtonColor,
      },
    },
  };
};
