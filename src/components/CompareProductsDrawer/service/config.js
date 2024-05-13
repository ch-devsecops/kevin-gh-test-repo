import { variant1, variant2, variant3 } from './constants';

const useConfiguration = variant => {
  let compareDrawerHeading = 'Shared.Common.compareDrawerHeading';
  let semiHexagonTitleIconColor = 'black';
  let isScrollable = false;
  let hasDifferentProductLines = false;
  let buttonFontSize = ['14px', '13px'];

  switch (variant) {
    case variant1:
      break;
    case variant2:
      break;
    case variant3:
      compareDrawerHeading = 'Shared.Common.compareMcDrawerHeading';
      semiHexagonTitleIconColor = 'red';
      isScrollable = true;
      hasDifferentProductLines = true;
      buttonFontSize = '13px';
      break;
    default:
      break;
  }

  return {
    styles: {
      compareDrawerHeading,
      semiHexagonTitleIconColor,
      isScrollable,
      buttonFontSize,
    },
    hasDifferentProductLines,
  };
};
export default useConfiguration;
