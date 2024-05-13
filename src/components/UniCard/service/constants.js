export const variant1 = 'variant1';
export const variant2 = 'variant2';
export const variant3 = 'variant3';

// payment details tooltip
export const TOOLTIP_HONDA_SITE = 'honda.ca';
export const TOOLTIP_ACURA_SITE = 'acura.ca';

export const useConfiguration = variant => {
  let paymentOptionsFontSize;
  let paymentOptionsLineHeight;

  switch (variant) {
    case variant1:
      paymentOptionsFontSize = ['14px', '14px', '14px'];
      paymentOptionsLineHeight = ['22px', '22px', '22px'];
      break;
    default:
      paymentOptionsFontSize = ['14px', '14px', '16px'];
      paymentOptionsLineHeight = ['22px', '22px', '26px'];
      break;
  }
  return {
    paymentOptionsFontSize,
    paymentOptionsLineHeight,
  };
};
