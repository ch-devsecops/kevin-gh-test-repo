export const variant1 = 'variant1';
export const variant2 = 'variant2';

export const useConfiguration = (variant, showModelYear) => {
  let labelFontSize;
  let valueFontSize;
  let showModelYearFromConfig;

  switch (variant) {
    case variant1:
      labelFontSize = 'sm';
      valueFontSize = '16px';
      showModelYearFromConfig = true;
      break;
    case variant2:
    default:
      labelFontSize = '12px';
      valueFontSize = ['16px', '16px', '16px'];
      break;
  }
  return {
    paymentDetailStyles: {
      label: labelFontSize,
      value: valueFontSize,
    },
    showModelYear: showModelYear ?? showModelYearFromConfig,
  };
};

export const compareLabelFontSize = '14px';
export const compareLabelLineHeight = '16px';
