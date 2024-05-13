import { useTranslation } from 'react-i18next';

export const variant1 = 'variant1';
export const variant2 = 'variant2';

export const useConfiguration = variant => {
  const { t } = useTranslation();
  let showPaymentDetails;
  let showPaymentInfoTooltip;
  let labelFontSize;
  let valueFontSize;
  let fontLineHeight;
  let selectTrimButton;
  let ctaLabel;

  switch (variant) {
    case variant1:
      selectTrimButton = true;
      showPaymentDetails = true;
      showPaymentInfoTooltip = false;
      labelFontSize = '12px';
      valueFontSize = '16px';
      fontLineHeight = ['22px', '22px', '26px'];
      ctaLabel = t('Pages.Models.Exploration.viewModelDetailsButton');
      break;

    case variant2:
    default:
      selectTrimButton = true;
      showPaymentDetails = false;
      showPaymentInfoTooltip = false;
      labelFontSize = '10px';
      valueFontSize = ['16px', '16px', '18px'];
      fontLineHeight = '22px';
      ctaLabel = t('Pages.Models.Exploration.selectTrimLabel');
      break;
  }
  return {
    showPaymentDetails,
    ctaLabel,
    showPaymentInfoTooltip,
    selectTrimButton,
    paymentDetailStyles: {
      label: {
        fontSize: labelFontSize,
      },
      value: {
        fontSize: valueFontSize,
      },
      copy: {
        lineHeight: fontLineHeight,
      },
    },
  };
};
